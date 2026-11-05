"use client";

import { useState } from "react";
import { Settings, Shield, Bell, CheckCircle2, Lock } from "lucide-react";

export default function TalentOSSettingsPage() {
  const [opportunityAlerts, setOpportunityAlerts] = useState(true);
  const [escrowPayoutAlerts, setEscrowPayoutAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Security & Alerts
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            TalentOS Account Settings
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Configure opportunity matching alerts, payout notifications, and profile visibility.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      <div className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent-gold" />
          Brief Matching & Payout Alerts
        </h3>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-border/60 cursor-pointer">
            <div>
              <span className="font-bold text-text-primary block">Instant Opportunity Match Notifications</span>
              <span className="text-text-muted text-[11px]">Notify me via email immediately when a new brief matching my skills is published.</span>
            </div>
            <input
              type="checkbox"
              checked={opportunityAlerts}
              onChange={(e) => setOpportunityAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-border/60 cursor-pointer">
            <div>
              <span className="font-bold text-text-primary block">Escrow Milestone Payout Confirmations</span>
              <span className="text-text-muted text-[11px]">Receive transaction receipts whenever sprint milestone funds are released to your bank.</span>
            </div>
            <input
              type="checkbox"
              checked={escrowPayoutAlerts}
              onChange={(e) => setEscrowPayoutAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0"
            />
          </label>
        </div>

        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 pt-4 border-t border-border">
          <Shield className="w-4 h-4 text-accent-gold" />
          Privacy & Visibility
        </h3>

        <div className="p-4 rounded-xl bg-surface-container-low border border-border/60 text-xs text-text-secondary space-y-2">
          <p className="font-bold text-text-primary">Private by Default Guarantee</p>
          <p className="text-[11px] leading-relaxed">
            Your full name, phone number, and current employer details are never published to an open search index. Only approved XC Global client partners reviewing your shortlist application can access your dossier.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

