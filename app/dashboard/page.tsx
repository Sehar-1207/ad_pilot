'use client';

import { useState } from 'react';
import { HeaderBanner } from '@/components/dashboard/HeaderBanner';
import { ConnectionAlert } from '@/components/dashboard/ConnectionAlert';
import { MetricsGrid } from '@/components/dashboard/MetricGrid';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticalCharts';
import { GeminiAiCard } from '@/components/dashboard/GeminieCard';
import { CampaignsTable } from '@/components/dashboard/CampaignTable';

export default function DashboardPage() {
  const [userPlan] = useState<'free' | 'pro'>('free');
  const [isMetaConnected] = useState(false);

  const campaigns = [
    { name: 'Summer Retargeting - Conversions', spend: '$1,240.00', clicks: '3,420', ctr: '2.8%', roas: '3.4x', status: 'Active' },
    { name: 'Lookalike Audience - Creative B', spend: '$850.50', clicks: '1,910', ctr: '1.9%', roas: '2.1x', status: 'Active' },
    { name: 'Brand Awareness - Top of Funnel', spend: '$410.00', clicks: '980', ctr: '1.2%', roas: '1.4x', status: 'Paused' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[var(--text-primary)]">
      <HeaderBanner userPlan={userPlan} />
      <ConnectionAlert isConnected={isMetaConnected} />
      <MetricsGrid />
      <AnalyticsCharts />
      <GeminiAiCard userPlan={userPlan} />
      <CampaignsTable campaigns={campaigns} userPlan={userPlan} />
    </div>
  );
}