import Icon from "@/components/ui/icon";

export type Tab = "chats" | "contacts" | "calls" | "statuses" | "profile" | "settings";

export interface Chat {
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

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
  status: string;
}

export interface Call {
  id: number;
  name: string;
  avatar: string;
  type: "incoming" | "outgoing" | "missed";
  callType: "audio" | "video";
  time: string;
  duration?: string;
}

export interface Status {
  id: number;
  name: string;
  avatar: string;
  time: string;
  viewed: boolean;
  gradient: string;
  text: string;
}

export const chats: Chat[] = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", lastMsg: "Увидимся в 7 вечера!", time: "сейчас", unread: 3, online: true, encrypted: true, typing: true },
  { id: 2, name: "Дизайн-команда", avatar: "ДК", lastMsg: "Макеты готовы к ревью", time: "2 мин", unread: 12, online: true, encrypted: true },
  { id: 3, name: "Максим Петров", avatar: "МП", lastMsg: "Хорошо, договорились 👍", time: "15 мин", unread: 0, online: false, encrypted: true },
  { id: 4, name: "Кристина Лебедева", avatar: "КЛ", lastMsg: "Ты смотрел этот фильм?", time: "1 ч", unread: 1, online: true, encrypted: true },
  { id: 5, name: "Андрей Козлов", avatar: "АК", lastMsg: "Отправил документы на почту", time: "3 ч", unread: 0, online: false, encrypted: true },
  { id: 6, name: "Семья ❤️", avatar: "СЕ", lastMsg: "Мама: Все хорошо, звони!", time: "вчера", unread: 5, online: false, encrypted: true },
  { id: 7, name: "Виктория Новак", avatar: "ВН", lastMsg: "Спасибо за помощь!", time: "вчера", unread: 0, online: true, encrypted: true },
  { id: 8, name: "Рабочий чат", avatar: "РЧ", lastMsg: "Митинг перенесли на пятницу", time: "Пн", unread: 0, online: false, encrypted: true },
];

export const contacts: Contact[] = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", phone: "+7 999 123-45-67", online: true, status: "На работе" },
  { id: 2, name: "Андрей Козлов", avatar: "АК", phone: "+7 985 234-56-78", online: false, status: "Не беспокоить" },
  { id: 3, name: "Виктория Новак", avatar: "ВН", phone: "+7 916 345-67-89", online: true, status: "Всегда на связи 📱" },
  { id: 4, name: "Кристина Лебедева", avatar: "КЛ", phone: "+7 977 456-78-90", online: true, status: "Живу в моменте ✨" },
  { id: 5, name: "Максим Петров", avatar: "МП", phone: "+7 926 567-89-01", online: false, status: "В отпуске 🌴" },
  { id: 6, name: "Мама", avatar: "МА", phone: "+7 903 678-90-12", online: false, status: "Позвони мне!" },
];

export const calls: Call[] = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", type: "incoming", callType: "video", time: "сейчас", duration: "12:34" },
  { id: 2, name: "Максим Петров", avatar: "МП", type: "missed", callType: "audio", time: "2 ч назад" },
  { id: 3, name: "Кристина Лебедева", avatar: "КЛ", type: "outgoing", callType: "audio", time: "вчера", duration: "5:21" },
  { id: 4, name: "Андрей Козлов", avatar: "АК", type: "incoming", callType: "video", time: "вчера", duration: "1:02:15" },
  { id: 5, name: "Виктория Новак", avatar: "ВН", type: "outgoing", callType: "video", time: "Пн", duration: "28:47" },
  { id: 6, name: "Рабочий чат", avatar: "РЧ", type: "missed", callType: "audio", time: "Вс" },
];

export const statuses: Status[] = [
  { id: 1, name: "Мой статус", avatar: "Я", time: "", viewed: false, gradient: "linear-gradient(135deg,#7c3aed,#db2777)", text: "+ Добавить статус" },
  { id: 2, name: "Алиса Морозова", avatar: "АМ", time: "5 мин назад", viewed: false, gradient: "linear-gradient(135deg,#06b6d4,#6366f1)", text: "Наслаждаюсь летом ☀️" },
  { id: 3, name: "Виктория Новак", avatar: "ВН", time: "1 ч назад", viewed: false, gradient: "linear-gradient(135deg,#f59e0b,#ef4444)", text: "Новый проект запущен 🚀" },
  { id: 4, name: "Кристина Лебедева", avatar: "КЛ", time: "2 ч назад", viewed: true, gradient: "linear-gradient(135deg,#10b981,#06b6d4)", text: "" },
  { id: 5, name: "Максим Петров", avatar: "МП", time: "вчера", viewed: true, gradient: "linear-gradient(135deg,#8b5cf6,#ec4899)", text: "В горах 🏔️" },
];

export const avatarGradients: Record<string, string> = {
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

export function Avatar({ code, size = 44 }: { code: string; size?: number }) {
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

export function EncryptBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400">
      <Icon name="Lock" size={9} />
    </span>
  );
}
