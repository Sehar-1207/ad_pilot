'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  AlertCircle,
  Brain,
  CheckCircle2,
  Loader2,
  Lock,
  RefreshCw,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import apiClient from '@/api/client';

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
  } | null;
  message?: string;
}

interface CampaignResponse {
  success: boolean;
  data: Campaign | null;
  message?: string;
  code?: string;
}

interface InsightsResponse {
  success: boolean;
  data: Insights | null;
  message?: string;
  code?: string;
}

function NoCampaignScreen() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            backgroundColor: 'var(--bg-accent)',
          }}
        >
          <AlertCircle
            className="h-7 w-7"
            style={{ color: 'var(--text-secondary)' }}
          />
        </div>

        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          No Campaign Found
        </h1>

        <p
          className="mt-3 leading-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          The campaign you are trying to view does not exist or is no longer
          available.
        </p>

        <button
          onClick={() => router.push('/dashboard/campaigns')}
          className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition"
          style={{
            backgroundColor: 'var(--primary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
          }}
        >
          Back to Campaigns
        </button>
      </div>
    </div>
  );
}

function ProLockedScreen() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            backgroundColor: 'var(--bg-accent)',
          }}
        >
          <Lock
            className="h-7 w-7"
            style={{ color: 'var(--primary)' }}
          />
        </div>

        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          AI Insights are a Pro feature
        </h1>

        <p
          className="mt-3 leading-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          Upgrade to Pro to unlock AI-powered campaign analysis,
          recommendations, performance insights, and optimization suggestions.
        </p>

        <button
          onClick={() => router.push('/pricing')}
          className="mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition"
          style={{
            backgroundColor: 'var(--primary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary)';
          }}
        >
          Upgrade to Pro
        </button>

        <button
          onClick={() => router.push('/dashboard/campaigns')}
          className="mt-3 w-full rounded-xl border px-5 py-3 text-sm font-semibold transition"
          style={{
            backgroundColor: 'transparent',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          Back to Campaigns
        </button>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: 'var(--primary)' }}
        />

        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Loading campaign...
        </p>
      </div>
    </div>
  );
}

function ErrorScreen({
  message,
  onBack,
  onRetry,
}: {
  message: string;
  onBack: () => void;
  onRetry: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            backgroundColor: 'var(--bg-accent)',
          }}
        >
          <AlertCircle className="h-7 w-7 text-red-500" />
        </div>

        <h1
          className="text-xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Unable to load campaign
        </h1>

        <p
          className="mt-3 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          {message}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'transparent',
            }}
          >
            Back
          </button>

          <button
            onClick={onRetry}
            className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
            style={{
              backgroundColor: 'var(--primary)',
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

function CampaignHeader({
  campaign,
  onBack,
}: {
  campaign: Campaign;
  onBack: () => void;
}) {
  const health = campaign.health?.toLowerCase() || 'unknown';

  const healthClass =
    health === 'good' || health === 'healthy'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
      : health === 'warning' || health === 'average'
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
        : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400';

  return (
    <div
      className="border-b"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm transition"
          style={{
            color: 'var(--text-secondary)',
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {campaign.name}
              </h1>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${healthClass}`}
              >
                {campaign.health || 'Unknown'}
              </span>
            </div>

            <div
              className="mt-2 flex items-center gap-3 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="capitalize">{campaign.status}</span>

              <span>•</span>

              <span>Campaign AI Insights</span>
            </div>
          </div>

          <div
            className="flex items-center gap-2 rounded-xl border px-4 py-2"
            style={{
              backgroundColor: 'var(--bg-accent)',
              borderColor: 'var(--border-color)',
            }}
          >
            <Sparkles
              className="h-4 w-4"
              style={{ color: 'var(--primary)' }}
            />

            <span
              className="text-sm font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              AI Analysis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div
      className="rounded-xl border p-5 transition"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      <p
        className="text-sm"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
      </p>

      <p
        className="mt-2 text-2xl font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        {value}
      </p>

      {description && (
        <p
          className="mt-1 text-xs"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function CampaignMetrics({
  campaign,
}: {
  campaign: Campaign;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard
        label="Spend"
        value={`$${Number(campaign.spend || 0).toFixed(2)}`}
      />

      <MetricCard
        label="Clicks"
        value={Number(campaign.clicks || 0).toLocaleString()}
      />

      <MetricCard
        label="CTR"
        value={`${Number(campaign.ctr || 0).toFixed(2)}%`}
      />

      <MetricCard
        label="CPC"
        value={`$${Number(campaign.cpc || 0).toFixed(2)}`}
      />

      <MetricCard
        label="ROAS"
        value={`${Number(campaign.roas || 0).toFixed(2)}x`}
      />

      <MetricCard
        label="Conversions"
        value={Number(campaign.conversions || 0).toLocaleString()}
      />

      <MetricCard
        label="Impressions"
        value={Number(campaign.impressions || 0).toLocaleString()}
      />

      <MetricCard
        label="Frequency"
        value={Number(campaign.frequency || 0).toFixed(2)}
      />
    </div>
  );
}

function InsightsSummary({
  insights,
}: {
  insights: Insights;
}) {
  const score = Number(insights.healthScore || 0);

  const scoreClass =
    score >= 80
      ? 'text-emerald-500'
      : score >= 60
        ? 'text-amber-500'
        : 'text-red-500';

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="shrink-0">
          <div
            className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-8"
            style={{
              borderColor: 'var(--bg-accent)',
            }}
          >
            <span className={`text-3xl font-bold ${scoreClass}`}>
              {score}
            </span>

            <span
              className="text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              Health Score
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Brain
              className="h-5 w-5"
              style={{ color: 'var(--primary)' }}
            />

            <h2
              className="text-lg font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              AI Campaign Summary
            </h2>
          </div>

          <p
            className="mt-3 leading-7"
            style={{ color: 'var(--text-secondary)' }}
          >
            {insights.summary || 'No summary available.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function InsightsAnalysisGrid({
  insights,
}: {
  insights: Insights;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div
        className="rounded-2xl border p-6"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor: 'var(--bg-accent)',
            }}
          >
            <TrendingUp className="h-5 w-5 text-emerald-500" />
          </div>

          <h2
            className="text-lg font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            What is working
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {insights.whatIsWorking?.length ? (
            insights.whatIsWorking.map((item, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                <p
                  className="text-sm leading-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item}
                </p>
              </div>
            ))
          ) : (
            <p
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              No positive insights available.
            </p>
          )}
        </div>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              backgroundColor: 'var(--bg-accent)',
            }}
          >
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>

          <h2
            className="text-lg font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            What needs fixing
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {insights.whatNeedsFixing?.length ? (
            insights.whatNeedsFixing.map((item, index) => (
              <div key={index} className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <p
                  className="text-sm leading-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item}
                </p>
              </div>
            ))
          ) : (
            <p
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              No issues identified.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function RecommendedActionsList({
  insights,
}: {
  insights: Insights;
}) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles
          className="h-5 w-5"
          style={{ color: 'var(--primary)' }}
        />

        <h2
          className="text-lg font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Recommended Actions
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {insights.recommendedActions?.length ? (
          insights.recommendedActions.map((action) => (
            <div
              key={action.id}
              className="rounded-xl border p-5"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className="font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {action.title}
                    </h3>

                    {action.applied && (
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                        Applied
                      </span>
                    )}
                  </div>

                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {action.description}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--bg-accent)',
                      color: 'var(--primary)',
                    }}
                  >
                    Impact: {action.impact}
                  </span>

                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--bg-accent)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Effort: {action.effort}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <p
              className="text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              No recommendations available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InsightsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const campaignId = searchParams.get('id');

  const [plan, setPlan] = useState<'FREE' | 'PRO' | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [insights, setInsights] = useState<Insights | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  const [reanalyzing, setReanalyzing] = useState(false);

  const loadInsights = useCallback(async (id: string) => {
    setLoadingInsights(true);
    setInsightsError(null);

    try {
      const response = await apiClient.get<InsightsResponse>(
        `/dashboard/campaigns/${id}/ai-insights`
      );

      const data = response.data;

      if (!data.success || !data.data) {
        throw new Error(
          data.message || 'Unable to generate campaign insights.'
        );
      }

      setInsights(data.data);
    } catch (err: any) {
      const status = err?.response?.status;
      const errorCode = err?.response?.data?.code;

      if (status === 403 || errorCode === 'PRO_REQUIRED') {
        setPlan('FREE');
        setCampaign(null);
        setInsights(null);
        return;
      }

      setInsightsError(
        err?.response?.data?.message ||
          err?.message ||
          'Unable to load AI insights.'
      );
    } finally {
      setLoadingInsights(false);
    }
  }, []);

  const loadCampaign = useCallback(async () => {
    if (!campaignId) {
      setLoading(false);
      setPlan('PRO');
      setCampaign(null);
      setInsights(null);
      return;
    }

    setLoading(true);
    setError(null);
    setInsights(null);
    setInsightsError(null);

    try {
      const userResponse = await apiClient.get<UserResponse>('/auth/me');

      const userData = userResponse.data;

      if (!userData.success || !userData.data) {
        throw new Error(
          userData.message || 'Unable to load user information.'
        );
      }

      const userPlan = userData.data.plan;

      setPlan(userPlan);

      if (userPlan !== 'PRO') {
        setCampaign(null);
        setInsights(null);
        return;
      }

      const campaignResponse =
        await apiClient.get<CampaignResponse>(
          `/dashboard/campaigns/${campaignId}`
        );

      const response = campaignResponse.data;

      if (!response.success || !response.data) {
        setCampaign(null);
        setInsights(null);
        return;
      }

      setCampaign(response.data);

      await loadInsights(campaignId);
    } catch (err: any) {
      const status = err?.response?.status;
      const errorCode = err?.response?.data?.code;

      if (status === 403 || errorCode === 'PRO_REQUIRED') {
        setPlan('FREE');
        setCampaign(null);
        setInsights(null);
        return;
      }

      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Unable to load campaign.'
      );
    } finally {
      setLoading(false);
    }
  }, [campaignId, loadInsights]);

  useEffect(() => {
    loadCampaign();
  }, [loadCampaign]);

  const handleReAnalyze = async () => {
    if (!campaignId) {
      return;
    }

    setReanalyzing(true);
    setInsightsError(null);

    try {
      const response =
        await apiClient.get<InsightsResponse>(
          `/dashboard/campaigns/${campaignId}/ai-insights`
        );

      const data = response.data;

      if (!data.success || !data.data) {
        throw new Error(
          data.message || 'Unable to re-analyze campaign.'
        );
      }

      setInsights(data.data);
      setInsightsError(null);
    } catch (err: any) {
      const status = err?.response?.status;
      const errorCode = err?.response?.data?.code;

      if (status === 403 || errorCode === 'PRO_REQUIRED') {
        setPlan('FREE');
        setCampaign(null);
        setInsights(null);
        return;
      }

      setInsightsError(
        err?.response?.data?.message ||
          err?.message ||
          'Unable to re-analyze campaign.'
      );
    } finally {
      setReanalyzing(false);
    }
  };

  if (!campaignId) {
    return <NoCampaignScreen />;
  }

  if (loading || plan === null) {
    return <LoadingScreen />;
  }

  if (plan === 'FREE') {
    return <ProLockedScreen />;
  }

  if (error) {
    return (
      <ErrorScreen
        message={error}
        onBack={() => router.push('/dashboard/campaigns')}
        onRetry={loadCampaign}
      />
    );
  }

  if (!campaign) {
    return <NoCampaignScreen />;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <CampaignHeader
        campaign={campaign}
        onBack={() => router.push('/dashboard/campaigns')}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <CampaignMetrics campaign={campaign} />

        <div className="mt-8">
          {loadingInsights ? (
            <div
              className="rounded-2xl border p-10"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-accent)',
                  }}
                >
                  <Brain
                    className="h-7 w-7 animate-pulse"
                    style={{ color: 'var(--primary)' }}
                  />
                </div>

                <h2
                  className="mt-5 text-lg font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  AI is analyzing your campaign
                </h2>

                <p
                  className="mt-2 max-w-md text-center text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  We're analyzing your campaign performance and generating
                  personalized recommendations.
                </p>

                <Loader2
                  className="mt-5 h-5 w-5 animate-spin"
                  style={{ color: 'var(--primary)' }}
                />
              </div>
            </div>
          ) : insightsError ? (
            <div
              className="rounded-2xl border p-8 text-center"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
              }}
            >
              <AlertCircle className="mx-auto h-8 w-8 text-red-500" />

              <h2
                className="mt-4 text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                AI insights unavailable
              </h2>

              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {insightsError}
              </p>

              <button
                onClick={handleReAnalyze}
                disabled={reanalyzing}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--primary)',
                }}
              >
                {reanalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}

                {reanalyzing ? 'Analyzing...' : 'Analyze Campaign'}
              </button>
            </div>
          ) : insights ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Campaign AI Insights
                  </h2>

                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    AI-powered analysis and recommendations
                  </p>
                </div>

                <button
                  onClick={handleReAnalyze}
                  disabled={reanalyzing}
                  className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {reanalyzing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}

                  {reanalyzing ? 'Re-analyzing...' : 'Re-analyze'}
                </button>
              </div>

              <InsightsSummary insights={insights} />

              <InsightsAnalysisGrid insights={insights} />

              <RecommendedActionsList insights={insights} />
            </div>
          ) : (
            <div
              className="rounded-2xl border p-8 text-center"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
              }}
            >
              <Brain
                className="mx-auto h-8 w-8"
                style={{ color: 'var(--text-secondary)' }}
              />

              <h2
                className="mt-4 text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                No AI insights available
              </h2>

              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Run an AI analysis to generate insights for this campaign.
              </p>

              <button
                onClick={handleReAnalyze}
                disabled={reanalyzing}
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--primary)',
                }}
              >
                {reanalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}

                {reanalyzing
                  ? 'Analyzing...'
                  : 'Generate AI Insights'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function CampaignInsightsPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <InsightsContent />
    </Suspense>
  );
}