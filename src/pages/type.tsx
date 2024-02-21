export interface Variant {
  price: number;
  weight: number;
  variant: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  quantity: number;
  variants: Variant[];
  selected: boolean;
  selectedVariant: Variant | null;
}

export interface Warehouse {
  id: number;
  title: string;
  price: number;
  weight: number;
  quantity: number;
  selected: boolean;
}

export interface Selected {
  selectAll: boolean;
  selectedItems: number[];
}
