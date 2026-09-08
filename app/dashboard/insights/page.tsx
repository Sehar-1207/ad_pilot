'use client';

import { useCallback, useEffect, useState } from 'react';
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

function ProLockedScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
          <Lock className="w-7 h-7 text-violet-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          AI Insights are a Pro feature
        </h1>

        <p className="mt-3 text-slate-600 leading-6">
          Upgrade to Pro to unlock AI-powered campaign analysis,
          recommendations, performance insights, and optimization suggestions.
        </p>

        <button
          onClick={() => router.push('/pricing')}
          className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition"
        >
          Upgrade to Pro
        </button>

        <button
          onClick={() => router.push('/dashboard/campaigns')}
          className="mt-3 w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Back to Campaigns
        </button>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />

        <p className="text-sm text-slate-500">
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-red-600" />
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          Unable to load campaign
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          {message}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Back
          </button>

          <button
            onClick={onRetry}
            className="flex-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition"
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
  const health =
    campaign.health?.toLowerCase() || 'unknown';

  const healthClass =
    health === 'good' || health === 'healthy'
      ? 'bg-emerald-100 text-emerald-700'
      : health === 'warning' || health === 'average'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-red-100 text-red-700';

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>

        <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">
                {campaign.name}
              </h1>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${healthClass}`}
              >
                {campaign.health || 'Unknown'}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
              <span className="capitalize">
                {campaign.status}
              </span>

              <span>•</span>

              <span>
                Campaign AI Insights
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 border border-violet-100">
            <Sparkles className="w-4 h-4 text-violet-600" />

            <span className="text-sm font-semibold text-violet-700">
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
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-slate-400">
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Spend"
        value={`$${Number(campaign.spend || 0).toFixed(2)}`}
      />

      <MetricCard
        label="Clicks"
        value={Number(
          campaign.clicks || 0
        ).toLocaleString()}
      />

      <MetricCard
        label="CTR"
        value={`${Number(
          campaign.ctr || 0
        ).toFixed(2)}%`}
      />

      <MetricCard
        label="CPC"
        value={`$${Number(
          campaign.cpc || 0
        ).toFixed(2)}`}
      />

      <MetricCard
        label="ROAS"
        value={`${Number(
          campaign.roas || 0
        ).toFixed(2)}x`}
      />

      <MetricCard
        label="Conversions"
        value={Number(
          campaign.conversions || 0
        ).toLocaleString()}
      />

      <MetricCard
        label="Impressions"
        value={Number(
          campaign.impressions || 0
        ).toLocaleString()}
      />

      <MetricCard
        label="Frequency"
        value={Number(
          campaign.frequency || 0
        ).toFixed(2)}
      />
    </div>
  );
}

function InsightsSummary({
  insights,
}: {
  insights: Insights;
}) {
  const score = Number(
    insights.healthScore || 0
  );

  const scoreClass =
    score >= 80
      ? 'text-emerald-600'
      : score >= 60
        ? 'text-amber-600'
        : 'text-red-600';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="shrink-0">
          <div className="w-28 h-28 rounded-full border-8 border-slate-100 flex flex-col items-center justify-center">
            <span
              className={`text-3xl font-bold ${scoreClass}`}
            >
              {score}
            </span>

            <span className="text-xs text-slate-400">
              Health Score
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-violet-600" />

            <h2 className="text-lg font-bold text-slate-900">
              AI Campaign Summary
            </h2>
          </div>

          <p className="mt-3 text-slate-600 leading-7">
            {insights.summary ||
              'No summary available.'}
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
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            What is working
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {insights.whatIsWorking?.length ? (
            insights.whatIsWorking.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />

                  <p className="text-sm text-slate-600 leading-6">
                    {item}
                  </p>
                </div>
              )
            )
          ) : (
            <p className="text-sm text-slate-500">
              No positive insights available.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            What needs fixing
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {insights.whatNeedsFixing?.length ? (
            insights.whatNeedsFixing.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />

                  <p className="text-sm text-slate-600 leading-6">
                    {item}
                  </p>
                </div>
              )
            )
          ) : (
            <p className="text-sm text-slate-500">
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
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-violet-600" />

        <h2 className="text-lg font-bold text-slate-900">
          Recommended Actions
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {insights.recommendedActions?.length ? (
          insights.recommendedActions.map(
            (action) => (
              <div
                key={action.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900">
                        {action.title}
                      </h3>

                      {action.applied && (
                        <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                          Applied
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-slate-600 leading-6">
                      {action.description}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold">
                      Impact: {action.impact}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      Effort: {action.effort}
                    </span>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-slate-500">
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

  const [plan, setPlan] =
    useState<'FREE' | 'PRO' | null>(null);

  const [campaign, setCampaign] =
    useState<Campaign | null>(null);

  const [insights, setInsights] =
    useState<Insights | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [loadingInsights, setLoadingInsights] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [insightsError, setInsightsError] =
    useState<string | null>(null);

  const [reanalyzing, setReanalyzing] =
    useState(false);

  const loadInsights = useCallback(
    async (id: string) => {
      setLoadingInsights(true);
      setInsightsError(null);

      try {
        const response =
          await apiClient.get<InsightsResponse>(
            `/dashboard/campaigns/${id}/ai-insights`
          );

        const data = response.data;

        if (
          !data.success ||
          !data.data
        ) {
          throw new Error(
            data.message ||
              'Unable to generate campaign insights.'
          );
        }

        setInsights(data.data);
      } catch (err: any) {
        const status =
          err?.response?.status;

        const errorCode =
          err?.response?.data?.code;

        if (
          status === 403 ||
          errorCode === 'PRO_REQUIRED'
        ) {
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
    },
    []
  );

  const loadCampaign = useCallback(
    async () => {
      setLoading(true);
      setError(null);
      setInsights(null);
      setInsightsError(null);

      try {
        const userResponse =
          await apiClient.get<UserResponse>(
            '/auth/me'
          );

        const userData =
          userResponse.data;

        if (
          !userData.success ||
          !userData.data
        ) {
          throw new Error(
            userData.message ||
              'Unable to load user information.'
          );
        }

        const userPlan =
          userData.data.plan;

        setPlan(userPlan);

        if (userPlan !== 'PRO') {
          setCampaign(null);
          setInsights(null);
          setLoading(false);
          return;
        }

        if (!campaignId) {
          throw new Error(
            'Campaign ID is missing.'
          );
        }

        const campaignResponse =
          await apiClient.get<CampaignResponse>(
            `/dashboard/campaigns/${campaignId}`
          );

        const response =
          campaignResponse.data;

        if (
          !response.success ||
          !response.data
        ) {
          throw new Error(
            response.message ||
              'Campaign not found.'
          );
        }

        setCampaign(response.data);

        setLoading(false);

        loadInsights(campaignId);
      } catch (err: any) {
        const status =
          err?.response?.status;

        const errorCode =
          err?.response?.data?.code;

        if (
          status === 403 ||
          errorCode === 'PRO_REQUIRED'
        ) {
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

        setLoading(false);
      }
    },
    [campaignId, loadInsights]
  );

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

      const data =
        response.data;

      if (
        !data.success ||
        !data.data
      ) {
        throw new Error(
          data.message ||
            'Unable to re-analyze campaign.'
        );
      }

      setInsights(data.data);
      setInsightsError(null);
    } catch (err: any) {
      const status =
        err?.response?.status;

      const errorCode =
        err?.response?.data?.code;

      if (
        status === 403 ||
        errorCode === 'PRO_REQUIRED'
      ) {
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
        onBack={() =>
          router.push(
            '/dashboard/campaigns'
          )
        }
        onRetry={loadCampaign}
      />
    );
  }

  if (!campaign) {
    return (
      <ErrorScreen
        message="Campaign data could not be found."
        onBack={() =>
          router.push(
            '/dashboard/campaigns'
          )
        }
        onRetry={loadCampaign}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CampaignHeader
        campaign={campaign}
        onBack={() =>
          router.push(
            '/dashboard/campaigns'
          )
        }
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <CampaignMetrics
          campaign={campaign}
        />

        <div className="mt-8">
          {loadingInsights ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10">
              <div className="flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-violet-600 animate-pulse" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  AI is analyzing your campaign
                </h2>

                <p className="mt-2 text-sm text-slate-500 text-center max-w-md">
                  We're analyzing your campaign performance
                  and generating personalized recommendations.
                </p>

                <Loader2 className="mt-5 w-5 h-5 animate-spin text-violet-600" />
              </div>
            </div>
          ) : insightsError ? (
            <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
              <AlertCircle className="mx-auto w-8 h-8 text-red-500" />

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                AI insights unavailable
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {insightsError}
              </p>

              <button
                onClick={handleReAnalyze}
                disabled={reanalyzing}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition"
              >
                {reanalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}

                {reanalyzing
                  ? 'Analyzing...'
                  : 'Analyze Campaign'}
              </button>
            </div>
          ) : insights ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Campaign AI Insights
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    AI-powered analysis and recommendations
                  </p>
                </div>

                <button
                  onClick={handleReAnalyze}
                  disabled={reanalyzing}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
                >
                  {reanalyzing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}

                  {reanalyzing
                    ? 'Re-analyzing...'
                    : 'Re-analyze'}
                </button>
              </div>

              <InsightsSummary
                insights={insights}
              />

              <InsightsAnalysisGrid
                insights={insights}
              />

              <RecommendedActionsList
                insights={insights}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Brain className="mx-auto w-8 h-8 text-slate-400" />

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No AI insights available
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Run an AI analysis to generate insights
                for this campaign.
              </p>

              <button
                onClick={handleReAnalyze}
                disabled={reanalyzing}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-50 transition"
              >
                {reanalyzing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
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
  return <InsightsContent />;
}