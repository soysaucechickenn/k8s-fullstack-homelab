import os
import psycopg

def get_connection():
    return psycopg.connect(
        host=os.getenv("DB_HOST", "postgres"),
        dbname=os.getenv("DB_NAME", "orbit"),
        user=os.getenv("DB_USER", "orbit"),
        password=os.environ["DB_PASSWORD"]
    )

def init_db():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            )
        """)

def get_tasks():
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT id, name, completed FROM tasks ORDER BY id"
        ).fetchall()

    return [
        {"id": row[0], "name": row[1], "completed": row[2]}
        for row in rows
    ]

def add_task(name):
    with get_connection() as conn:
        row = conn.execute(
            "INSERT INTO tasks (name) VALUES (%s) "
            "RETURNING id, name, completed",
            (name,)
        ).fetchone()

    return {
        "id": row[0],
        "name": row[1],
        "completed": row[2]
    }