"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, ShieldAlert, CheckCircle2, User, Loader2 } from "lucide-react";

interface Message {
  sender: string;
  role: string;
  time: string;
  text: string;
  isMe: boolean;
}

export default function GrowthOSMessagesPage() {
  const [userName, setUserName] = useState("Venture Executive");
  const [companyName, setCompanyName] = useState("Your Venture");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/growth/profile");
        if (res.ok) {
          const data = await res.json();
          const name = data.contact_name || data.full_name || "Venture Executive";
          const company = data.company_name || "Your Venture";
          setUserName(name);
          setCompanyName(company);

          setMessages([
            {
              sender: "Adebayo Ogunlesi",
              role: "Managing Partner • Commercial Strategy",
              time: "Initial Advisory Note",
              text: `Welcome to GrowthOS, ${name}. Our managing partners have received the onboarding dossier for ${company}. We are reviewing your commercial targets and unit economics diagnostic. Feel free to drop any questions or sprint priorities here directly.`,
              isMe: false,
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: userName,
        role: `${companyName} Executive`,
        time: "Just now",
        text: input,
        isMe: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="p-6 lg:p-10 space-y-6 max-w-4xl h-[calc(100vh-2rem)] flex flex-col">
      <div className="pb-4 border-b border-border flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Encrypted Communications
          </span>
          <h1 className="text-2xl font-bold text-text-primary mt-1">
            Executive Partner Channel
          </h1>
          <p className="text-xs text-text-muted">
            Direct high-touch liaison between {companyName} and XC Global managing partners.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low border border-border text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          <span>Active Session</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 bg-surface-white rounded-2xl border border-border shadow-card p-6 overflow-y-auto space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-text-muted">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span className="text-xs font-medium">Connecting to encrypted executive channel...</span>
          </div>
        ) : (
          messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.isMe ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[11px] text-text-muted">
                <span className="font-bold text-text-primary">{m.sender}</span>
                <span>•</span>
                <span>{m.role}</span>
                <span>•</span>
                <span>{m.time}</span>
              </div>
              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  m.isMe
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-surface-container-low text-text-primary border border-border/80 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Send a direct memo to XC Global Managing Partner regarding ${companyName}...`}
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-surface-white text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>Send</span>
          <Send className="w-4 h-4 text-secondary" />
        </button>
      </form>
    </div>
  );
}
