"use client";

import { PlusIcon } from "@/components/icons";
import { ProductListSection } from "@/components/products/ProductListSection";
import { ProductsEmptyState } from "@/components/products/ProductsEmptyState";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import type { Product } from "@/lib/products/types";

interface ProductsDashboardProps {
  products: Product[];
  inWarrantyProducts: Product[];
  expiredProducts: Product[];
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onViewReceipt: (photo: string) => void;
}

export function ProductsDashboard({
  products,
  inWarrantyProducts,
  expiredProducts,
  onAdd,
  onEdit,
  onDelete,
  onViewReceipt,
}: ProductsDashboardProps) {
  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-10 pb-12">
      <ProductsHeader
        totalCount={products.length}
        inWarrantyCount={inWarrantyProducts.length}
        expiredCount={expiredProducts.length}
      />

      {products.length === 0 ? (
        <ProductsEmptyState onAdd={onAdd} />
      ) : (
        <div className="space-y-8">
          <ProductListSection
            title="In Warranty"
            variant="warranty"
            subtitle={`${inWarrantyProducts.length} product${inWarrantyProducts.length !== 1 ? "s" : ""} `}
            emptyMessage="No products currently under warranty."
            products={inWarrantyProducts}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewReceipt={onViewReceipt}
          />
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-dashed border-zinc-300" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">X X X</span>
            <div className="flex-1 border-t border-dashed border-zinc-300" />
          </div>

          <ProductListSection
            title="Expired"
            variant="expired"
            subtitle={`${expiredProducts.length} product${expiredProducts.length !== 1 ? "s" : ""} `}
            emptyMessage="No expired products — all warranties are active."
            products={expiredProducts}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewReceipt={onViewReceipt}
          />
        </div>
      )}
    </main>
  );
}

export function AddProductNavButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#561e2d] text-white text-sm font-semibold hover:bg-[#3d1520] transition shadow-sm shrink-0"
    >
      <PlusIcon className="w-4 h-4" />
      Add Product
    </button>
  );
}
