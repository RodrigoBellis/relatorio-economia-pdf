const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  host: process.env.HOST || "0.0.0.0",
  port: toNumber(process.env.PORT, 5050),
  maxPdfSizeBytes: 10 * 1024 * 1024,
};

