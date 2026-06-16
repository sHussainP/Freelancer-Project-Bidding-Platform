from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from database import db_instance
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
