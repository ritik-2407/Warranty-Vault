"use client";

import { ProductFormModal } from "@/components/products/ProductFormModal";
import { AddProductNavButton, ProductsDashboard } from "@/components/products/ProductsDashboard";
import { ReceiptLightbox } from "@/components/products/ReceiptLightbox";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GradientShell } from "@/components/layout/GradientShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const {
    products,
    inWarrantyProducts,
    expiredProducts,
    showAddForm,
    setShowAddForm,
    editingProduct,
    setEditingProduct,
    previewPhoto,
    setPreviewPhoto,
    handleSave,
    closeForm,
    handleDelete,
  } = useProducts();

  return (
    <GradientShell>
      <FloatingNav actionButton={<AddProductNavButton onClick={() => setShowAddForm(true)} />} />

      <ProductsDashboard
        products={products}
        inWarrantyProducts={inWarrantyProducts}
        expiredProducts={expiredProducts}
        onAdd={() => setShowAddForm(true)}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
        onViewReceipt={setPreviewPhoto}
      />

      <SiteFooter showHomeLink />

      {(showAddForm || editingProduct) && (
        <ProductFormModal
          key={editingProduct?.id ?? "new"}
          product={editingProduct ?? undefined}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}

      {previewPhoto && (
        <ReceiptLightbox photo={previewPhoto} onClose={() => setPreviewPhoto(null)} />
      )}
    </GradientShell>
  );
}
