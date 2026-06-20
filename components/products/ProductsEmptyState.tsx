import { DocumentIcon, PlusIcon } from "@/components/icons";

interface ProductsEmptyStateProps {
  onAdd: () => void;
}

export function ProductsEmptyState({ onAdd }: ProductsEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#561e2d]/20 bg-[#fdf5f6] py-16 flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-[#561e2d]/10 border border-[#561e2d]/20 flex items-center justify-center">
        <DocumentIcon className="w-8 h-8 text-[#561e2d]/50" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#1a0a0e] mb-1">No products yet</p>
        <p className="text-xs text-[#9a6070]">Click &ldquo;Add Product&rdquo; to start tracking warranties.</p>
      </div>
      <button
        onClick={onAdd}
        className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#561e2d] text-white text-sm font-semibold hover:bg-[#3d1520] transition shadow-lg shadow-[#561e2d]/20"
      >
        <PlusIcon className="w-4 h-4" />
        Add Your First Product
      </button>
    </div>
  );
}
