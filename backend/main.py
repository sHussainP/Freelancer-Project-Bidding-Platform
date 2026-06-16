from fastapi import FastAPI

app = FastAPI(title="Freelancer Platform API")


@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "database": "disconnected"}
