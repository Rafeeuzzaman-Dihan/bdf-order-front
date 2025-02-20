 export interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    variants: any[];
    stock: boolean;
    image: string;
  }