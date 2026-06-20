import { PAGE_GRADIENT } from "@/lib/theme";

export function GradientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: PAGE_GRADIENT }}>
      {children}
    </div>
  );
}
