import { useState } from "react";
import Icon from "@/components/ui/icon";
import { apiLogin } from "@/api";

interface Props {
  onLogin: (user: { id: number; name: string; phone: string }) => void;
}

export default function Login({ onLogin }: Props) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"phone" | "name">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhone = async () => {
    if (!phone.trim()) return;
    setLoading(true);
    setError("");
    const data = await apiLogin(phone.trim());
    setLoading(false);
    if (data.error && data.error.includes("имя")) {
      setStep("name");
    } else if (data.id) {
      onLogin(data);
    } else {
      setError(data.error || "Ошибка");
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    const data = await apiLogin(phone.trim(), name.trim());
    setLoading(false);
    if (data.id) {
      onLogin(data);
    } else {
      setError(data.error || "Ошибка регистрации");
    }
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <div
        className="w-full max-w-[390px] rounded-[44px] overflow-hidden flex flex-col"
        style={{
          background: "hsl(240 20% 6%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15)",
          minHeight: 480,
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center mb-6 animate-pulse-glow">
            <Icon name="MessageCircle" size={38} className="text-white" />
          </div>
          <h1 className="text-3xl font-golos font-bold text-white mb-2 text-center">CipherChat</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">
            {step === "phone" ? "Введите ваш номер телефона" : "Введите ваше имя для регистрации"}
          </p>

          {step === "phone" && (
            <div className="w-full space-y-3">
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handlePhone()}
                placeholder="+7 900 000-00-00"
                type="tel"
                className="w-full px-4 py-3 rounded-2xl glass text-foreground placeholder:text-muted-foreground outline-none text-center text-lg font-rubik"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              />
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                onClick={handlePhone}
                disabled={loading || !phone.trim()}
                className="w-full py-3 rounded-2xl gradient-brand text-white font-golos font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Проверяем..." : "Продолжить"}
              </button>
            </div>
          )}

          {step === "name" && (
            <div className="w-full space-y-3">
              <p className="text-center text-muted-foreground text-sm">Номер: <span className="text-foreground">{phone}</span></p>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleRegister()}
                placeholder="Ваше имя"
                className="w-full px-4 py-3 rounded-2xl glass text-foreground placeholder:text-muted-foreground outline-none text-center text-lg font-rubik"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                autoFocus
              />
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                onClick={handleRegister}
                disabled={loading || !name.trim()}
                className="w-full py-3 rounded-2xl gradient-brand text-white font-golos font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Регистрируем..." : "Зарегистрироваться"}
              </button>
              <button onClick={() => setStep("phone")} className="w-full text-muted-foreground text-sm hover:text-foreground transition-colors">
                ← Изменить номер
              </button>
            </div>
          )}
        </div>

        <div className="px-8 pb-8 text-center">
          <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <Icon name="ShieldCheck" size={11} className="text-emerald-400" />
            Все данные защищены сквозным шифрованием
          </p>
        </div>
      </div>
    </div>
  );
}
