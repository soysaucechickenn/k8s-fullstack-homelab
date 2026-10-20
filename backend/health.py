from datetime import datetime, timezone
import socket

def get_health():
    return {
        "status": "healthy",
        "service": "task-manager-backend",
        "hostname": socket.gethostname(),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }