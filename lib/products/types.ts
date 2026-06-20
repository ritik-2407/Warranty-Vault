export type WarrantyUnit = "days" | "months" | "years";

export interface Product {
  id: string;
  name: string;
  purchaseDate: string;
  warrantyMonths: number;
  warrantyValue?: number;
  warrantyUnit?: WarrantyUnit;
  expiryDate: string;
  billPhoto?: string;
}
