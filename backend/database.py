from motor.motor_asyncio import AsyncIOMotorClient
from config import settings


class Database:
    client: AsyncIOMotorClient = None
    db = None


db_instance = Database()


def get_database():
    """Dependency helper to get the database instance."""
    return db_instance.db
