from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from database import db_instance
from schemas.user import UserSignUp, UserLogin, Token, UserRole
import authMiddleware
import logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup Engine: Connect to MongoDB
    try:
        db_instance.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=2000,
            connectTimeoutMS=2000,
        )
        db_instance.db = db_instance.client[settings.DATABASE_NAME]
        # Verify connection with a ping
        await db_instance.db.command("ping")
        print(f"Connected to MongoDB database: {settings.DATABASE_NAME}")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        raise

    yield

    # Shutdown Engine: Clean up connections
    db_instance.client.close()
    print("MongoDB connection cleanly terminated.")


app = FastAPI(title="Freelancer Project Bidding Platform API", lifespan=lifespan)
logger = logging.getLogger(__name__)


@app.get("/api/v1/health")
async def health_check():
    # Let's ping the database to verify it's active
    if db_instance.db is None:
        return {"status": "healthy", "database": "disconnected"}
    try:
        await db_instance.db.command("ping")
        db_status = "connected"
    except Exception as e:
        logger.warning(f"Database health check failed: {e}")
        db_status = "disconnected"

    return {"status": "healthy", "database": db_status}


# --- AUTH ROUTERS ---


@app.post("/api/v1/auth/signup", status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserSignUp):
    # Check if user exists
    existing_user = await db_instance.db["users"].find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = authMiddleware.get_password_hash(user_data.password)

    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "password": hashed_password,
        "role": user_data.role.value,
    }

    await db_instance.db["users"].insert_one(new_user)
    return {"message": "User registered successfully"}


@app.post("/api/v1/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    user = await db_instance.db["users"].find_one({"email": credentials.email})
    if not user or not authMiddleware.verify_password(
        credentials.password, user["password"]
    ):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = authMiddleware.create_access_token(
        data={"sub": user["email"], "role": user["role"]}
    )
    return {"access_token": access_token, "token_type": "bearer"}


# --- RBAC PROTECTED TESTING PATHS ---


@app.get("/api/v1/client/dashboard")
async def client_dashboard(current_user: dict = Depends(authMiddleware.require_client)):
    return {
        "message": f"Welcome Client {current_user['name']}! You can post projects here."
    }


@app.get("/api/v1/freelancer/dashboard")
async def freelancer_dashboard(
    current_user: dict = Depends(authMiddleware.require_freelancer),
):
    return {
        "message": f"Welcome Freelancer {current_user['name']}! You can place bids here."
    }
