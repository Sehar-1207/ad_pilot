'use client';

import ThemeToggle from '@/components/admin/profile/ThemeToggle';
import PersonalInfoForm from '@/components/admin/profile/PersonalInfoForm';
import SecuritySettings from '@/components/admin/profile/SecuritySettings';
import { ShieldCheck } from 'lucide-react';

export default function AdminProfilePage() {
  return (
    <div 
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="w-full min-h-screen px-4 py-8 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <div className="text-center">
          <h1 
            style={{ color: 'var(--text-primary)' }}
            className="text-2xl font-bold tracking-tight"
          >
            Admin Profile Settings
          </h1>
          <p 
            style={{ color: 'var(--text-primary)' }}
            className="text-sm mt-1 opacity-80 font-normal"
          >
            Manage your account preferences, theme appearance, and security credentials.
          </p>
        </div>

        <div 
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="border rounded-xl p-6 space-y-4 text-center flex flex-col items-center justify-center shadow-sm transition-colors"
        >
          <div>
            <h2 
              style={{ color: 'var(--text-primary)' }}
              className="text-base font-bold"
            >
              Appearance Theme
            </h2>
            <p 
              style={{ color: 'var(--text-primary)' }}
              className="text-xs mt-0.5 opacity-80 font-medium"
            >
              Select your preferred visual style for the Ad Pilot console interface.
            </p>
          </div>
          
          <div className="flex justify-center w-full">
            <ThemeToggle />
          </div>
        </div>

        <PersonalInfoForm />
        <SecuritySettings />

        <div 
          style={{
            backgroundColor: 'var(--bg-accent)',
            borderColor: 'var(--border-color)',
          }}
          className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between text-xs gap-3"
        >
          <div 
            style={{ color: 'var(--primary)' }}
            className="flex items-center gap-2 font-bold"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Root Administrator Session Active</span>
          </div>
          <span 
            style={{ color: 'var(--text-primary)' }}
            className="text-[11px] opacity-80 font-medium"
          >
            Last Login: Today at 12:40 PM
          </span>
        </div>
      </div>
    </div>
  );
}