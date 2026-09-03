"use client";

import { Camera, Building2 } from "lucide-react";

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "USER" | "ADMIN";
  avatarUrl?: string;
  companyName?: string;
  createdAt?: string;
}

interface ProfileHeaderProps {
  profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const getInitials = (value: string) => {
    if (!value) return "U";

    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const formatRole = (role?: string) => {
    if (role === "ADMIN") {
      return "Workspace Owner";
    }

    return "Workspace Member";
  };

  const formatDate = (date?: string) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-[var(--gradient-brand)] p-1 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-2xl font-bold text-[var(--primary)] overflow-hidden">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(profile.name)
              )}
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
            <h2 className="text-xl font-bold">
              {profile.name}
            </h2>

            <span className="inline-flex items-center justify-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] w-fit mx-auto sm:mx-0">
              {formatRole(profile.role)}
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            {profile.email}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-[var(--text-secondary)] pt-2">
            {profile.companyName && (
              <>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {profile.companyName}
                </span>

                <span>•</span>
              </>
            )}

            <span>
              Member since {formatDate(profile.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}