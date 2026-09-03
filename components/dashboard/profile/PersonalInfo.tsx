"use client";

import React from "react";
import { User, Mail, Phone, Shield, RefreshCw, Check } from "lucide-react";

interface PersonalInfoFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  role?: string;
  savingProfile: boolean;
  onSave: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function PersonalInfoForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  role,
  savingProfile,
  onSave,
}: PersonalInfoFormProps) {
  const formatRole = (role?: string) => {
    if (role === "ADMIN") {
      return "Workspace Owner";
    }

    return "Workspace Member";
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 space-y-6 shadow-sm">
      <div>
        <h3 className="font-semibold text-lg">
          Personal Information
        </h3>

        <p className="text-sm text-[var(--text-secondary)]">
          Update your profile details and primary contact information.
        </p>
      </div>

      <form
        onSubmit={onSave}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--text-secondary)]" />
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
            className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-[var(--text-secondary)]" />
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4 text-[var(--text-secondary)]" />
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--text-secondary)]" />
            Assigned Role
          </label>

          <input
            type="text"
            value={formatRole(role)}
            disabled
            className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)] opacity-75 cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingProfile}
            className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors flex items-center gap-2 disabled:opacity-60"
          >
            {savingProfile ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}

            {savingProfile
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}