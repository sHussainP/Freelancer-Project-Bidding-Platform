from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_read_health():
    # Use context manager inside testing to trigger your lifespan events
    with TestClient(app) as client:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy", "database": "connected"}
