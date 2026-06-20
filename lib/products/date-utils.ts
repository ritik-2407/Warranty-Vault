export function addMonths(dateStr: string, months: number): string {
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split("T")[0];
}

export function addDuration(dateStr: string, value: number, unit: "days" | "months" | "years"): string {
  const date = new Date(dateStr);
  if (unit === "days") {
    date.setDate(date.getDate() + value);
  } else if (unit === "months") {
    date.setMonth(date.getMonth() + value);
  } else {
    date.setFullYear(date.getFullYear() + value);
  }
  return date.toISOString().split("T")[0];
}

export function daysRemaining(expiryDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  return Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
