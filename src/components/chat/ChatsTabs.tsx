import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, EncryptBadge, chats, contacts, calls } from "@/components/shared/ChatTypes";

export function ChatsTab() {
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

export function ContactsTab() {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce<Record<string, typeof contacts>>((acc, c) => {
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

export function CallsTab() {
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
