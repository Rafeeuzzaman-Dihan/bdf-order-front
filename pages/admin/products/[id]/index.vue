<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteItem } from '~/composables/deleteItem';
import { useConfirmation } from '~/composables/confirmation';
import { getData } from '~/composables/useFetch';
import AdjustStockModal from '~/components/AdjustStockModal.vue';
import { ConfirmDialog } from 'primevue';

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const product = ref<any>({});
const visible = ref<boolean>(false);
const lowStockLimit = ref<number>(0); 

const { data, error } = await getData(`product/${id}`) as { data: any, error: any };

if (error && error.value) {
  console.log(error);
} else {
  console.log("Product Data:", data.value);
  product.value = data.value;
  lowStockLimit.value = product.value.low_stock_limit; 
}

const { confirmItemDelete } = useConfirmation();
const { deletebyId } = deleteItem();

const handleDelete = () => {
  const productId = Array.isArray(id) ? id[0] : id;
  confirmItemDelete(productId, () => {
    deletebyId(productId, 'product');
  });
};

const goToEditPage = () => {
  router.push(`/products/${id}/edit`);
};

const handleAdjustStock = (data: { action: string | null; quantity: number | null; price: number | null }) => {
  console.log('Adjust Stock Data:', data);

  if (data.action && data.quantity) {
    if (data.action === 'increase') {
      lowStockLimit.value += data.quantity; 
    }

    if (data.action === 'decrease') {
      lowStockLimit.value -= data.quantity; 
    }
  }

  console.log('Updated low stock limit:', lowStockLimit.value); 
};
</script>

<template>
  <ConfirmDialog />
  <div class="mt-10 px-3">
    <div class="flex flex-col md:flex-row justify-between items-center md:items-start">
      <h2 class="text-4xl font-bold mb-4 md:mb-0">View Product</h2>
      <div class="card flex justify-start flex-wrap gap-2 w-full md:w-auto">
        <Button label="Customers" severity="warn" />
        <Button label="Stock History" severity="success" />
        <Button label="Sort Variants" severity="help" />
        <Button label="Edit" severity="warn" @click="goToEditPage" />
        <Button @click="handleDelete" label="Delete" severity="danger" />
        <Button label="Tutorial" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Tutorial" :style="{ width: '50vw' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div class="flex justify-center w-full">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/q6dun27_evw?si=nSj4XyZUJ1cH8OjN"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </Dialog>
      </div>
    </div>

    <div class="mt-5">
      <Card class="shadow-xl p-5 lg:w-[600px]">
        <template #subtitle>
          <h2 class="text-4xl font-bold">BDT {{ product?.price || 0 }}</h2>
        </template>
        <template #title>
          <h3 class="text-xl">Total Sell</h3>
        </template>
        <template #content>
          <p class="m-0 text-xl">Total Orders: 0</p>
        </template>
      </Card>
    </div>

    <div class="card mt-10 border border-slate-50 shadow rounded-2xl" v-if="product">
      <div class="p-6 border-b last:border-none">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h2 class="font-bold">Image</h2>
            <img :src="product.image || 'default-image-url.jpg'" alt="Product Image" class="w-48 h-48 rounded" />
          </div>
          <div class="flex-1 grid grid-cols-2 gap-4">
            <div>
              <h2 class="font-bold">Name</h2>
              <p>{{ product.name }}</p>
            </div>
            <div>
              <h2 class="font-bold">Courier Weight</h2>
              <p>{{ product.courier_weight }}</p>
            </div>
            <div>
              <h2 class="font-bold">Price</h2>
              <p>{{ product.price }}</p>
            </div>
            <div>
              <h2 class="font-bold">Discount</h2>
              <p>{{ product.discount }} ({{ product.discount_type }})</p>
            </div>
            <div>
              <h2 class="font-bold">Discount End</h2>
              <p>{{ new Date(product.discount_end).toLocaleDateString() }}</p>
            </div>
            <div>
              <h2 class="font-bold">Attributes</h2>
              <p>{{ (product.attributes || []).join(', ') }}</p>
            </div>
            <div>
              <h2 class="font-bold">Delivery Charges</h2>
              <p v-for="charge in product.delivery_charge" :key="charge.option">{{ charge.option }}: {{ charge.charge }}</p>
            </div>
            <div>
              <h2 class="font-bold">Stock Enabled</h2>
              <p>{{ product.stock_enabled ? 'Yes' : 'No' }}</p>
            </div>
            <div>
              <h2 class="font-bold">Low Stock Limit</h2>
              <p>{{ lowStockLimit }}</p> 
            </div>
          </div>
          <AdjustStockModal v-model:visible="visible" @adjust-stock="handleAdjustStock" />
        </div>
      </div>
    </div>
  </div>
</template>
