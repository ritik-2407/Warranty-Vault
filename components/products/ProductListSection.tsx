import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/products/types";

interface ProductListSectionProps {
  title: string;
  subtitle: string;
  emptyMessage: string;
  products: Product[];
  variant: "warranty" | "expired";
  className?: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onViewReceipt: (photo: string) => void;
}

const VARIANT_STYLES = {
  warranty: {
    sectionBg: "bg-green-50/50 rounded-2xl p-5",
    headerBorder: "border-b border-green-200",
    accentBar: "border-l-[3px] border-green-600 pl-3",
    titleColor: "text-green-700",
    dot: "bg-green-500",
    emptyBorder: "border-green-200",
  },
  expired: {
    sectionBg: "bg-red-50/60 rounded-2xl p-5",
    headerBorder: "border-b border-red-200",
    accentBar: "border-l-[3px] border-red-400 pl-3",
    titleColor: "text-red-600",
    dot: "bg-red-400",
    emptyBorder: "border-red-200",
  },
};

export function ProductListSection({
  title,
  subtitle,
  emptyMessage,
  products,
  variant,
  className = "",
  onEdit,
  onDelete,
  onViewReceipt,
}: ProductListSectionProps) {
  const s = VARIANT_STYLES[variant];

  return (
    <section className={`${s.sectionBg} ${className}`}>
      <div className={`flex items-center gap-4 mb-5 pb-3 ${s.headerBorder}`}>
        <div className={`flex items-center gap-2.5 ${s.accentBar}`}>
          <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
          <h2 className={`text-xl font-bold ${s.titleColor}`}>{title}</h2>
        </div>
        <span className="text-xs text-[#9a6070]">{subtitle}</span>
      </div>

      {products.length === 0 ? (
        <p className={`text-sm text-[#9a6070] text-center py-6 border border-dashed ${s.emptyBorder} rounded-xl`}>
          {emptyMessage}
        </p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewReceipt={onViewReceipt}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
