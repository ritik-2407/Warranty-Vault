import { daysRemaining } from "./date-utils";

const ACTIVE_BADGE = "bg-[#561e2d]/10 text-[#561e2d] border border-[#561e2d]/30";
const EXPIRED_BADGE = "bg-red-50 text-red-700 border border-red-200";

export function getExpiresInTag(expiryDate: string): { label: string; badgeClass: string } {
  const days = daysRemaining(expiryDate);

  if (days <= 0) {
    return { label: "Expired", badgeClass: EXPIRED_BADGE };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const cursor = new Date(today);

  // Count full years
  let years = 0;
  while (true) {
    const next = new Date(cursor);
    next.setFullYear(next.getFullYear() + 1);
    if (next > expiry) break;
    years++;
    cursor.setTime(next.getTime());
  }

  // Count remaining full months
  let months = 0;
  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next > expiry) break;
    months++;
    cursor.setTime(next.getTime());
  }

  const remDays = Math.round((expiry.getTime() - cursor.getTime()) / (1000 * 60 * 60 * 24));

  const parts: string[] = [];
  if (years > 0)  parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} month${months === 1 ? "" : "s"}`);
  // only show days when there are no years (keeps the badge concise)
  if (years === 0 && remDays > 0) parts.push(`${remDays} day${remDays === 1 ? "" : "s"}`);
  if (parts.length === 0) parts.push("1 day");

  return {
    label: parts.join(" "),
    badgeClass: ACTIVE_BADGE,
  };
}
