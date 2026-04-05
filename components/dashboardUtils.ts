export const safeArray = <T,>(value?: T[] | null): T[] =>
  Array.isArray(value) ? value : [];

export const safeNumber = (
  value: number | null | undefined,
  fallback = 0
) => (typeof value === "number" && Number.isFinite(value) ? value : fallback);

export const safeText = (
  value: string | null | undefined,
  fallback: string
) => {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : fallback;
};
