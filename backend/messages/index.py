import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Получение и отправка сообщений общего чата."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    if event.get("httpMethod") == "GET":
        params = event.get("queryStringParameters") or {}
        after_id = int(params.get("after_id", 0))
        cur.execute(
            """SELECT m.id, m.text, m.created_at, u.name, u.phone
               FROM messages m JOIN users u ON m.user_id = u.id
               WHERE m.id > %s
               ORDER BY m.id ASC LIMIT 50""",
            (after_id,)
        )
        rows = cur.fetchall()
        conn.close()
        msgs = [{"id": r[0], "text": r[1], "created_at": r[2].isoformat(), "name": r[3], "phone": r[4]} for r in rows]
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"messages": msgs})}

    if event.get("httpMethod") == "POST":
        body = json.loads(event.get("body") or "{}")
        user_id = body.get("user_id")
        text = (body.get("text") or "").strip()
        if not user_id or not text:
            conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Нет текста или пользователя"})}
        cur.execute("INSERT INTO messages (user_id, text) VALUES (%s, %s) RETURNING id", (user_id, text))
        msg_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"id": msg_id})}

    conn.close()
    return {"statusCode": 405, "headers": headers, "body": ""}
