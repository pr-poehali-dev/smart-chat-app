import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { apiGetMessages, apiSendMessage } from "@/api";

interface Message {
  id: number;
  text: string;
  created_at: string;
  name: string;
  phone: string;
}

interface Props {
  user: { id: number; name: string; phone: string };
}

function playNotification() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (_e) {
    // AudioContext not supported
  }
}

export default function GlobalChat({ user }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastIdRef = useRef(0);
  const initialLoadRef = useRef(true);

  const loadMessages = async () => {
    const msgs = await apiGetMessages(lastIdRef.current);
    if (msgs.length > 0) {
      lastIdRef.current = msgs[msgs.length - 1].id;
      if (!initialLoadRef.current) {
        const hasOthers = msgs.some(m => m.phone !== user.phone);
        if (hasOthers) playNotification();
      }
      initialLoadRef.current = false;
      setMessages(prev => [...prev, ...msgs]);
    } else {
      initialLoadRef.current = false;
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setText("");
    await apiSendMessage(user.id, trimmed);
    await loadMessages();
    setSending(false);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-golos font-bold text-white">Общий чат</h1>
            <p className="text-[12px] text-muted-foreground mt-0.5">Все пользователи</p>
          </div>
          <div className="px-2 py-1 rounded-full flex items-center gap-1" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Icon name="ShieldCheck" size={11} className="text-emerald-400" />
            <span className="text-[10px] text-emerald-400">Зашифровано</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-2">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">Будьте первым — напишите сообщение!</p>
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.phone === user.phone;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              {!isMe && (
                <span className="text-[11px] text-primary font-golos font-semibold px-1 mb-0.5">{msg.name}</span>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm font-rubik ${isMe ? "text-white" : "glass text-foreground"}`}
                style={isMe ? { background: "linear-gradient(135deg,#7c3aed,#db2777)" } : {}}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-muted-foreground px-1 mt-0.5">{formatTime(msg.created_at)}</span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="flex-shrink-0 px-3 pb-4 pt-2 flex gap-2 items-end">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Сообщение..."
          className="flex-1 px-4 py-2.5 rounded-2xl glass text-foreground placeholder:text-muted-foreground outline-none text-sm font-rubik"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        />
        <button
          onClick={send}
          disabled={!text.trim() || sending}
          className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center flex-shrink-0 disabled:opacity-50 hover:scale-110 transition-transform"
        >
          <Icon name="Send" size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}