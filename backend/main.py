from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from database import db_instance


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup Engine: Connect to MongoDB
    db_instance.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db_instance.db = db_instance.client[settings.DATABASE_NAME]
    print(f"Connected securely to MongoDB database: {settings.DATABASE_NAME}")

    yield

    # Shutdown Engine: Clean up connections
    db_instance.client.close()
    print("MongoDB connection cleanly terminated.")


app = FastAPI(title="Freelancer Project Bidding Platform API", lifespan=lifespan)


@app.get("/api/v1/health")
async def health_check():
    # Let's ping the database to verify it's active
    try:
        await db_instance.db.command("ping")
        db_status = "connected"
    except Exception:
        db_status = "disconnected"

    return {"status": "healthy", "database": db_status}
