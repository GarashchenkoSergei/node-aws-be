export interface Product {
  id: string;
  price: number;
  title: string;
  description: string;
  count: number;
}

export type ProductsList = Product[];