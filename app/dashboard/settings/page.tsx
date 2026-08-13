"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Link2, RefreshCw, CheckCircle2, Sliders, Bell, CreditCard, Moon, Sun, Download, ExternalLink} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"integrations" | "preferences" | "notifications" | "billing">("integrations");
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen text-[var(--text-primary)] p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage your Meta API connections, preferences, alerts, and subscription details.
          </p>
        </div>
        <div className="flex space-x-1 border-b border-[var(--border-color)] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("integrations")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "integrations"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Link2 className="w-4 h-4" />
            Meta Connections
          </button>

          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "preferences"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Sliders className="w-4 h-4" />
            Preferences
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "notifications"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>

          <button
            onClick={() => setActiveTab("billing")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "billing"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Billing & Usage
          </button>
        </div>
        <div className="space-y-6">
          {activeTab === "integrations" && (
            <div className="space-y-6">
              
              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--social-facebook)] text-white flex items-center justify-center font-bold text-xl">
                      f
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">Meta Business Account</h3>
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">
                          <CheckCircle2 className="w-3 h-3" /> Connected
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">Connected as Workspace Manager</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--bg-accent)] text-[var(--text-primary)] hover:opacity-90 transition-opacity border border-[var(--border-color)]">
                    <RefreshCw className="w-4 h-4" /> Re-authenticate Token
                  </button>
                </div>
                
                <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-accent)] p-3 rounded-lg flex items-center justify-between">
                  <span>System Access Token: <strong>Active (Expires in 52 days)</strong></span>
                  <a href="#" className="text-[var(--primary)] hover:underline flex items-center gap-1">Meta Portal <ExternalLink className="w-3 h-3" /></a>
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Active Ad Accounts</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Select accounts to sync metrics to your dashboard.</p>
                </div>

                <div className="divide-y divide-[var(--border-color)] border border-[var(--border-color)] rounded-lg overflow-hidden">
                  {[
                    { name: "E-Commerce Main Store", id: "act_98234102", pixel: "px_883201", checked: true },
                    { name: "Brand Awareness Campaigns", id: "act_47219033", pixel: "px_110293", checked: true },
                    { name: "Retargeting Testing", id: "act_10293811", pixel: "px_994021", checked: false },
                  ].map((account) => (
                    <div key={account.id} className="p-4 flex items-center justify-between hover:bg-[var(--bg-accent)] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked={account.checked}
                          className="w-4 h-4 rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                        <div>
                          <p className="text-sm font-medium">{account.name}</p>
                          <p className="text-xs text-[var(--text-secondary)]">ID: {account.id} • Pixel: {account.pixel}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        account.checked 
                          ? "bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]" 
                          : "bg-[var(--bg-accent)] text-[var(--text-secondary)]"
                      }`}>
                        {account.checked ? "Syncing" : "Disabled"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Data Sync Preferences</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Configure how often performance data updates from Meta.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sync Frequency</label>
                    <select className="w-full px-3 py-2 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option value="hourly">Hourly (Recommended)</option>
                      <option value="webhooks">Real-time via Meta Webhooks</option>
                      <option value="daily">Once Daily</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Import Range</label>
                    <select className="w-full px-3 py-2 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                      <option value="365">Last 1 Year</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-[var(--border-color)]">
                  <p className="text-xs text-[var(--text-secondary)]">Last sync: 12 mins ago</p>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Sync Data Now
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === "preferences" && (
            <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Dashboard Preferences</h3>
                <p className="text-sm text-[var(--text-secondary)]">Customize display currency, timezone, and theme.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reporting Timezone</label>
                  <select className="w-full px-3 py-2 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="PKT">PKT (Pakistan Standard Time)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Currency</label>
                  <select className="w-full px-3 py-2 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="PKR">PKR (Rs) - Pakistani Rupee</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Appearance Theme</label>
                  <div className="flex gap-3 max-w-sm">
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`flex-1 p-2.5 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                        theme === "light"
                          ? "border-[var(--primary)] bg-[var(--bg-accent)] text-[var(--primary)]"
                          : "border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Sun className="w-4 h-4" /> Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`flex-1 p-2.5 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                        theme === "dark"
                          ? "border-[var(--primary)] bg-[var(--bg-accent)] text-[var(--primary)]"
                          : "border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Moon className="w-4 h-4" /> Dark
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[var(--border-color)]">
                <button className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Alerts & Delivery</h3>
                <p className="text-sm text-[var(--text-secondary)]">Manage essential triggers and notification channels.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[var(--bg-accent)]">
                  <div>
                    <p className="text-sm font-medium">Email Alerts</p>
                    <p className="text-xs text-[var(--text-secondary)]">Receive performance anomaly and API renewal summaries.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]" />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[var(--bg-accent)]">
                  <div>
                    <p className="text-sm font-medium">Token Expiration Reminder</p>
                    <p className="text-xs text-[var(--text-secondary)]">Notify when your Meta access token requires re-authentication.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[var(--border-color)]">
                <button className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              
              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[var(--accent-teal)] font-bold">Current Plan</span>
                    <h3 className="text-2xl font-bold mt-1">Pro Analytics Plan</h3>
                    <p className="text-sm text-[var(--text-secondary)]">$49 / month • Renews September 2026</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors">
                    Upgrade Plan
                  </button>
                </div>
                <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Connected Ad Accounts</span>
                      <span>2 of 5 Accounts Used</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg-accent)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)] w-[40%] rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Monthly Meta API Sync Credits</span>
                      <span>84,200 / 100,000 Calls</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg-accent)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--accent-teal)] w-[84%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Billing & Invoices</h3>
                  <p className="text-sm text-[var(--text-secondary)]">Manage payment cards and download past payment receipts.</p>
                </div>

                <div className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-7 bg-[var(--bg-accent)] rounded border border-[var(--border-color)] flex items-center justify-center font-bold text-xs">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-[var(--text-secondary)]">Expires 12/28</p>
                    </div>
                  </div>
                  <button className="text-xs text-[var(--primary)] font-medium hover:underline">Edit Card</button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Invoice History</h4>
                  <div className="divide-y divide-[var(--border-color)] border border-[var(--border-color)] rounded-lg overflow-hidden text-sm">
                    {[
                      { id: "INV-2026-008", date: "Aug 01, 2026", amount: "$49.00" },
                      { id: "INV-2026-007", date: "Jul 01, 2026", amount: "$49.00" },
                    ].map((invoice) => (
                      <div key={invoice.id} className="p-3 flex items-center justify-between hover:bg-[var(--bg-accent)] transition-colors">
                        <div>
                          <p className="font-medium text-xs">{invoice.id}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{invoice.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-xs">{invoice.amount}</span>
                          <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}