export function formatZAR(value) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);
}

export function applyDiscount(price, percent) {
  const discounted = Number(price) - Number(price) * (Number(percent) / 100);
  return Math.max(0, Number(discounted.toFixed(2)));
}
