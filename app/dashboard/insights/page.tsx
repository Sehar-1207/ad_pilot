'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';

interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  healthStatus: 'Profitable' | 'Learning' | 'Fatigued';
  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversions: number;
  impressions?: number;
  frequency?: number;
}

const MOCK_CAMPAIGNS: CampaignData[] = [
  {
    id: 'cmp_1',
    name: 'Summer Retargeting - Conversions',
    status: 'active',
    healthStatus: 'Profitable',
    spend: 1240.0,
    clicks: 3420,
    ctr: 2.8,
    cpc: 0.36,
    roas: 3.4,
    conversions: 142,
    impressions: 122140,
    frequency: 2.1,
  },
  {
    id: 'cmp_2',
    name: 'Lookalike Audience - Creative B',
    status: 'active',
    healthStatus: 'Profitable',
    spend: 850.5,
    clicks: 1910,
    ctr: 1.9,
    cpc: 0.44,
    roas: 2.1,
    conversions: 68,
    impressions: 100520,
    frequency: 1.8,
  },
  {
    id: 'cmp_3',
    name: 'Brand Awareness - Top of Funnel',
    status: 'paused',
    healthStatus: 'Fatigued',
    spend: 410.0,
    clicks: 980,
    ctr: 1.2,
    cpc: 0.41,
    roas: 1.4,
    conversions: 19,
    impressions: 81660,
    frequency: 4.2,
  },
  {
    id: 'cmp_4',
    name: 'Holiday Promo - Video Reels',
    status: 'active',
    healthStatus: 'Learning',
    spend: 620.0,
    clicks: 1450,
    ctr: 2.1,
    cpc: 0.42,
    roas: 2.9,
    conversions: 54,
    impressions: 69040,
    frequency: 1.4,
  },
  {
    id: 'cmp_5',
    name: 'VIP Customer Retention',
    status: 'active',
    healthStatus: 'Profitable',
    spend: 1150.0,
    clicks: 2800,
    ctr: 3.1,
    cpc: 0.41,
    roas: 4.2,
    conversions: 110,
    impressions: 90320,
    frequency: 2.3,
  },
];

interface RecommendedAction {
  id: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Easy' | 'Moderate';
  description: string;
  applied: boolean;
}

interface InsightResponse {
  summary: string;
  healthScore: number;
  whatIsWorking: string[];
  whatNeedsFixing: string[];
  recommendedActions: RecommendedAction[];
}

function generateInsightsData(campaign: CampaignData): InsightResponse {
  const isHighReturn = campaign.roas >= 3.0;
  const isFatigued = campaign.healthStatus === 'Fatigued' || (campaign.frequency && campaign.frequency > 3.5);

  let summary = '';
  let healthScore = 75;
  let whatIsWorking: string[] = [];
  let whatNeedsFixing: string[] = [];
  let recommendedActions: RecommendedAction[] = [];

  if (isHighReturn) {
    summary = `This campaign is highly profitable, generating $${(campaign.spend * campaign.roas).toFixed(2)} in sales for every dollar spent. Customers are clicking through at a strong rate and converting smoothly.`;
    healthScore = 92;
    whatIsWorking = [
      `Exceptional Return on Ad Spend (${campaign.roas}x ROAS).`,
      `Strong engagement with a ${campaign.ctr}% Click-Through Rate.`,
      `Low average cost per click ($${campaign.cpc}).`,
    ];
    whatNeedsFixing = [
      `Budget limits are preventing the campaign from reaching more potential buyers.`,
      `Minor risk of creative fatigue if ad spend is scaled too quickly.`,
    ];
    recommendedActions = [
      {
        id: 'act_1',
        title: 'Scale Daily Budget by 20%',
        impact: 'High',
        effort: 'Easy',
        description: 'Increase the daily ad budget in Meta Ads Manager to capture more high-intent shoppers while maintaining strong returns.',
        applied: false,
      },
      {
        id: 'act_2',
        title: 'Expand Lookalike Audience to 3%',
        impact: 'Medium',
        effort: 'Moderate',
        description: 'Widen your target group slightly to reach a fresh pool of similar prospective buyers.',
        applied: false,
      },
    ];
  } else if (isFatigued) {
    summary = `This campaign is losing efficiency. People are seeing the exact same ad multiple times (Frequency: ${campaign.frequency || 4.0}x), causing click rates to drop and raising overall costs.`;
    healthScore = 48;
    whatIsWorking = [
      `Generated ${campaign.conversions} total conversions to date.`,
      `High total exposure with ${campaign.impressions?.toLocaleString() || '80,000+'} impressions.`,
    ];
    whatNeedsFixing = [
      `High ad repetition—audience members are ignoring the repeated visual.`,
      `Click-through rate (${campaign.ctr}%) is lower than the industry standard (2.0%+).`,
      `Wasted budget on repeated views from non-buying users.`,
    ];
    recommendedActions = [
      {
        id: 'act_3',
        title: 'Swap Out Ad Images or Video Clips',
        impact: 'High',
        effort: 'Easy',
        description: 'Replace current images or Reels with 2-3 fresh visuals to capture attention and revive engagement.',
        applied: false,
      },
      {
        id: 'act_4',
        title: 'Cap Daily Impression Frequency',
        impact: 'Medium',
        effort: 'Easy',
        description: 'Set a frequency cap of 2 views per week per user in Meta Ads Manager to reduce wasted spend.',
        applied: false,
      },
    ];
  } else {
    summary = `The campaign is stable with a ${campaign.roas}x ROAS, but has clear room for growth. Minor tweaks to ad copy and targeting can help boost sales volume.`;
    healthScore = 72;
    whatIsWorking = [
      `Steady click rate (${campaign.ctr}%) with ${campaign.clicks.toLocaleString()} total clicks.`,
      `Healthy Cost Per Click ($${campaign.cpc}).`,
    ];
    whatNeedsFixing = [
      `Conversion rate could be higher with clearer call-to-action buttons.`,
      `Reaching passive browsers rather than ready-to-buy customers.`,
    ];
    recommendedActions = [
      {
        id: 'act_5',
        title: 'Update Call-to-Action to "Shop Now"',
        impact: 'High',
        effort: 'Easy',
        description: 'Change the ad button text from "Learn More" to "Shop Now" to drive intent-driven site visits.',
        applied: false,
      },
      {
        id: 'act_6',
        title: 'Tighten Retargeting Window to 14 Days',
        impact: 'Medium',
        effort: 'Easy',
        description: 'Focus ad spend on users who visited your store in the last two weeks while purchase intent is highest.',
        applied: false,
      },
    ];
  }

  return { summary, healthScore, whatIsWorking, whatNeedsFixing, recommendedActions };
}

function InsightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignId = searchParams.get('id');

  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [insights, setInsights] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const selected = MOCK_CAMPAIGNS.find((c) => c.id === campaignId) || MOCK_CAMPAIGNS[0];
    setCampaign(selected);

    if (selected) {
      runClientAnalysis(selected);
    }
  }, [campaignId]);

  const runClientAnalysis = (cmp: CampaignData) => {
    setLoading(true);
    const timer = setTimeout(() => {
      setInsights(generateInsightsData(cmp));
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  };

  const handleToggleAction = (actionId: string) => {
    if (!insights) return;
    setInsights({
      ...insights,
      recommendedActions: insights.recommendedActions.map((act) =>
        act.id === actionId ? { ...act, applied: !act.applied } : act
      ),
    });
  };

  if (!campaign) return null;

  return (
    <div className="space-y-6 p-4 md:p-6 text-[var(--text-primary)] min-h-screen transition-colors duration-300">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Campaigns
        </button>

        <button
          onClick={() => runClientAnalysis(campaign)}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] border border-[var(--primary)] px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Re-Analyze Insights
        </button>
      </div>
      <div className="rounded-xl border border-[var(--border-color)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                campaign.status === 'active'
                  ? 'border-[var(--accent-teal)] text-[var(--accent-teal)]'
                  : 'border-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
            >
              {campaign.status}
            </span>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                campaign.healthStatus === 'Profitable'
                  ? 'border-[var(--accent-teal)] text-[var(--accent-teal)]'
                  : campaign.healthStatus === 'Fatigued'
                  ? 'border-rose-500 text-rose-500'
                  : 'border-amber-500 text-amber-500'
              }`}
            >
              {campaign.healthStatus}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-2">{campaign.name}</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Plain-English diagnostic breakdown and actionable optimization suggestions.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">Ad Spend</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">${campaign.spend.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">Return (ROAS)</span>
            <span className="text-sm font-bold text-[var(--accent-teal)]">{campaign.roas}x</span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">Conversions</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">{campaign.conversions}</span>
          </div>
          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">Click Rate</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">{campaign.ctr}%</span>
          </div>
        </div>
      </div>
      {loading && (
        <div className="rounded-xl border border-[var(--border-color)] p-12 text-center">
          <Sparkles className="h-8 w-8 text-[var(--primary)] animate-bounce mx-auto mb-3" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">Calculating campaign health diagnostics...</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Translating metrics into simple, non-technical business recommendations.</p>
        </div>
      )}

      {!loading && insights && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" /> Performance Summary
              </div>
              <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed">
                {insights.summary}
              </p>
            </div>

            <div className="border border-[var(--border-color)] rounded-xl p-4 text-center min-w-[140px] shrink-0 self-center">
              <span className="text-xs text-[var(--text-secondary)] font-medium block">Health Score</span>
              <span
                className={`text-3xl font-extrabold ${
                  insights.healthScore >= 80
                    ? 'text-[var(--accent-teal)]'
                    : insights.healthScore >= 60
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }`}
              >
                {insights.healthScore}/100
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border-color)] p-5 space-y-3">
              <div className="flex items-center gap-2 text-[var(--accent-teal)] font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                What's Working Well
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                {insights.whatIsWorking.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg border border-[var(--border-color)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)] mt-1.5 shrink-0" />
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-color)] p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                <AlertTriangle className="h-5 w-5" />
                What Needs Attention
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                {insights.whatNeedsFixing.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg border border-[var(--border-color)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-base">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Suggested Changes to Make Right Now
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Clear, non-technical steps recommended to boost sales and prevent wasted ad budget.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {insights.recommendedActions.map((action) => (
                <div
                  key={action.id}
                  className={`rounded-xl border p-4 transition-all flex flex-col justify-between space-y-4 ${
                    action.applied
                      ? 'border-[var(--accent-teal)]'
                      : 'border-[var(--border-color)] hover:border-[var(--primary)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-[var(--text-primary)]">{action.title}</h4>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            action.impact === 'High'
                              ? 'border-rose-500 text-rose-500'
                              : 'border-[var(--primary)] text-[var(--primary)]'
                          }`}
                        >
                          {action.impact} Impact
                        </span>
                        <span className="text-[10px] font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                          {action.effort}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{action.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleAction(action.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                        action.applied
                          ? 'bg-[var(--accent-teal)] text-white'
                          : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
                      }`}
                    >
                      {action.applied ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Marked as Applied
                        </>
                      ) : (
                        <>
                          Apply Change <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-[var(--text-secondary)]">Loading campaign details...</div>}>
      <InsightsContent />
    </Suspense>
  );
}