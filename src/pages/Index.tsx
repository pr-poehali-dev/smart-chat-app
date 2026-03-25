import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Login from "./Login";
import GlobalChat from "@/components/chat/GlobalChat";
import CallsList from "@/components/chat/CallsList";

type Tab = "chat" | "calls" | "profile";

interface User {
  id: number;
  name: string;
  phone: string;
}

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "chat", icon: "MessageCircle", label: "Чат" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  useEffect(() => {
    const saved = localStorage.getItem("cipher_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (u: User) => {
    localStorage.setItem("cipher_user", JSON.stringify(u));
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("cipher_user");
    setUser(null);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const initials = user.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  const renderContent = () => {
    switch (activeTab) {
      case "chat": return <GlobalChat user={user} />;
      case "calls": return <CallsList currentUser={user} />;
      case "profile": return (
        <div className="flex flex-col h-full overflow-y-auto pb-4">
          <div className="relative h-32 flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(270 80% 40%), hsl(310 80% 40%), hsl(190 90% 35%))" }} />
          <div className="px-5 relative">
            <div className="-mt-10 mb-3 inline-block">
              <div className="w-20 h-20 rounded-full p-0.5 animate-pulse-glow" style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
                <div className="w-full h-full rounded-full flex items-center justify-center font-golos font-bold text-white text-2xl" style={{ background: "linear-gradient(135deg,#5b21b6,#9d174d)" }}>
                  {initials}
                </div>
              </div>
            </div>
            <h2 className="text-xl font-golos font-bold text-foreground mb-1">{user.name}</h2>
            <p className="text-[13px] text-muted-foreground mb-6">{user.phone}</p>

            <div className="glass rounded-2xl overflow-hidden mb-4">
              {[
                { icon: "User", label: "Имя", value: user.name },
                { icon: "Phone", label: "Телефон", value: user.phone },
              ].map(({ icon, label, value }, i) => (
                <div key={label} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? "border-b border-white/5" : ""}`}>
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

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl glass text-red-400 font-golos font-semibold hover:bg-red-400/10 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="LogOut" size={16} className="text-red-400" />
              Выйти из аккаунта
            </button>
          </div>
        </div>
      );
    }
  };

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
        <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
          <span className="text-[13px] font-rubik font-semibold text-foreground">9:41</span>
          <div className="flex items-center gap-1.5">
            <Icon name="Signal" size={14} className="text-foreground" />
            <Icon name="Wifi" size={14} className="text-foreground" />
            <Icon name="Battery" size={16} className="text-foreground" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>

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
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition-all relative"
                style={{ minWidth: 64 }}
              >
                <div className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? "gradient-brand glow-violet scale-110" : "hover:bg-white/5"}`}>
                  <Icon name={tab.icon} size={18} className={isActive ? "text-white" : "text-muted-foreground"} />
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
