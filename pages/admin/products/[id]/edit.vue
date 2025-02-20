<template>
  <div>
    <ProductForm
        v-if="product"
        :isEdit="true"
        :initialData="product"
        @submit="handleSubmit"
        @cancel="handleCancel"
    />
    <div v-else class="p-8">
      <p>Loading product data...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import ProductForm from '~/components/products/ProductForm.vue';
import {useToast} from "primevue/usetoast";

definePageMeta({
  middleware: 'auth'
});

interface DeliveryOption {
  option: string;
  charge: number | null;
}

interface ProductFormData {
  name: string | null;
  price: number | null;
  discount: number | null;
  discount_type: string;
  courier_weight: number | null;
  low_stock_limit: number | null;
  stock_enabled: boolean;
  delivery_charge: DeliveryOption[];
  variantName: string[];
  options: string[];
  discount_end: number;
  image: string;
  attributes: string[];
}

const toast = useToast();
const route = useRoute();
const router = useRouter();
const product = ref<any>(null);

const productId = route.params.id as string;
const {data, error} = await getData(`product/${productId}`) as { data: any, error: any };
console.log('>>',data)

if (error.value) {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Failed to load product data',
    life: 3000
  });
  router.push('/products');
} else {
  product.value = {
    ...data.value,
    variantName: data.value.attributes?.map((attr: string) => attr) || [],
    deliveryOptions: data.value.delivery_charge || [],
    option: data.value.options || '',
    discountType: data.value.discount_type || '',
    lowStockLimit: data.value.low_stock_limit || 0,
    courierWeight: data.value.courier_weight || 0,
    stock: !data.value.stock_enabled,
    // variantDiscount:data.value.variants?.[0]?.discount || 0,
  };
}

const handleSubmit = async (formData: ProductFormData): Promise<void> => {
  const productData = {
    name: formData.name,
    price: formData.price,
    discount: formData.discount,
    discount_type: formData.discount_type,
    courier_weight: formData.courier_weight,
    low_stock_limit: formData.low_stock_limit,
    stock_enabled: formData.stock_enabled,
    delivery_charge: formData.delivery_charge,
    variantName: formData.variantName,
    options: formData.options,
    discount_end: Date.now(),
    image: formData.image,
    attributes: formData.attributes
  };

  const {error} = await putData(`product/${productId}`, productData) as { error: any };

  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to update product',
      life: 3000
    });
  } else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product updated successfully',
      life: 3000
    });
    router.push('/admin/products');
  }
};

const handleCancel = () => {
  router.push('/products');
};
</script>
