export function formatWeight(value: number) {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `−${abs}` : abs;
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
