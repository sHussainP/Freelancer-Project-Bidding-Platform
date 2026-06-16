from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from motor.motor_asyncio import AsyncIOMotorDatabase
from config import settings


class Database:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None


db_instance = Database()


def get_database():
    """Dependency helper to get the database instance."""
    if db_instance.db is None:
        raise RuntimeError("Database not initialized. Ensure lifespan has started.")
    return db_instance.db
