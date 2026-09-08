export function formatCost(cost?: string | null) {
  const num = Number(cost);
  if (!cost || Number.isNaN(num)) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};