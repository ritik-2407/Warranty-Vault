import Image from "next/image";
import Link from "next/link";

interface SiteFooterProps {
  showHomeLink?: boolean;
}

export function SiteFooter({ showHomeLink }: SiteFooterProps) {
  return (
    <footer className="border-t border-[#561e2d]/15 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#9a6070]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded overflow-hidden shrink-0">
            <Image src="/favicon.ico" alt="WarrantyVault" width={20} height={20} className="w-full h-full object-cover" unoptimized />
          </div>
          <span className="font-semibold text-[#1a0a0e]">WarrantyVault</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {showHomeLink && (
            <>
              <Link href="/" className="hover:text-[#561e2d] transition">Back to Home</Link>
              <span className="text-[#561e2d]/30">·</span>
            </>
          )}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#561e2d] transition"
          >
            Built for Digital Heroes
          </a>
          <span className="text-[#561e2d]/30">·</span>
          <span className="text-[#9a6070]">Created by Ritik Yadav</span>
          <span className="text-[#561e2d]/30">·</span>
          <a href="mailto:ritikyadav2426@gmail.com" className="hover:text-[#561e2d] transition">
            ritikyadav2426@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
