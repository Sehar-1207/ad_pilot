"use client";

import { useState } from "react";
import { User, Mail, Phone, Shield,  Key, Camera, Check, Building2, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
      
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile & Account</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage your personal information, security credentials, and active account sessions.
          </p>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-[var(--gradient-brand)] p-1 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-2xl font-bold text-[var(--primary)] overflow-hidden">
                  SA
                </div>
              </div>
              <button 
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-[var(--primary)] text-white rounded-full shadow-md hover:bg-[var(--primary-hover)] transition-colors"
                title="Change Avatar"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="text-xl font-bold">Sehar Ajmal</h2>
                <span className="inline-flex items-center justify-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] w-fit mx-auto sm:mx-0">
                  Workspace Owner
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">sehar.ajmal@example.com</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-[var(--text-secondary)] pt-2">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> Arch Technologies
                </span>
                <span>•</span>
                <span>Member since Jan 2026</span>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <p className="text-sm text-[var(--text-secondary)]">Update your profile details and primary contact information.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--text-secondary)]" /> Full Name
              </label>
              <input
                type="text"
                defaultValue="Sehar Ajmal"
                className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--text-secondary)]" /> Email Address
              </label>
              <input
                type="email"
                defaultValue="sehar.ajmal@example.com"
                className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--text-secondary)]" /> Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+92 300 1234567"
                className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--text-secondary)]" /> Assigned Role
              </label>
              <input
                type="text"
                value="Admin / Full Access"
                disabled
                className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)] opacity-75 cursor-not-allowed"
              />
            </div>

            <div className="md:col-span-2 flex justify-end pt-2">
              <button 
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Key className="w-5 h-5 text-[var(--primary)]" /> Change Password
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">Ensure your account is using a long, random password to stay secure.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}