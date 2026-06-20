import Link from "next/link";
import { ShieldIcon } from "@/components/icons";

interface FloatingNavProps {
  action?: { href: string; label: string };
  actionButton?: React.ReactNode;
}

export function FloatingNav({ action, actionButton }: FloatingNavProps) {
  return (
    <div className="sticky top-4 z-20 flex justify-center px-4">
      <header className="w-full max-w-4xl bg-white/75 backdrop-blur-md border border-[#561e2d]/20 rounded-2xl shadow-xl shadow-[#561e2d]/10">
        <div className="px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <div className="w-7 h-7 rounded-lg bg-[#561e2d] flex items-center justify-center shadow-sm">
              <ShieldIcon className="w-[15px] h-[15px] text-[#ffffff]" />
            </div>
            <span className="font-bold text-[#1a0a0e] text-base tracking-tight">WarrantyVault</span>
          </Link>
          {actionButton ?? (action && (
            <Link
              href={action.href}
              className="px-4 py-1.5 rounded-lg bg-[#561e2d] text-[#ffffff] text-sm font-semibold hover:bg-[#3d1520] transition shadow-sm"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </header>
    </div>
  );
}
