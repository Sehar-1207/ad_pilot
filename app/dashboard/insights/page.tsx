'use client';

import { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  AlertTriangle,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

import apiClient from '@/api/client';
import { CampaignHeader } from '@/components/dashboard/insights/campaigns';
import { InsightsSummary } from '@/components/dashboard/insights/InsightSummary';
import { InsightsAnalysisGrid } from '@/components/dashboard/insights/InsightAnalysis';
import { RecommendedActionsList } from '@/components/dashboard/insights/RecommandedActions';

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

function ProLockedScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 md:p-10 text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto min-h-[600px] flex items-center justify-center">
        <div className="w-full max-w-2xl text-center border border-[var(--border-color)] rounded-2xl p-8 md:p-12 bg-[var(--card-bg)]">

          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[var(--primary)]" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />

            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              Pro Feature
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">
            AI Campaign Insights are locked
          </h1>

          <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-6">
            Get AI-powered campaign analysis, performance explanations,
            health scores, and recommended actions with the Pro plan.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

            <button
              type="button"
              onClick={() => router.push('/pricing')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors"
            >
              Upgrade to Pro
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => router.push('/dashboard/campaigns')}
              className="px-6 py-3 rounded-lg border border-[var(--border-color)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-accent)] transition-colors"
            >
              Back to Campaigns
            </button>

          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">

              <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                <Lock className="w-4 h-4 text-[var(--primary)] mb-2" />

                <p className="text-sm font-semibold">
                  AI Analysis
                </p>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Understand campaign performance automatically.
                </p>
              </div>

              <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                <Sparkles className="w-4 h-4 text-[var(--primary)] mb-2" />

                <p className="text-sm font-semibold">
                  Smart Recommendations
                </p>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Get actionable suggestions based on your data.
                </p>
              </div>

              <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                <ArrowUpRight className="w-4 h-4 text-[var(--primary)] mb-2" />

                <p className="text-sm font-semibold">
                  Campaign Health
                </p>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  See what is working and what needs attention.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function InsightsContent() {
  const searchParams = useSearchParams();

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
        setCampaign(null);
        setInsights(null);
        setLoading(false);
        return;
      }

      const campaignResponse =
        await apiClient.get<CampaignResponse>(
          `/dashboard/campaigns/${campaignId}`
        );

      setCampaign(campaignResponse.data.data);

      setLoadingInsights(true);

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
        setCampaign(null);
        setInsights(null);
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
        setCampaign(null);
        setInsights(null);
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
    return <ProLockedScreen />;
  }

  if (!campaign) {
    return (
      <div className="min-h-screen p-6 text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-rose-500/30 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />

              <div>
                <h3 className="text-sm font-bold">
                  Campaign not found
                </h3>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {error || 'Unable to find the selected campaign.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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