
export type AssetType = "Share" | "Bond" | "Unit";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
  purchaseDate?: string; // Optional for now
}

export type SortKey = 'name' | 'totalValue' | 'returnPercentage' | 'purchaseDate';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

