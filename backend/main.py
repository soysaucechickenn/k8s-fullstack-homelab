from fastapi import FastAPI
from tasks import get_tasks, add_task
from health import get_health

app = FastAPI(title="DevOps Task Manager")

@app.get("/")
def home():
    return {"message": "Welcome to Task Manager API"}

@app.get("/health")
def health():
    return get_health()

@app.get("/tasks")
def list_tasks():
    return get_tasks()

@app.post("/tasks")
def create_task(name: str):
    return add_task(name)