 import { ref } from "vue";
import type { ProductData } from "~/interfaces/productData";

export function useProductForm(initialData?: ProductData) {
  const productName = ref<string | null>(null);
  const price = ref<number | null>(null);
  const discount = ref<number | null>(null);
  const discountType = ref<{ name: string; value: string } | null>(null);
  const courierWeight = ref<number | null>(null);
  const lowStocklimit = ref<number | null>(null);
  const enableStock = ref<boolean>(false);
  const variantName = ref<{ name: string; value: string }[]>([]);
  const option = ref<string>('');
  const uploadedFiles = ref<string[]>([]);
  
 const deliveryOptionsData = ref<{ option: string; charge: number | null }[]>([{ option: '', charge: null }]);

  const discountOptions = [
    { name: "Percent", value: "percentage" },
    { name: "Fixed", value: "flat" },
  ];

  const variantOptions = [
    { name: "Color", value: "color" },
    { name: "Size", value: "size" },
    { name: "Weight", value: "weight" },
    { name: "Material", value: "material" },
    { name: "Brand", value: "brand" },
    { name: "Design", value: "design" },
    { name: "Style", value: "style" },
    { name: "Pattern", value: "pattern" },
    { name: "Season", value: "season" },
    { name: "Occasion", value: "occasion" },
  ];

  const initializeForm = () => { 
    if (initialData) {
      productName.value = initialData.name;
      price.value = initialData.price;
      discount.value = initialData.discount;
      discountType.value = initialData.discountType
        ? {
            name: initialData.discountType === "flat" ? "Fixed" : "Percent",
            value: initialData.discountType,
          }
        : null;
      courierWeight.value = initialData.courierWeight;
      lowStocklimit.value = initialData.lowStockLimit;
      enableStock.value = !initialData.stock;
      variantName.value = initialData.variantName?.map((value) => ({ name: value, value })) || [];
      option.value = initialData.option || '';
      if (initialData.deliveryOptions?.length > 0) {
        deliveryOptionsData.value = initialData.deliveryOptions.map(option => ({
          option: option.option,
          charge: option.charge !== undefined ? option.charge : null 
        }));
      }
    }
  };
  
  const variants = ref<{
    name: string;
    attributes: string[];
    price: number | null;
    discount: number | null;
    discount_type: string;
    discount_end: number;
    stock_enabled: boolean;
    low_stock_limit: number | null;
    courier_weight: number | null;
    delivery_charge: { option: string; charge: number | null }[];
  }[]>([]);

  const getFormData = () => ({
    name: productName.value,
    price: price.value,
    discount: discount.value,
    discount_type: discountType.value?.value || "percentage",
    courier_weight: courierWeight.value,
    low_stock_limit: lowStocklimit.value,
    stock_enabled: enableStock.value,
    delivery_charge: deliveryOptionsData.value.map(({ option, charge }) => ({
      option,
      charge
    })), // Ensure both values are included
    options: [option.value],
    discount_end: Date.now(),
    image: uploadedFiles.value[0] || '',
    attributes: variantName.value.map((variant) => variant.value),
    variants: variants.value,
  });

  return {
    productName,
    price,
    discount,
    discountType,
    courierWeight,
    lowStocklimit,
    enableStock,
    deliveryOptionsData,
    variantName,
    option,
    uploadedFiles,
    discountOptions,
    variantOptions,
    variants,
    initializeForm,
    getFormData,
  };
}

