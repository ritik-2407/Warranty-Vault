"use client";

import Image from "next/image";

interface ReceiptLightboxProps {
  photo: string;
  onClose: () => void;
}

export function ReceiptLightbox({ photo, onClose }: ReceiptLightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-[#561e2d]/30 text-[#9a6070] hover:text-red-600 shadow flex items-center justify-center text-lg font-bold z-10 transition"
          aria-label="Close"
        >
          ×
        </button>
        <Image
          src={photo}
          alt="Receipt"
          width={600}
          height={600}
          className="rounded-xl w-full object-contain max-h-[80vh] shadow-2xl"
          unoptimized
        />
      </div>
    </div>
  );
}
