import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "contacts" | "calls" | "statuses" | "profile" | "settings";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  encrypted: boolean;
  typing?: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
  status: string;
}

interface Call {
  id: number;
  name: string;
  avatar: string;
  type: "incoming" | "outgoing" | "missed";
  callType: "audio" | "video";
  time: string;
  duration?: string;
}

interface Status {
  id: number;
  name: string;
  avatar: string;
  time: string;
  viewed: boolean;
  gradient: string;
  text: string;
}

const chats: Chat[] = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", lastMsg: "Увидимся в 7 вечера!", time: "сейчас", unread: 3, online: true, encrypted: true, typing: true },
  { id: 2, name: "Дизайн-команда", avatar: "ДК", lastMsg: "Макеты готовы к ревью", time: "2 мин", unread: 12, online: true, encrypted: true },
  { id: 3, name: "Максим Петров", avatar: "МП", lastMsg: "Хорошо, договорились 👍", time: "15 мин", unread: 0, online: false, encrypted: true },
  { id: 4, name: "Кристина Лебедева", avatar: "КЛ", lastMsg: "Ты смотрел этот фильм?", time: "1 ч", unread: 1, online: true, encrypted: true },
  { id: 5, name: "Андрей Козлов", avatar: "АК", lastMsg: "Отправил документы на почту", time: "3 ч", unread: 0, online: false, encrypted: true },
  { id: 6, name: "Семья ❤️", avatar: "СЕ", lastMsg: "Мама: Все хорошо, звони!", time: "вчера", unread: 5, online: false, encrypted: true },
  { id: 7, name: "Виктория Новак", avatar: "ВН", lastMsg: "Спасибо за помощь!", time: "вчера", unread: 0, online: true, encrypted: true },
  { id: 8, name: "Рабочий чат", avatar: "РЧ", lastMsg: "Митинг перенесли на пятницу", time: "Пн", unread: 0, online: false, encrypted: true },
];

const contacts: Contact[] = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", phone: "+7 999 123-45-67", online: true, status: "На работе" },
  { id: 2, name: "Андрей Козлов", avatar: "АК", phone: "+7 985 234-56-78", online: false, status: "Не беспокоить" },
  { id: 3, name: "Виктория Новак", avatar: "ВН", phone: "+7 916 345-67-89", online: true, status: "Всегда на связи 📱" },
  { id: 4, name: "Кристина Лебедева", avatar: "КЛ", phone: "+7 977 456-78-90", online: true, status: "Живу в моменте ✨" },
  { id: 5, name: "Максим Петров", avatar: "МП", phone: "+7 926 567-89-01", online: false, status: "В отпуске 🌴" },
  { id: 6, name: "Мама", avatar: "МА", phone: "+7 903 678-90-12", online: false, status: "Позвони мне!" },
];

const calls: Call[] = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", type: "incoming", callType: "video", time: "сейчас", duration: "12:34" },
  { id: 2, name: "Максим Петров", avatar: "МП", type: "missed", callType: "audio", time: "2 ч назад" },
  { id: 3, name: "Кристина Лебедева", avatar: "КЛ", type: "outgoing", callType: "audio", time: "вчера", duration: "5:21" },
  { id: 4, name: "Андрей Козлов", avatar: "АК", type: "incoming", callType: "video", time: "вчера", duration: "1:02:15" },
  { id: 5, name: "Виктория Новак", avatar: "ВН", type: "outgoing", callType: "video", time: "Пн", duration: "28:47" },
  { id: 6, name: "Рабочий чат", avatar: "РЧ", type: "missed", callType: "audio", time: "Вс" },
];

const statuses: Status[] = [
  { id: 1, name: "Мой статус", avatar: "Я", time: "", viewed: false, gradient: "linear-gradient(135deg,#7c3aed,#db2777)", text: "+ Добавить статус" },
  { id: 2, name: "Алиса Морозова", avatar: "АМ", time: "5 мин назад", viewed: false, gradient: "linear-gradient(135deg,#06b6d4,#6366f1)", text: "Наслаждаюсь летом ☀️" },
  { id: 3, name: "Виктория Новак", avatar: "ВН", time: "1 ч назад", viewed: false, gradient: "linear-gradient(135deg,#f59e0b,#ef4444)", text: "Новый проект запущен 🚀" },
  { id: 4, name: "Кристина Лебедева", avatar: "КЛ", time: "2 ч назад", viewed: true, gradient: "linear-gradient(135deg,#10b981,#06b6d4)", text: "" },
  { id: 5, name: "Максим Петров", avatar: "МП", time: "вчера", viewed: true, gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)", text: "В горах 🏔️" },
];

const avatarGradients: Record<string, string> = {
  "АМ": "linear-gradient(135deg, #7c3aed, #db2777)",
  "МП": "linear-gradient(135deg, #2563eb, #06b6d4)",
  "КЛ": "linear-gradient(135deg, #059669, #06b6d4)",
  "АК": "linear-gradient(135deg, #d97706, #dc2626)",
  "ДК": "linear-gradient(135deg, #7c3aed, #6366f1)",
  "СЕ": "linear-gradient(135deg, #ec4899, #f43f5e)",
  "ВН": "linear-gradient(135deg, #0891b2, #6366f1)",
  "РЧ": "linear-gradient(135deg, #475569, #334155)",
  "МА": "linear-gradient(135deg, #be185d, #9d174d)",
  "Я":  "linear-gradient(135deg, #7c3aed, #db2777)",
  "АИ": "linear-gradient(135deg, #5b21b6, #9d174d)",
};

function Avatar({ code, size = 44 }: { code: string; size?: number }) {
  const gradient = avatarGradients[code] || "linear-gradient(135deg,#7c3aed,#db2777)";
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full font-golos font-bold text-white select-none"
      style={{ width: size, height: size, background: gradient, fontSize: size * 0.36 }}
    >
      {code}
    </div>
  );
}

function EncryptBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400">
      <Icon name="Lock" size={9} />
    </span>
  );
}

function ChatsTab() {
  const [search, setSearch] = useState("");
  const filtered = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-golos font-bold text-white">Сообщения</h1>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
              <Icon name="Search" size={17} className="text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow">
              <Icon name="Plus" size={17} className="text-white" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по чатам..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground outline-none"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>

      <div className="mx-4 mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
        <Icon name="ShieldCheck" size={14} className="text-emerald-400 flex-shrink-0" />
        <span className="text-[11px] text-emerald-400 font-rubik">Все чаты защищены сквозным шифрованием</span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filtered.map((chat, i) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:glass cursor-pointer transition-all active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="relative flex-shrink-0">
              <Avatar code={chat.avatar} size={50} />
              {chat.online && (
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 status-online" style={{ borderColor: "hsl(240 20% 6%)" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-golos font-semibold text-[15px] text-foreground truncate flex items-center gap-1">
                  {chat.name} <EncryptBadge />
                </span>
                <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-1">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                {chat.typing ? (
                  <span className="flex items-center gap-1 text-[12px] text-primary">
                    Печатает
                    <span className="flex gap-0.5 ml-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </span>
                  </span>
                ) : (
                  <span className="text-[13px] text-muted-foreground truncate">{chat.lastMsg}</span>
                )}
                {chat.unread > 0 && (
                  <span className="ml-2 flex-shrink-0 min-w-[20px] h-5 rounded-full gradient-brand flex items-center justify-center text-[11px] font-bold text-white px-1.5">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsTab() {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce<Record<string, Contact[]>>((acc, c) => {
    const letter = c.name[0];
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(c);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-golos font-bold text-white">Контакты</h1>
          <button className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow">
            <Icon name="UserPlus" size={17} className="text-white" />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск контактов..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground outline-none"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {Object.entries(grouped).sort().map(([letter, group]) => (
          <div key={letter}>
            <div className="px-3 py-1 text-xs font-golos font-bold text-primary uppercase tracking-widest">{letter}</div>
            {group.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:glass cursor-pointer transition-all active:scale-[0.98] animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative">
                  <Avatar code={c.avatar} size={48} />
                  {c.online && <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 status-online" style={{ borderColor: "hsl(240 20% 6%)" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-golos font-semibold text-[15px] text-foreground">{c.name}</div>
                  <div className="text-[12px] text-muted-foreground">{c.status}</div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                    <Icon name="Phone" size={14} className="text-primary" />
                  </button>
                  <button className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                    <Icon name="MessageCircle" size={14} className="text-accent" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CallsTab() {
  const [filter, setFilter] = useState<"all" | "missed">("all");
  const filtered = filter === "missed" ? calls.filter(c => c.type === "missed") : calls;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-golos font-bold text-white">Звонки</h1>
          <button className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center hover:scale-110 transition-transform animate-pulse-glow">
            <Icon name="PhoneCall" size={17} className="text-white" />
          </button>
        </div>
        <div className="flex gap-2">
          {(["all","missed"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-rubik font-medium transition-all ${filter === f ? "gradient-brand text-white" : "glass text-muted-foreground hover:text-foreground"}`}
            >
              {f === "all" ? "Все" : "Пропущенные"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filtered.map((call, i) => (
          <div
            key={call.id}
            className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:glass cursor-pointer transition-all active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Avatar code={call.avatar} size={48} />
            <div className="flex-1 min-w-0">
              <div className="font-golos font-semibold text-[15px] text-foreground">{call.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon
                  name={call.type === "incoming" ? "PhoneIncoming" : call.type === "outgoing" ? "PhoneOutgoing" : "PhoneMissed"}
                  size={13}
                  className={call.type === "missed" ? "text-red-400" : "text-emerald-400"}
                />
                <span className={`text-[12px] ${call.type === "missed" ? "text-red-400" : "text-muted-foreground"}`}>
                  {call.type === "incoming" ? "Входящий" : call.type === "outgoing" ? "Исходящий" : "Пропущенный"}
                  {call.duration && ` · ${call.duration}`}
                </span>
                <Icon name={call.callType === "video" ? "Video" : "Phone"} size={11} className="text-muted-foreground ml-1" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] text-muted-foreground">{call.time}</span>
              <button className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                <Icon name={call.callType === "video" ? "Video" : "Phone"} size={14} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusesTab() {
  const [activeStatus, setActiveStatus] = useState<number | null>(null);

  if (activeStatus !== null) {
    const s = statuses.find(x => x.id === activeStatus)!;
    return (
      <div className="flex flex-col h-full relative" style={{ background: s.gradient }}>
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
        <div className="relative z-10 flex items-center justify-between px-4 pt-5 pb-3">
          <button onClick={() => setActiveStatus(null)} className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center">
            <Icon name="X" size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Avatar code={s.avatar} size={32} />
            <span className="font-golos font-semibold text-white">{s.name}</span>
          </div>
          <span className="text-xs text-white/70">{s.time}</span>
        </div>
        <div className="relative z-10 flex-1 flex items-center justify-center px-8">
          <p className="text-2xl font-golos font-bold text-white text-center leading-snug">{s.text || "📸 Фото статус"}</p>
        </div>
        <div className="relative z-10 px-4 pb-8 flex gap-3">
          <input
            placeholder="Ответить..."
            className="flex-1 px-4 py-2.5 rounded-full text-white placeholder:text-white/50 text-sm outline-none backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <button className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center">
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-4">
        <h1 className="text-2xl font-golos font-bold text-white">Статусы</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Исчезают через 24 часа</p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-2">
        <div className="mb-4">
          <p className="text-xs font-golos font-semibold text-muted-foreground uppercase tracking-widest mb-2">Мой статус</p>
          <button
            onClick={() => setActiveStatus(1)}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-2xl hover:glass transition-all active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-full p-0.5" style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "hsl(240 20% 6%)" }}>
                <Icon name="Plus" size={22} className="text-primary" />
              </div>
            </div>
            <div className="text-left">
              <div className="font-golos font-semibold text-foreground">Добавить статус</div>
              <div className="text-[12px] text-muted-foreground">Нажмите, чтобы обновить</div>
            </div>
          </button>
        </div>

        <div>
          <p className="text-xs font-golos font-semibold text-muted-foreground uppercase tracking-widest mb-2">Недавние обновления</p>
          {statuses.slice(1).map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStatus(s.id)}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-2xl hover:glass transition-all active:scale-[0.98] animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-full p-0.5"
                  style={{ background: s.viewed ? "rgba(255,255,255,0.15)" : s.gradient }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "hsl(240 20% 10%)" }}>
                    <Avatar code={s.avatar} size={52} />
                  </div>
                </div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-golos font-semibold text-foreground">{s.name}</div>
                <div className="text-[12px] text-muted-foreground truncate">{s.text || "📸 Обновил(а) статус"} · {s.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      <div className="relative h-40 flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(270 80% 40%), hsl(310 80% 40%), hsl(190 90% 35%))" }}>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(0,0,0,0.3)" }}>
          <Icon name="Pencil" size={16} className="text-white" />
        </button>
      </div>

      <div className="px-5 relative">
        <div className="-mt-10 mb-3 inline-block">
          <div className="w-20 h-20 rounded-full p-0.5 animate-pulse-glow" style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center font-golos font-bold text-white text-2xl" style={{ background: "linear-gradient(135deg,#5b21b6,#9d174d)" }}>
              АИ
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-golos font-bold text-foreground">Александр Иванов</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-rubik font-bold text-emerald-400 flex items-center gap-1" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
              <Icon name="ShieldCheck" size={9} />Зашифровано
            </span>
          </div>
          <p className="text-[13px] text-muted-foreground mt-0.5">@alex_ivanov · +7 900 000-00-00</p>
          <p className="text-[13px] text-foreground mt-2">Разработчик, люблю горы и кофе ☕️</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[["156", "Контакты"], ["48", "Чаты"], ["12", "Группы"]].map(([val, label]) => (
            <div key={label} className="glass rounded-2xl p-3 text-center">
              <div className="text-xl font-golos font-bold gradient-brand-text">{val}</div>
              <div className="text-[11px] text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: "Phone", label: "Звонок", color: "#7c3aed" },
            { icon: "Video", label: "Видео", color: "#db2777" },
            { icon: "MessageCircle", label: "Сообщение", color: "#06b6d4" },
          ].map(({ icon, label, color }) => (
            <button key={label} className="glass rounded-2xl p-3 flex flex-col items-center gap-1.5 hover:scale-105 transition-transform active:scale-95">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${color}25`, border: `1px solid ${color}40` }}>
                <Icon name={icon} size={16} style={{ color }} />
              </div>
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </button>
          ))}
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          {[
            { icon: "MapPin", label: "Местоположение", value: "Москва, Россия" },
            { icon: "Globe", label: "Сайт", value: "alex-dev.ru" },
            { icon: "Calendar", label: "В CipherChat с", value: "Январь 2024" },
          ].map(({ icon, label, value }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? "border-b border-white/5" : ""}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.15)" }}>
                <Icon name={icon} size={14} className="text-primary" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground">{label}</div>
                <div className="text-[14px] text-foreground font-rubik">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [autoDelete, setAutoDelete] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
      style={{ background: value ? "linear-gradient(135deg,#7c3aed,#db2777)" : "rgba(255,255,255,0.1)" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all"
        style={{ left: value ? "calc(100% - 22px)" : "2px" }}
      />
    </button>
  );

  type SettingItem = { icon: string; label: string; sub: string; action?: boolean; check?: boolean; toggle?: boolean; onToggle?: () => void };
  type SettingSection = { title: string; items: SettingItem[] };

  const sections: SettingSection[] = [
    {
      title: "Профиль",
      items: [
        { icon: "User", label: "Редактировать профиль", sub: "Имя, фото, статус", action: true },
        { icon: "Bell", label: "Уведомления", sub: "Звуки и вибрация", toggle: notifications, onToggle: () => setNotifications(!notifications) },
      ]
    },
    {
      title: "Конфиденциальность",
      items: [
        { icon: "Lock", label: "Сквозное шифрование", sub: "Включено для всех чатов", check: true },
        { icon: "Fingerprint", label: "Биометрия", sub: "Отпечаток пальца / Face ID", toggle: biometric, onToggle: () => setBiometric(!biometric) },
        { icon: "Trash2", label: "Автоудаление сообщений", sub: "Через 7 дней", toggle: autoDelete, onToggle: () => setAutoDelete(!autoDelete) },
      ]
    },
    {
      title: "Внешний вид",
      items: [
        { icon: "Moon", label: "Тёмная тема", sub: "Текущая тема оформления", toggle: darkMode, onToggle: () => setDarkMode(!darkMode) },
        { icon: "Palette", label: "Цвет акцента", sub: "Фиолетово-розовый градиент", action: true },
      ]
    },
    {
      title: "Данные",
      items: [
        { icon: "HardDrive", label: "Хранилище", sub: "1.2 ГБ использовано", action: true },
        { icon: "Wifi", label: "Использование трафика", sub: "Авто-качество медиа", action: true },
      ]
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4">
      <div className="px-4 pt-5 pb-4">
        <h1 className="text-2xl font-golos font-bold text-white">Настройки</h1>
      </div>

      <div className="mx-4 mb-4 glass rounded-2xl px-4 py-4 flex items-center gap-3">
        <div className="w-14 h-14 rounded-full p-0.5" style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
          <div className="w-full h-full rounded-full flex items-center justify-center font-golos font-bold text-white text-lg" style={{ background: "linear-gradient(135deg,#5b21b6,#9d174d)" }}>
            АИ
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-golos font-bold text-foreground">Александр Иванов</div>
          <div className="text-[12px] text-muted-foreground">@alex_ivanov</div>
        </div>
        <Icon name="ChevronRight" size={18} className="text-muted-foreground" />
      </div>

      <div className="px-4 space-y-4">
        {sections.map(section => (
          <div key={section.title}>
            <p className="text-xs font-golos font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">{section.title}</p>
            <div className="glass rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors ${i < section.items.length - 1 ? "border-b border-white/5" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: item.check ? "rgba(16,185,129,0.15)" : "rgba(124,58,237,0.15)" }}>
                    <Icon name={item.icon} size={16} className={item.check ? "text-emerald-400" : "text-primary"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-foreground font-rubik">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground">{item.sub}</div>
                  </div>
                  {item.toggle !== undefined && <Toggle value={item.toggle} onChange={item.onToggle} />}
                  {item.action && <Icon name="ChevronRight" size={16} className="text-muted-foreground" />}
                  {item.check && <Icon name="CheckCircle2" size={16} className="text-emerald-400" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center py-2">
          <p className="text-[12px] text-muted-foreground font-rubik">CipherChat v1.0.0</p>
          <p className="text-[11px] text-primary mt-0.5 flex items-center justify-center gap-1">
            <Icon name="ShieldCheck" size={11} />
            Все данные зашифрованы
          </p>
        </div>
      </div>
    </div>
  );
}

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "statuses", icon: "Circle", label: "Статусы" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "settings", icon: "Settings2", label: "Настройки" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");

  const renderContent = () => {
    switch (activeTab) {
      case "chats": return <ChatsTab />;
      case "contacts": return <ContactsTab />;
      case "calls": return <CallsTab />;
      case "statuses": return <StatusesTab />;
      case "profile": return <ProfileTab />;
      case "settings": return <SettingsTab />;
    }
  };

  const missedCallsCount = calls.filter(c => c.type === "missed").length;
  const unreadChats = chats.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-[390px] rounded-[44px] overflow-hidden flex flex-col"
        style={{
          height: "min(844px, calc(100vh - 32px))",
          background: "hsl(240 20% 6%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15)",
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
          <span className="text-[13px] font-rubik font-semibold text-foreground">9:41</span>
          <div className="flex items-center gap-1.5">
            <Icon name="Signal" size={14} className="text-foreground" />
            <Icon name="Wifi" size={14} className="text-foreground" />
            <Icon name="Battery" size={16} className="text-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>

        {/* Bottom nav */}
        <div
          className="flex-shrink-0 px-2 pt-1 pb-5 flex items-center justify-around"
          style={{
            background: "rgba(15,10,30,0.85)",
            backdropFilter: "blur(30px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const badge = tab.id === "chats" ? unreadChats : tab.id === "calls" ? missedCallsCount : 0;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all relative"
                style={{ minWidth: 48 }}
              >
                <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? "gradient-brand glow-violet scale-110" : "hover:bg-white/5"}`}>
                  <Icon
                    name={tab.icon}
                    size={18}
                    className={isActive ? "text-white" : "text-muted-foreground"}
                  />
                  {badge > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full gradient-brand text-[9px] font-bold text-white flex items-center justify-center px-1">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                </div>
                <span className={`text-[9px] font-rubik transition-all ${isActive ? "font-semibold gradient-brand-text" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}