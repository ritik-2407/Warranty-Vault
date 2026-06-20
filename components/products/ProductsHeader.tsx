interface ProductsHeaderProps {
  inWarrantyCount: number;
  expiredCount: number;
  totalCount: number;
}

export function ProductsHeader({ inWarrantyCount, expiredCount, totalCount }: ProductsHeaderProps) {
  return (
    <div className="mb-8 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a0a0e] tracking-tight mb-2">My Products</h1>
      <p className="text-[#9a6070] text-sm">
        {totalCount > 0
          ? `${inWarrantyCount} in warranty · ${expiredCount} expired`
          : "No products yet — add one to get started"}
      </p>
    </div>
  );
}
