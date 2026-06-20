"use client";

import { useState, useEffect } from "react";
import { daysRemaining } from "@/lib/products/date-utils";
import { loadProducts, saveProducts } from "@/lib/products/storage";
import type { Product } from "@/lib/products/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  useEffect(() => {
    const id = setInterval(() => setProducts((p) => [...p]), 60_000);
    return () => clearInterval(id);
  }, []);

  const sortedProducts = [...products].sort(
    (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  const inWarrantyProducts = sortedProducts.filter((p) => daysRemaining(p.expiryDate) > 0);
  const expiredProducts = [...sortedProducts]
    .filter((p) => daysRemaining(p.expiryDate) <= 0)
    .sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());

  const handleSave = (product: Product) => {
    const exists = products.some((p) => p.id === product.id);
    const updated = exists
      ? products.map((p) => (p.id === product.id ? product : p))
      : [...products, product];
    setProducts(updated);
    saveProducts(updated);
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  return {
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
  };
}
