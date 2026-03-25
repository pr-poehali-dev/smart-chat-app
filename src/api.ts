const URLS = {
  auth: "https://functions.poehali.dev/c6a1d93b-a940-4d7d-b0c4-dd7312c66b45",
  users: "https://functions.poehali.dev/b6740def-fe32-4d37-92d7-cba997dd1222",
  messages: "https://functions.poehali.dev/af36cbb9-55b3-4a9a-a10e-62a56e58f2c7",
};

export async function apiLogin(phone: string, name?: string) {
  const res = await fetch(URLS.auth, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, name }),
  });
  return res.json();
}

export async function apiGetMessages(afterId = 0) {
  const res = await fetch(`${URLS.messages}?after_id=${afterId}`);
  const data = await res.json();
  return data.messages as { id: number; text: string; created_at: string; name: string; phone: string }[];
}

export async function apiSendMessage(user_id: number, text: string) {
  const res = await fetch(URLS.messages, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, text }),
  });
  return res.json();
}

export async function apiGetUsers() {
  const res = await fetch(URLS.users);
  const data = await res.json();
  return data.users as { id: number; name: string; phone: string }[];
}
