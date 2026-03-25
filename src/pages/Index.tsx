import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Tab } from "@/components/shared/ChatTypes";
import { ChatsTab, ContactsTab, CallsTab } from "@/components/chat/ChatsTabs";
import { StatusesTab, ProfileTab, SettingsTab } from "@/components/chat/ProfileTabs";
import BottomNav from "@/components/layout/BottomNav";

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
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
