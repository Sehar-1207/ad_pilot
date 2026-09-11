export const formatNumber = (value?: number) => {
  if (value === undefined || value === null) return "0";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value?: number) => {
  if (value === undefined || value === null) return "0%";

  return `${Number(value).toFixed(2)}%`;
};

export const formatRoas = (value?: number) => {
  if (value === undefined || value === null) return "0.00x";

  return `${Number(value).toFixed(2)}x`;
};

export const getHealthLabel = (health?: string) => {
  switch (health) {
    case "PROFITABLE":
      return "Profitable";
    case "FATIGUED":
      return "Fatigued";
    case "NEEDS_ATTENTION":
      return "Needs Attention";
    case "NORMAL":
      return "Normal";
    default:
      return health || "Unknown";
  }
};

export const getHealthClasses = (health?: string) => {
  switch (health) {
    case "PROFITABLE":
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        border: "border-emerald-200",
      };

    case "FATIGUED":
      return {
        badge: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
        border: "border-rose-200",
      };

    case "NEEDS_ATTENTION":
      return {
        badge: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
        border: "border-red-200",
      };

    case "NORMAL":
      return {
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
        border: "border-amber-200",
      };

    default:
      return {
        badge: "bg-gray-50 text-gray-700 border-gray-200",
        dot: "bg-gray-400",
        border: "border-gray-200",
      };
  }
};

export const getStatusClasses = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "paused":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "deleted":
    case "archived":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};