import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Список всех зарегистрированных пользователей для звонков."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("SELECT id, name, phone, created_at FROM users ORDER BY name ASC")
    rows = cur.fetchall()
    conn.close()

    users = [{"id": r[0], "name": r[1], "phone": r[2], "created_at": r[3].isoformat()} for r in rows]
    return {"statusCode": 200, "headers": headers, "body": json.dumps({"users": users})}
