"use client";

import React from "react";
import { Key, Eye, EyeOff, RefreshCw } from "lucide-react";

interface PasswordUpdateFormProps {
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showCurrentPassword: boolean;
  setShowCurrentPassword: (value: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (value: boolean) => void;
  updatingPassword: boolean;
  onUpdatePassword: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function PasswordUpdateForm({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  updatingPassword,
  onUpdatePassword,
}: PasswordUpdateFormProps) {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 space-y-6 shadow-sm">
      <div>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Key className="w-5 h-5 text-[var(--primary)]" />
          Change Password
        </h3>

        <p className="text-sm text-[var(--text-secondary)]">
          Update your account password securely.
        </p>
      </div>

      <form
        onSubmit={onUpdatePassword}
        className="space-y-4 max-w-xl"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              required
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-10"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {showCurrentPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] pr-10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(!showNewPassword)
                }
                className="absolute right-3 top-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[var(--bg-accent)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updatingPassword}
          className="px-5 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors flex items-center gap-2 disabled:opacity-60"
        >
          {updatingPassword && (
            <RefreshCw className="w-4 h-4 animate-spin" />
          )}

          {updatingPassword
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
}