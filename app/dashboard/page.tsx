'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  MousePointer, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Lock, 
  ArrowUpRight, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [userPlan] = useState<'free' | 'pro'>('free');
  const [isMetaConnected] = useState(false);
  
  const campaigns = [
    { name: 'Summer Retargeting - Conversions', spend: '$1,240.00', clicks: '3,420', ctr: '2.8%', roas: '3.4x', status: 'Active' },
    { name: 'Lookalike Audience - Creative B', spend: '$850.50', clicks: '1,910', ctr: '1.9%', roas: '2.1x', status: 'Active' },
    { name: 'Brand Awareness - Top of Funnel', spend: '$410.00', clicks: '980', ctr: '1.2%', roas: '1.4x', status: 'Paused' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Campaign Performance
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mt-1">
            Real-time Meta advertising analytics and Gemini AI suggestions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-accent)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold rounded-xl transition-colors">
            <RefreshCw size={14} />
            <span>Sync Data</span>
          </button>
          
          {userPlan === 'free' && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-[#3B82F6]/20 active:scale-[0.98]"
            >
              <Sparkles size={14} className="fill-white" />
              <span>Upgrade to Pro ($29/mo)</span>
            </Link>
          )}
        </div>
      </div>

      {!isMetaConnected && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-amber-500">
            <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
            <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
              Your Meta Ads account is not connected yet. Connect your account to view real-time data.
            </p>
          </div>
          <button className="text-xs font-extrabold text-amber-500 bg-amber-500/15 hover:bg-amber-500/25 px-4 py-2 rounded-xl transition-colors flex-shrink-0 border border-amber-500/20">
            Connect Now
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Total Spend</span>
            <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[var(--text-primary)] mt-3">$2,500.50</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} />
            <span>+12.4% vs last week</span>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Impressions</span>
            <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <Eye size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[var(--text-primary)] mt-3">142,800</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} />
            <span>+8.1% vs last week</span>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Total Clicks</span>
            <div className="p-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl">
              <MousePointer size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[var(--text-primary)] mt-3">6,310</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-500">
            <ArrowUpRight size={14} />
            <span>+5.2% CTR Avg</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white p-6 rounded-2xl border border-[#3B82F6]/30 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Average ROAS</span>
            <div className="p-2.5 bg-[#2DD4BF] text-slate-900 rounded-xl font-bold">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[#2DD4BF] mt-3">2.8x</p>
          <span className="inline-block mt-2 text-xs font-bold text-emerald-300">
            High Efficiency
          </span>
        </div>

      </div>

      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] shadow-sm p-6 relative overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-[#3B82F6]/20 to-[#2DD4BF]/20 rounded-xl border border-[#2DD4BF]/30">
              <Sparkles size={20} className="text-[#2DD4BF]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Gemini AI Optimization Engine</h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium">Automated campaign audits & budget reallocation recommendations</p>
            </div>
          </div>
          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
            userPlan === 'pro' 
              ? 'bg-[#2DD4BF]/15 text-[#2DD4BF] border-[#2DD4BF]/30' 
              : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
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
            
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/70 backdrop-blur-sm rounded-xl p-6 text-center text-white">
              <div className="p-3 bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] text-white rounded-full mb-3 shadow-lg">
                <Lock size={22} />
              </div>
              <h3 className="text-lg font-black">Unlock Gemini AI Recommendations</h3>
              <p className="text-xs text-slate-200 max-w-md mt-1 mb-4">
                Upgrade to the AdPilot Pro Plan ($29/mo) to receive real-time AI budget suggestions and creative optimization insights.
              </p>
              <Link
                href="/pricing"
                className="px-6 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-[#3B82F6]/20 active:scale-[0.98]"
              >
                Upgrade Now ($29/month)
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="font-bold text-sm text-emerald-500">💡 Scale High ROAS Campaign</p>
              <p className="text-xs text-[var(--text-primary)] mt-0.5">
                "Summer Retargeting - Conversions" is performing at 3.4x ROAS. Increasing budget by 15% is projected to yield +$420 in revenue this week.
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="font-bold text-sm text-amber-500">⚠️ Ad Fatigue Warning</p>
              <p className="text-xs text-[var(--text-primary)] mt-0.5">
                "Brand Awareness" CTR has declined to 1.2%. Gemini recommends refreshing image creative to restore engagement.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Active Campaigns</h2>
            <p className="text-xs text-[var(--text-secondary)] font-medium">Synced from connected Meta Ads Manager</p>
          </div>
          <span className="text-xs font-bold text-[var(--text-secondary)]">
            {userPlan === 'free' ? 'Showing top 3 campaigns (Free)' : 'All Campaigns'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-accent)] text-[11px] font-black uppercase text-[var(--text-secondary)] tracking-wider border-b border-[var(--border-color)]">
                <th className="py-3.5 px-6">Campaign Name</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Spend</th>
                <th className="py-3.5 px-6">Clicks</th>
                <th className="py-3.5 px-6">CTR</th>
                <th className="py-3.5 px-6">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
              {campaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-accent)] transition-colors">
                  <td className="py-4 px-6 font-bold text-[var(--text-primary)]">{c.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      c.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-[var(--bg-accent)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">{c.spend}</td>
                  <td className="py-4 px-6">{c.clicks}</td>
                  <td className="py-4 px-6">{c.ctr}</td>
                  <td className="py-4 px-6 font-bold text-emerald-500">{c.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}