tasks = [
    {"id": 1, "name": "Learn Docker", "completed": False},
    {"id": 2, "name": "Deploy Kubernetes", "completed": False},
    {"id": 3, "name": "Configure Ingress", "completed": False}
]

def get_tasks():
    return tasks

def add_task(name):
    task = {
        "id": max((t["id"] for t in tasks), default=0) + 1,
        "name": name,
        "completed": False
    }
    tasks.append(task)
    return task