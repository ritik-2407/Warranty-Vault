"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { BoxIcon, CloseIcon, DocumentIcon, PencilIcon, PlusIcon } from "@/components/icons";
import { FORM_INPUT_CLASS } from "@/lib/products/constants";
import { addDuration } from "@/lib/products/date-utils";
import { readImageFile } from "@/lib/products/images";
import type { Product, WarrantyUnit } from "@/lib/products/types";

interface ProductFormModalProps {
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

function getInitialWarranty(product?: Product): { value: number | ""; unit: WarrantyUnit } {
  if (product?.warrantyValue && product?.warrantyUnit) {
    return { value: product.warrantyValue, unit: product.warrantyUnit };
  }
  const months = product?.warrantyMonths ?? 12;
  if (months % 12 === 0) return { value: months / 12, unit: "years" };
  return { value: months, unit: "months" };
}

function toMonthsApprox(value: number, unit: WarrantyUnit): number {
  if (unit === "days") return Math.round(value / 30.44);
  if (unit === "years") return value * 12;
  return value;
}

const UNITS: { label: string; value: WarrantyUnit }[] = [
  { label: "Days", value: "days" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
];

export function ProductFormModal({ onClose, onSave, product }: ProductFormModalProps) {
  const isEditing = !!product;
  const initialWarranty = getInitialWarranty(product);

  const [name, setName] = useState(product?.name ?? "");
  const [purchaseDate, setPurchaseDate] = useState(product?.purchaseDate ?? "");
  const [warrantyValue, setWarrantyValue] = useState<number | "">(initialWarranty.value);
  const [warrantyUnit, setWarrantyUnit] = useState<WarrantyUnit>(initialWarranty.unit);
  const [productImage, setProductImage] = useState<string | undefined>(product?.productImage);
  const [productImageFileName, setProductImageFileName] = useState(
    product?.productImage ? "Current product image" : ""
  );
  const [billPhoto, setBillPhoto] = useState<string | undefined>(product?.billPhoto);
  const [billFileName, setBillFileName] = useState(product?.billPhoto ? "Current receipt" : "");
  const [errors, setErrors] = useState<{
    name?: string;
    purchaseDate?: string;
    warrantyValue?: string;
  }>({});
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const billInputRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().split("T")[0];

  const handleProductImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProductImageFileName(file.name);
    readImageFile(file, setProductImage);
  }, []);

  const handleBillPhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBillFileName(file.name);
    readImageFile(file, setBillPhoto);
  }, []);

  const validate = () => {
    const errs: { name?: string; purchaseDate?: string; warrantyValue?: string } = {};
    if (!name.trim()) errs.name = "Product name is required.";
    if (!purchaseDate) errs.purchaseDate = "Purchase date is required.";
    if (warrantyValue === "" || warrantyValue < 1)
      errs.warrantyValue = "Enter a valid warranty duration (minimum 1).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const value = warrantyValue as number;
    onSave({
      id: product?.id ?? crypto.randomUUID(),
      name: name.trim(),
      purchaseDate,
      warrantyMonths: toMonthsApprox(value, warrantyUnit),
      warrantyValue: value,
      warrantyUnit,
      expiryDate: addDuration(purchaseDate, value, warrantyUnit),
      productImage,
      billPhoto,
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#1a0a0e]/30 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-xl rounded-2xl border border-[#561e2d]/20 bg-white shadow-2xl shadow-[#561e2d]/10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-7 py-5 border-b border-[#561e2d]/15">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#561e2d] flex items-center justify-center">
                {isEditing ? (
                  <PencilIcon className="w-4 h-4 text-white" />
                ) : (
                  <PlusIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <h2 className="text-base font-bold text-[#1a0a0e]">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9a6070] hover:text-[#1a0a0e] hover:bg-[#561e2d]/8 transition"
              aria-label="Close"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-[#1a0a0e] mb-1.5">
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='e.g. Samsung 65″ TV'
                className={`${FORM_INPUT_CLASS} ${errors.name ? "border-red-400 bg-red-50" : "border-[#561e2d]/25 bg-white"}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1a0a0e] mb-1.5">
                  Purchase Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={purchaseDate}
                  max={today}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className={`${FORM_INPUT_CLASS} ${errors.purchaseDate ? "border-red-400 bg-red-50" : "border-[#561e2d]/25 bg-white"}`}
                />
                {errors.purchaseDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.purchaseDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a0a0e] mb-1.5">
                  Warranty Period
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    min={1}
                    value={warrantyValue}
                    onChange={(e) =>
                      setWarrantyValue(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    placeholder="e.g. 2"
                    className={`${FORM_INPUT_CLASS} ${
                      errors.warrantyValue ? "border-red-400 bg-red-50" : "border-[#561e2d]/25 bg-white"
                    }`}
                  />
                  <div className="flex rounded-lg border border-[#561e2d]/25 overflow-hidden text-sm font-medium">
                    {UNITS.map((u) => (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => setWarrantyUnit(u.value)}
                        className={`flex-1 py-2 transition ${
                          warrantyUnit === u.value
                            ? "bg-[#561e2d] text-white"
                            : "bg-white text-[#9a6070] hover:bg-[#561e2d]/8 hover:text-[#1a0a0e]"
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
                {errors.warrantyValue && (
                  <p className="mt-1 text-xs text-red-600">{errors.warrantyValue}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1a0a0e] mb-1.5">
                  Product Image <span className="text-[#9a6070] font-normal">(optional)</span>
                </label>
                <div
                  onClick={() => productImageInputRef.current?.click()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-dashed border-[#561e2d]/25 bg-[#fdf5f6] cursor-pointer hover:border-[#561e2d]/50 hover:bg-[#561e2d]/5 transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#561e2d]/10 border border-[#561e2d]/20 flex items-center justify-center shrink-0">
                    <BoxIcon className="w-5 h-5 text-[#561e2d]" />
                  </div>
                  <span className="text-sm text-[#9a6070] truncate">
                    {productImageFileName || "Upload product photo"}
                  </span>
                </div>
                <input
                  ref={productImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageChange}
                  className="hidden"
                />
                {productImage && (
                  <div className="mt-2 relative inline-block">
                    <Image
                      src={productImage}
                      alt="Product preview"
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg border border-[#561e2d]/25"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProductImage(undefined);
                        setProductImageFileName("");
                        if (productImageInputRef.current) productImageInputRef.current.value = "";
                      }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow hover:bg-red-600"
                      aria-label="Remove product image"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a0a0e] mb-1.5">
                  Bill / Receipt <span className="text-[#9a6070] font-normal">(optional)</span>
                </label>
                <div
                  onClick={() => billInputRef.current?.click()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-dashed border-[#561e2d]/25 bg-[#fdf5f6] cursor-pointer hover:border-[#561e2d]/50 hover:bg-[#561e2d]/5 transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#561e2d]/8 border border-[#561e2d]/20 flex items-center justify-center shrink-0">
                    <DocumentIcon className="w-5 h-5 text-[#9a6070]" />
                  </div>
                  <span className="text-sm text-[#9a6070] truncate">
                    {billFileName || "Upload receipt / bill"}
                  </span>
                </div>
                <input
                  ref={billInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBillPhotoChange}
                  className="hidden"
                />
                {billPhoto && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-[#561e2d] font-medium">Receipt attached</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBillPhoto(undefined);
                        setBillFileName("");
                        if (billInputRef.current) billInputRef.current.value = "";
                      }}
                      className="text-xs text-red-600 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#9a6070] hover:text-[#1a0a0e] hover:bg-[#561e2d]/8 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#561e2d] hover:bg-[#3d1520] text-white text-sm font-semibold rounded-lg transition shadow-sm shadow-[#561e2d]/25"
              >
                {isEditing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
