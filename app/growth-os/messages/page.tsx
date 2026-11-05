"use client";

import { useState } from "react";
import { MessageSquare, Send, ShieldAlert, CheckCircle2, User } from "lucide-react";

export default function GrowthOSMessagesPage() {
  const [messages, setMessages] = useState([
    {
      sender: "Adebayo Ogunlesi (Managing Director)",
      role: "XC Global Partner",
      time: "Yesterday, 3:45 PM",
      text: "Tunde, we have reviewed the attribution pipeline for Sprint 14. Server-side CAPI is now capturing 96.2% of purchase events without browser ad-blocker leakage. We will present the CAC improvements in Friday's review.",
      isMe: false,
    },
    {
      sender: "Tunde Balogun",
      role: "ApexPay Founder",
      time: "Yesterday, 4:10 PM",
      text: "Excellent news Adebayo. Let's make sure the board pack has the CAC-to-payback charts ready for Monday.",
      isMe: true,
    },
    {
      sender: "David K. (Fractional Lead)",
      role: "Embedded Squad Lead",
      time: "Today, 10:15 AM",
      text: "Board pack charts are ready and synced to your GrowthOS dashboard. Blended CAC is sitting at ₦44,700, safely below our ₦51,300 hurdle rate.",
      isMe: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "Tunde Balogun",
        role: "ApexPay Founder",
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
            Direct high-touch liaison between ApexPay and XC Global managing partners.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low border border-border text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-success" />
          <span>Active Session</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 bg-surface-white rounded-2xl border border-border shadow-card p-6 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
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
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send an instruction or note to your XC Global managing directors..."
          className="flex-1 px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface-white"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
        >
          <span>Send</span>
          <Send className="w-4 h-4 text-secondary" />
        </button>
      </form>
    </div>
  );
}

