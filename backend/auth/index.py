import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Регистрация и вход по номеру телефона и имени."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    phone = (body.get("phone") or "").strip()
    name = (body.get("name") or "").strip()

    if not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Введите номер телефона"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT id, name, phone FROM users WHERE phone = %s", (phone,))
    user = cur.fetchone()

    if user:
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"id": user[0], "name": user[1], "phone": user[2]})}

    if not name:
        conn.close()
        return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Пользователь не найден. Введите имя для регистрации"})}

    cur.execute("INSERT INTO users (phone, name) VALUES (%s, %s) RETURNING id", (phone, name))
    user_id = cur.fetchone()[0]
    conn.commit()
    conn.close()

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"id": user_id, "name": name, "phone": phone})}
