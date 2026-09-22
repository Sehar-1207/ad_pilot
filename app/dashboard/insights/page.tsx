"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CampaignInsightsHeader from "@/components/dashboard/insights/CampaignHeader";
import CampaignSelector from "@/components/dashboard/insights/CampaignsSelection";
import SelectedCampaignHeader from "@/components/dashboard/insights/SelectedCampaign";
import CampaignMetrics from "@/components/dashboard/insights/CampaignMetrics";
import AIAnalysisCard from "@/components/dashboard/insights/InsightAnalysis";
import InsightsLoading from "@/components/dashboard/insights/InsightLoading";
import InsightsError from "@/components/dashboard/insights/InsightError";
import CampaignNotFound from "@/components/dashboard/insights/NotFound";
import ProUpgradeCard from "@/components/dashboard/insights/ProUpgradeCard";

import {
  Campaign,
  CampaignDetailResponse,
  CampaignListResponse,
  InsightsResponse,
} from "@/types/insights";

import {
  getCampaign,
  getCampaignAIInsights,
  getCampaigns,
} from "@/api/dashboad";

import { getSubscription } from "@/api/subscription";

function InsightsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const campaignId = searchParams.get("id");

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const [plan, setPlan] = useState<"FREE" | "PRO" | null>(null);

  const [answer, setAnswer] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const [error, setError] = useState("");
  const [insightsError, setInsightsError] = useState("");

  const loadCampaigns = useCallback(async () => {
    const firstResponse = (await getCampaigns({
      page: 1,
      limit: 100,
    })) as CampaignListResponse;

    let allCampaigns = firstResponse.data?.campaigns || [];
    const totalPages = firstResponse.data?.pagination?.pages || 1;

    if (totalPages > 1) {
      const requests = [];

      for (let page = 2; page <= totalPages; page += 1) {
        requests.push(
          getCampaigns({
            page,
            limit: 100,
          })
        );
      }

      const responses =
        (await Promise.all(requests)) as CampaignListResponse[];

      responses.forEach((response) => {
        allCampaigns = [
          ...allCampaigns,
          ...(response.data?.campaigns || []),
        ];
      });
    }

    setCampaigns(allCampaigns);
  }, []);

  const loadInsights = useCallback(async (id: string) => {
    try {
      setLoadingInsights(true);
      setInsightsError("");

      const response =
        (await getCampaignAIInsights(id)) as InsightsResponse;

      setAnswer(response.data?.answer || "");
      setGeneratedAt(response.data?.generatedAt || "");
    } catch (err: any) {
      setAnswer("");
      setGeneratedAt("");

      setInsightsError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Unable to load AI insights."
      );
    } finally {
      setLoadingInsights(false);
    }
  }, []);

  const loadSelectedCampaign = useCallback(
    async (id: string) => {
      try {
        setLoadingCampaign(true);
        setError("");
        setInsightsError("");

        const response =
          (await getCampaign(id)) as CampaignDetailResponse;

        setSelectedCampaign(response.data);

        await loadInsights(id);
      } catch (err: any) {
        setSelectedCampaign(null);
        setAnswer("");
        setGeneratedAt("");

        setError(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Unable to load campaign."
        );
      } finally {
        setLoadingCampaign(false);
      }
    },
    [loadInsights]
  );

  const loadPage = useCallback(async () => {
    try {
      setLoadingPage(true);
      setError("");

      const subscriptionResponse = await getSubscription();

      const subscriptionData =
        subscriptionResponse?.data ||
        subscriptionResponse?.subscription ||
        subscriptionResponse;

      const rawPlan =
        subscriptionData?.plan?.name ||
        subscriptionData?.plan ||
        subscriptionData?.subscription?.plan?.name ||
        subscriptionData?.subscription?.plan ||
        "FREE";

      const currentPlan =
        String(rawPlan).toUpperCase() === "PRO" ? "PRO" : "FREE";

      setPlan(currentPlan);

      if (currentPlan !== "PRO") {
        setCampaigns([]);
        setSelectedCampaign(null);
        setAnswer("");
        setGeneratedAt("");
        setInsightsError("");
        return;
      }

      await loadCampaigns();

      if (campaignId) {
        await loadSelectedCampaign(campaignId);
      } else {
        setSelectedCampaign(null);
        setAnswer("");
        setGeneratedAt("");
        setInsightsError("");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Unable to load campaign insights."
      );
    } finally {
      setLoadingPage(false);
    }
  }, [campaignId, loadCampaigns, loadSelectedCampaign]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const handleSelectCampaign = (id: string) => {
    router.push(
      `/dashboard/insights?id=${encodeURIComponent(id)}`
    );
  };

  const handleReAnalyze = async () => {
    if (!campaignId) return;

    await loadInsights(campaignId);
  };

  const handleBack = () => {
    router.push("/dashboard/campaigns");
  };

  const handleUpgrade = () => {
    router.push("/pricing");
  };

  if (loadingPage) {
    return <InsightsLoading />;
  }

  if (plan !== "PRO") {
    return <ProUpgradeCard onUpgrade={handleUpgrade} />;
  }

  if (error && !selectedCampaign && campaignId) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <InsightsError
          message={error}
          onRetry={loadPage}
        />
      </div>
    );
  }

  if (!campaignId) {
    return (
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <CampaignInsightsHeader
          onRefresh={loadPage}
          loading={loadingPage}
        />

        {campaigns.length === 0 ? (
          <div
            className="rounded-2xl border p-10 text-center shadow-sm"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No campaigns available
            </h2>

            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Connect your Meta ad account and sync your campaigns
              to see insights here.
            </p>
          </div>
        ) : (
          <CampaignSelector
            campaigns={campaigns}
            onSelect={handleSelectCampaign}
          />
        )}
      </div>
    );
  }

  if (loadingCampaign && !selectedCampaign) {
    return <InsightsLoading />;
  }

  if (!selectedCampaign) {
    return <CampaignNotFound onBack={handleBack} />;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <CampaignSelector
        campaigns={campaigns}
        selectedCampaignId={campaignId}
        onSelect={handleSelectCampaign}
      />

      <SelectedCampaignHeader
        campaign={selectedCampaign}
        loadingInsights={loadingInsights}
        onReAnalyze={handleReAnalyze}
        onBack={handleBack}
      />

      <CampaignMetrics campaign={selectedCampaign} />

      {insightsError && (
        <InsightsError
          message={insightsError}
          onRetry={handleReAnalyze}
        />
      )}

      {loadingInsights && !answer && (
        <InsightsLoading
          campaignName={selectedCampaign.name}
        />
      )}

      {answer && !loadingInsights && (
        <AIAnalysisCard
          campaign={selectedCampaign}
          answer={answer}
          generatedAt={generatedAt}
        />
      )}
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<InsightsLoading />}>
      <InsightsPageContent />
    </Suspense>
  );
}