<template>
  <ProductsProductForm
      :isEdit="false"
      @submit="handleSubmit"
      @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import {useToast} from "primevue/usetoast";
import {useRouter} from 'vue-router';
import {ProductsProductForm} from "#components";

definePageMeta({
  middleware: 'auth'
});

const router = useRouter();
const toast = useToast();

const handleSubmit = async (productData: any): Promise<void> => {
  const {data, error} = await postData('product', productData) as { data: any, error: any };


  if (error.value) {
    console.log(error.value.data);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create product',
      life: 3000
    });
  } else {
    console.log('=>',data.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product created successfully',
      life: 3000
    });
    await router.push('/admin/products');
  }
};

const handleCancel = () => {
  router.push('/admin/products');
};
</script>

<style></style>
