"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import apiClient from "@/api/client";

import { ProfileHeader, Profile } from "@/components/dashboard/profile/ProfileHeader";
import { PersonalInfoForm } from "@/components/dashboard/profile/PersonalInfo";
import { PasswordUpdateForm } from "@/components/dashboard/profile/PasswordForm";

interface ProfileResponse {
  success: boolean;
  data: Profile;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get<ProfileResponse>(
        "/dashboard/profile"
      );

      const data = response.data.data;

      setProfile(data);
      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSavingProfile(true);
      setMessage("");
      setError("");

      const response = await apiClient.put<ProfileResponse>(
        "/dashboard/profile",
        {
          name,
          email,
          phone,
        }
      );

      const updatedProfile = response.data.data;

      setProfile(updatedProfile);
      setName(updatedProfile.name || "");
      setEmail(updatedProfile.email || "");
      setPhone(updatedProfile.phone || "");

      setMessage("Profile updated successfully.");
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      setMessage("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      setMessage("");
      return;
    }

    try {
      setUpdatingPassword(true);
      setMessage("");
      setError("");

      await apiClient.put("/dashboard/profile/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage("Password updated successfully.");
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Unable to update password."
      );
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 md:p-10">
        <div className="max-w-5xl mx-auto flex items-center justify-center min-h-[400px]">
          <RefreshCw className="w-6 h-6 animate-spin text-[var(--primary)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Profile & Account
          </h1>

          <p className="text-[var(--text-secondary)] mt-1">
            Manage your personal information, security credentials, and account details.
          </p>
        </div>

        {message && (
          <div className="rounded-lg border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/10 px-4 py-3 text-sm text-[var(--accent-teal)]">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {profile && (
          <>
            <ProfileHeader profile={profile} />

            <PersonalInfoForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              role={profile.role}
              savingProfile={savingProfile}
              onSave={saveProfile}
            />

            <PasswordUpdateForm
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showCurrentPassword={showCurrentPassword}
              setShowCurrentPassword={setShowCurrentPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              updatingPassword={updatingPassword}
              onUpdatePassword={updatePassword}
            />
          </>
        )}
      </div>
    </div>
  );
}