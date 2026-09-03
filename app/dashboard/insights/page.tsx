'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, AlertTriangle } from 'lucide-react';

import apiClient from '@/api/client';
import { CampaignHeader } from '@/components/dashboard/insights/campaigns';
import { InsightsSummary } from '@/components/dashboard/insights/InsightSummary';
import { InsightsAnalysisGrid } from '@/components/dashboard/insights/InsightAnalysis';
import { RecommendedActionsList } from '@/components/dashboard/insights/RecommandedActions';
import { ProUpgradeCard } from '@/components/dashboard/insights/ProUpgradeCard';
import { CampaignNotFound } from '@/components/dashboard/insights/NotFound';

interface Campaign {
  id: string;
  name: string;
  status: string;
  health: string;
  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversions: number;
  impressions?: number;
  frequency?: number;
}

interface RecommendedAction {
  id: string;
  title: string;
  impact: string;
  effort: string;
  description: string;
  applied?: boolean;
}

interface Insights {
  summary: string;
  healthScore: number;
  whatIsWorking: string[];
  whatNeedsFixing: string[];
  recommendedActions: RecommendedAction[];
}

interface UserResponse {
  success: boolean;
  data: {
    plan: 'FREE' | 'PRO';
  };
}

interface CampaignResponse {
  success: boolean;
  data: Campaign;
}

interface InsightsResponse {
  success: boolean;
  data: Insights;
  code?: string;
  message?: string;
}

function InsightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const campaignId = searchParams.get('id');

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [plan, setPlan] = useState<'FREE' | 'PRO' | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [error, setError] = useState('');

  const loadPage = useCallback(async () => {
    if (!campaignId) {
      setError('No campaign was selected.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const userResponse =
        await apiClient.get<UserResponse>('/auth/me');

      const userPlan = userResponse.data.data.plan;

      setPlan(userPlan);

      if (userPlan !== 'PRO') {
        setLoading(false);
        return;
      }

      const campaignResponse =
        await apiClient.get<CampaignResponse>(
          `/dashboard/campaigns/${campaignId}`
        );

      setCampaign(campaignResponse.data.data);

      const insightsResponse =
        await apiClient.get<InsightsResponse>(
          `/dashboard/campaigns/${campaignId}/ai-insights`
        );

      setInsights(insightsResponse.data.data);
    } catch (err: any) {
      const status = err?.response?.status;
      const code = err?.response?.data?.code;

      if (status === 403 || code === 'PRO_REQUIRED') {
        setPlan('FREE');
        return;
      }

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          'Unable to load campaign insights.'
      );
    } finally {
      setLoading(false);
      setLoadingInsights(false);
    }
  }, [campaignId]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const handleReAnalyze = async () => {
    if (!campaignId || plan !== 'PRO') {
      router.push('/pricing');
      return;
    }

    try {
      setLoadingInsights(true);
      setError('');

      const response =
        await apiClient.get<InsightsResponse>(
          `/dashboard/campaigns/${campaignId}/ai-insights`
        );

      setInsights(response.data.data);
    } catch (err: any) {
      const status = err?.response?.status;
      const code = err?.response?.data?.code;

      if (status === 403 || code === 'PRO_REQUIRED') {
        setPlan('FREE');
        router.push('/pricing');
        return;
      }

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          'Unable to re-analyze campaign.'
      );
    } finally {
      setLoadingInsights(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-8 w-8 text-[var(--primary)] animate-bounce mx-auto mb-3" />

          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Loading campaign insights...
          </p>
        </div>
      </div>
    );
  }

  if (plan === 'FREE') {
    return <ProUpgradeCard />;
  }

  if (!campaign) {
    return <CampaignNotFound error={error} />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6 text-[var(--text-primary)] min-h-screen">
      <CampaignHeader
        campaign={campaign}
        loadingInsights={loadingInsights}
        onReAnalyze={handleReAnalyze}
      />

      {error && (
        <div className="rounded-xl border border-rose-500/30 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />

            <div>
              <h3 className="text-sm font-bold">
                Unable to load insights
              </h3>

              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {loadingInsights && (
        <div className="rounded-xl border border-[var(--border-color)] p-12 text-center">
          <Sparkles className="h-8 w-8 text-[var(--primary)] animate-bounce mx-auto mb-3" />

          <h3 className="text-base font-bold">
            Analyzing campaign performance...
          </h3>

          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Gemini is analyzing your campaign metrics.
          </p>
        </div>
      )}

      {!loadingInsights && insights && (
        <div className="space-y-6">
          <InsightsSummary
            summary={insights.summary}
            healthScore={insights.healthScore}
          />

          <InsightsAnalysisGrid
            whatIsWorking={insights.whatIsWorking}
            whatNeedsFixing={insights.whatNeedsFixing}
          />

          <RecommendedActionsList
            actions={insights.recommendedActions}
          />
        </div>
      )}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-[var(--text-secondary)]">
          Loading campaign details...
        </div>
      }
    >
      <InsightsContent />
    </Suspense>
  );
}