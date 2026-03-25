import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { apiGetUsers } from "@/api";

interface User {
  id: number;
  name: string;
  phone: string;
}

interface Props {
  currentUser: { id: number; name: string; phone: string };
}

export default function CallsList({ currentUser }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filtered = users
    .filter(u => u.phone !== currentUser.phone)
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));

  const initials = (name: string) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const gradients = [
    "linear-gradient(135deg,#7c3aed,#db2777)",
    "linear-gradient(135deg,#2563eb,#06b6d4)",
    "linear-gradient(135deg,#059669,#06b6d4)",
    "linear-gradient(135deg,#d97706,#dc2626)",
    "linear-gradient(135deg,#ec4899,#f43f5e)",
  ];

  const getGradient = (id: number) => gradients[id % gradients.length];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-golos font-bold text-white mb-4">Звонки</h1>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск пользователей..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground outline-none"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">Загружаем пользователей...</p>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">Пользователей не найдено</p>
          </div>
        )}
        {filtered.map((u, i) => (
          <div
            key={u.id}
            className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:glass transition-all animate-fade-in-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-golos font-bold text-white text-sm flex-shrink-0"
              style={{ background: getGradient(u.id) }}
            >
              {initials(u.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-golos font-semibold text-[15px] text-foreground">{u.name}</div>
              <div className="text-[12px] text-muted-foreground">{u.phone}</div>
            </div>
            <a
              href={`tel:${u.phone}`}
              className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow"
              title={`Позвонить ${u.name}`}
            >
              <Icon name="Phone" size={16} className="text-white" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
