"use client";

import { useState } from "react";
import { Settings, Shield, Bell, Lock, CheckCircle2 } from "lucide-react";

export default function GrowthOSSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
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
            Security & Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            GrowthOS Account Settings
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Configure security, session timeouts, and sprint notification delivery.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <div className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent-gold" />
          Notification Preferences
        </h3>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-border/60 cursor-pointer">
            <div>
              <span className="font-bold text-text-primary block">Sprint Milestone Alerts</span>
              <span className="text-text-muted text-[11px]">Receive emails when an embedded lead marks a sprint deliverable complete.</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-border/60 cursor-pointer">
            <div>
              <span className="font-bold text-text-primary block">Weekly Executive Unit Economics Digest</span>
              <span className="text-text-muted text-[11px]">Consolidated Monday morning PDF scorecard summarizing CAC and payback velocity.</span>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0"
            />
          </label>
        </div>

        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2 pt-4 border-t border-border">
          <Shield className="w-4 h-4 text-accent-gold" />
          Authentication & Access Security
        </h3>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-border/60 cursor-pointer">
            <div>
              <span className="font-bold text-text-primary block">Enforce Two-Factor Authentication (2FA)</span>
              <span className="text-text-muted text-[11px]">Require authenticator app verification code for all portal sign-ins.</span>
            </div>
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-0"
            />
          </label>
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

