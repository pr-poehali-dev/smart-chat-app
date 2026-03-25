import Icon from "@/components/ui/icon";
import { Tab, calls, chats } from "@/components/shared/ChatTypes";

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "statuses", icon: "Circle", label: "Статусы" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "settings", icon: "Settings2", label: "Настройки" },
];

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const missedCallsCount = calls.filter(c => c.type === "missed").length;
  const unreadChats = chats.reduce((sum, c) => sum + c.unread, 0);

  return (
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
            onClick={() => onTabChange(tab.id)}
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
  );
}
