import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, statuses } from "@/components/shared/ChatTypes";

export function StatusesTab() {
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

export function ProfileTab() {
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

export function SettingsTab() {
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
