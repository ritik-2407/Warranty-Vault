"use client";

import Image from "next/image";
import { DocumentIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { NoImagePlaceholder } from "@/components/products/NoImagePlaceholder";
import { PRODUCT_CARD_CLASS } from "@/lib/products/constants";
import { formatDate } from "@/lib/products/date-utils";
import { getExpiresInTag } from "@/lib/products/expires-in";
import type { Product, WarrantyUnit } from "@/lib/products/types";

function yearsAndMonths(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearPart = `${years} ${years === 1 ? "Year" : "Years"}`;
  if (months === 0) return yearPart;
  return `${yearPart} ${months} ${months === 1 ? "Month" : "Months"}`;
}

function formatCoverage(product: Product): string {
  if (product.warrantyValue && product.warrantyUnit) {
    const v = product.warrantyValue;
    const u = product.warrantyUnit as WarrantyUnit;
    if (u === "months" && v >= 12) return yearsAndMonths(v);
    const label = v === 1 ? u.slice(0, -1) : u;
    return `${v} ${label.charAt(0).toUpperCase() + label.slice(1)}`;
  }
  const m = product.warrantyMonths;
  if (m >= 12) return yearsAndMonths(m);
  return `${m} ${m === 1 ? "Month" : "Months"}`;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onViewReceipt: (photo: string) => void;
}

export function ProductCard({ product, onEdit, onDelete, onViewReceipt }: ProductCardProps) {
  const expiresIn = getExpiresInTag(product.expiryDate);

  return (
    <li>
      <div className={PRODUCT_CARD_CLASS}>
        <div className="flex gap-3 sm:gap-4 items-start">

          {/* Thumbnail — smaller on mobile */}
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden border border-[#561e2d]/15 bg-[#fdf5f6]">
            {product.productImage ? (
              <Image src={product.productImage} alt={product.name} fill className="object-cover" unoptimized />
            ) : (
              <NoImagePlaceholder className="w-full h-full" />
            )}
          </div>

          {/* Content — takes remaining width */}
          <div className="flex-1 min-w-0">

            {/* Title row + action buttons (no 3rd column on mobile) */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h2 className="text-base sm:text-xl font-extrabold text-[#1a0a0e] leading-tight tracking-tight">
                {product.name}
              </h2>
              <div className="flex shrink-0 gap-0.5 sm:gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9a6070] hover:text-[#561e2d] hover:bg-[#561e2d]/10 transition"
                  aria-label={`Edit ${product.name}`}
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(product.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#9a6070] hover:text-red-600 hover:bg-red-50 transition"
                  aria-label={`Delete ${product.name}`}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badge on its own line — no longer competing with the title */}
            <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${expiresIn.badgeClass}`}>
              {expiresIn.label}
            </span>

            {/* Meta info */}
            <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-[#9a6070]">
              <span>
                <span className="font-medium text-[#7a3a4a]">Purchased:</span>{" "}
                {formatDate(product.purchaseDate)}
              </span>
              <span>
                <span className="font-medium text-[#7a3a4a]">Expires:</span>{" "}
                {formatDate(product.expiryDate)}
              </span>
              <span>
                <span className="font-medium text-[#7a3a4a]">Coverage:</span>{" "}
                {formatCoverage(product)}
              </span>
            </div>

            {product.billPhoto && (
              <button
                type="button"
                onClick={() => onViewReceipt(product.billPhoto!)}
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-[#561e2d] hover:text-[#3d1520] transition"
              >
                <DocumentIcon className="w-4 h-4" />
                View Receipt / Bill
              </button>
            )}
          </div>

        </div>
      </div>
    </li>
  );
}
