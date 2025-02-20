export interface DeliveryOption {
    option: string;
    charge: number | null;
  }

  
  export interface ProductData {
    id?: number;
    name: string;
    price: number;
    discount: number;
    discountType: string;
    courierWeight: number;
    lowStockLimit: number;
    enableStock: boolean;
    deliveryOptions: DeliveryOption[];
    variantName: string[];
    option: string;
    variantsCount: number;
    stock: boolean;
    image: string;
  }
  
