export function formatWeight(value: number) {
  const abs = Math.abs(value).toFixed(2);
  return value < 0 ? `−${abs}` : abs;
}
