'use client';

import Link from 'next/link';
import { Sparkles, Lock } from 'lucide-react';

interface GeminiAiCardProps {
  userPlan: 'free' | 'pro';
}

export function GeminiAiCard({ userPlan }: GeminiAiCardProps) {
  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] shadow-sm p-6 relative overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[var(--brand-blue)]/10 rounded-xl border border-[var(--brand-teal)]/30">
            <Sparkles size={20} className="text-[var(--brand-teal)]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Gemini AI Optimization Engine</h2>
            <p className="text-xs text-[var(--text-secondary)] font-medium">Automated campaign audits & budget reallocation recommendations</p>
          </div>
        </div>
        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
          userPlan === 'pro' 
            ? 'bg-[var(--brand-teal)]/15 text-[var(--brand-teal)] border-[var(--brand-teal)]/30' 
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
        }`}>
          {userPlan === 'pro' ? 'PRO UNLOCKED' : 'FREE TIER'}
        </span>
      </div>

      {userPlan === 'free' ? (
        <div className="relative mt-4">
          <div className="filter blur-md select-none opacity-40 space-y-3 pointer-events-none">
            <div className="p-4 bg-[var(--bg-accent)] rounded-xl border border-[var(--border-color)]">
              <p className="font-bold text-sm text-[var(--text-primary)]">Recommendation: Increase budget on "Summer Retargeting" by 15%</p>
              <p className="text-xs text-[var(--text-secondary)]">ROAS is 3.4x higher than account average. Reallocating $150 will lower CPA by 12%.</p>
            </div>
            <div className="p-4 bg-[var(--bg-accent)] rounded-xl border border-[var(--border-color)]">
              <p className="font-bold text-sm text-[var(--text-primary)]">Creative Alert: High Frequency detected on Ad Set B</p>
              <p className="text-xs text-[var(--text-secondary)]">CTR has dropped by 0.6%. Replace visual ad copy to avoid ad fatigue.</p>
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-surface)]/80 backdrop-blur-md rounded-xl p-6 text-center border border-[var(--border-color)]">
            <div className="p-3 bg-[var(--brand-blue)] text-white rounded-full mb-3 shadow-lg">
              <Lock size={22} />
            </div>
            <h3 className="text-lg font-black text-[var(--text-primary)]">Unlock Gemini AI Recommendations</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mt-1 mb-4">
              Upgrade to the AdPilot Pro Plan ($29/mo) to receive real-time AI budget suggestions and creative optimization insights.
            </p>
            <Link
              href="/pricing"
              className="px-6 py-2.5 bg-[var(--brand-blue)] hover:bg-[var(--primary-hover)] text-white text-xs font-black rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Upgrade Now ($29/month)
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="p-4 bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/20 rounded-xl">
            <p className="font-bold text-sm text-[var(--accent-teal)]">💡 Scale High ROAS Campaign</p>
            <p className="text-xs text-[var(--text-primary)] mt-0.5">
              "Summer Retargeting - Conversions" is performing at 3.4x ROAS. Increasing budget by 15% is projected to yield +$420 in revenue this week.
            </p>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="font-bold text-sm text-amber-600 dark:text-amber-400">⚠️ Ad Fatigue Warning</p>
            <p className="text-xs text-[var(--text-primary)] mt-0.5">
              "Brand Awareness" CTR has declined to 1.2%. Gemini recommends refreshing image creative to restore engagement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}