'use client';

import { useState } from 'react';
import { User, Mail, Shield, Check } from 'lucide-react';

export default function PersonalInfoForm() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sehar Ajmal',
    email: 'seharajmal452@gmail.com',
    role: 'Super Administrator',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="border rounded-xl p-6 space-y-6 transition-colors shadow-sm"
    >
      <div>
        <h2
          style={{ color: 'var(--text-primary)' }}
          className="text-base font-bold"
        >
          Personal Information
        </h2>
        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-xs opacity-60 mt-0.5"
        >
          Update your public profile details and administrative contact.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          style={{ borderColor: 'var(--border-color)' }}
          className="flex items-center gap-4 pb-4 border-b"
        >
          <div
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="w-16 h-16 rounded-full font-bold text-xl flex items-center justify-center shrink-0 border-2 border-white/20 shadow-sm"
          >
            SA
          </div>
          <div className="space-y-1">
            <h3
              style={{ color: 'var(--text-primary)' }}
              className="text-sm font-semibold"
            >
              {formData.name}
            </h3>
            <p
              style={{ color: 'var(--text-primary)' }}
              className="text-xs opacity-60"
            >
              {formData.role}
            </p>
            <button
              type="button"
              style={{ color: 'var(--primary)' }}
              className="text-xs font-semibold hover:underline opacity-90 hover:opacity-100"
            >
              Change Avatar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              style={{ color: 'var(--text-primary)' }}
              className="text-xs font-semibold flex items-center gap-1.5 opacity-80"
            >
              <User className="w-3.5 h-3.5 opacity-50" /> Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              className="w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label
              style={{ color: 'var(--text-primary)' }}
              className="text-xs font-semibold flex items-center gap-1.5 opacity-80"
            >
              <Mail className="w-3.5 h-3.5 opacity-50" /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              className="w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            style={{ color: 'var(--text-primary)' }}
            className="text-xs font-semibold flex items-center gap-1.5 opacity-80"
          >
            <Shield className="w-3.5 h-3.5 opacity-50" /> Administrative Role
          </label>
          <input
            type="text"
            disabled
            value={formData.role}
            style={{
              backgroundColor: 'var(--bg-accent)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-full border rounded-lg px-3 py-2 text-xs font-medium opacity-50 cursor-not-allowed"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="flex items-center gap-2 px-4 py-2 hover:opacity-90 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            {saved ? 'Changes Saved' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}