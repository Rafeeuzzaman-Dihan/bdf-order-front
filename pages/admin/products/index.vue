<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import type { Product } from "~/interfaces/products";
import { SkeletonsProductPage } from '#components';

definePageMeta({
  middleware: 'auth'
});

const pageInfo = {
  title: 'Dashboard',
  resource: 'variants',
  permissions: ['read', 'create', 'update', 'delete']
}
// const hasPermission = computed(() => $hasPermission(pageInfo.resource, pageInfo.permissions));

const { confirmItemDelete } = useConfirmation();
const { showMessage } = useMessages();

const products = ref<Product[]>([]);
const selectedProducts = ref<Product[]>([]);
const filters = ref<any>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const totalRecords = ref(0);
const rows = ref(15);
const currentPage = ref(1);
const loading = ref(false);

const dt = ref<any>();

watch(() => filters.value, async () => {
  if (filters.value.global.value === null || filters.value.global?.value?.length > 4) {
    setTimeout(async () => {
      await loadProducts(currentPage.value, rows.value);
    }, 1000);
  }
}, { deep: true });

const loadProducts = async (page = 1, perPage = 15) => {
  loading.value = true;
  let url = `product?limit=${perPage}&page=${page}`;
  if (filters.value.global.value) {
    url += `&name=${filters.value.global.value}`;
  }
  const { data, error } = await getData(url) as { data: any, error: any };
  if (error && error?.value) {
    console.log(error?.value);
  } else {
    products.value = data?.value?.data || [];
    totalRecords.value = data?.value?.meta?.total;
  }

  loading.value = false;
};

await loadProducts();

const onPageChange = (event: any) => {
  currentPage.value = event.page + 1;
  rows.value = event.rows;
  loadProducts(currentPage.value, rows.value);
};

// Delete product function
const updateProduct = (productId: string): void => {
  products.value = products.value.filter(item => item.id !== productId);
};

const confirmDeleteAgent = async (prod: string) => {
  const { error } = await deleteData(`product/${prod}`) as { data: any, error: any };
  if (error && error.value) {
    showMessage('error', 'Error', `Failed to delete product`);
  } else {
    showMessage('success', 'Deleted', `Product deleted successfully!`);
    updateProduct(prod);
  }
};
</script>

<template>
  <ConfirmDialog />

  <div>
    <div>
      <p class="text-2xl font-bold">Products</p>
    </div>
    <div class="flex justify-end pr-5">
      <NuxtLink to="products/create">
        <Button label="New product" severity="warn" class="w-70" />
      </NuxtLink>
    </div>
  </div>
  <SkeletonsProductPage v-if="loading"/>
  <div v-else>
    <div class="card">
      <client-only>
        <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
          :rows="rows" :totalRecords="totalRecords" :lazy="true" :loading="loading" :filters="filters"
          :rowsPerPageOptions="[15, 25, 50]" @page="onPageChange" emptyMessage="No products found"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-end">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Search..." />
              </IconField>
            </div>
          </template>
          <template #empty>
            <div class="flex justify-center items-center text-gray-500 py-6">
              <i class="pi pi-info-circle text-xl mr-2"></i>
              No products found
            </div>
          </template>
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column header="Image">
            <template #body="slotProps">
              <img :src="slotProps?.data?.image ? slotProps?.data?.image : '/images.png'" :alt="slotProps.data.image"
                class="rounded" style="width: 64px" />
            </template>
          </Column>
          <Column field="name" header="Name" style="min-width: 16rem">
            <template #body="slotProps">
              <div>
                <div class="font-bold">{{ slotProps.data.name }}</div>
                <small>Price: {{ slotProps.data.price }}, Discount: {{ slotProps.data.discount }}TK</small>
              </div>
            </template>
          </Column>

          <Column field="Variants count" header="Variants count" style="min-width: 8rem">
            <template #body="slotProps">
              {{ slotProps.data.attributes.length }}
            </template>
          </Column>
          <Column field="inventoryStatus" header="Stock" style="min-width: 12rem">
            <template #body="slotProps">
              <Icon v-if="slotProps.data.stock_enabled" name="lsicon:check-correct-outline"
                class="text-green-500 text-lg" />
              <Icon v-else name="radix-icons:cross-circled" class="text-red-500 text-lg" />
            </template>
          </Column>

          <Column>
            <template #body="slotProps">
              <div class="flex flex-row gap-4 items-center">
                <ButtonsView :link="`products/${slotProps.data.id}`" />
                <ButtonsEdit :link="`products/${slotProps.data.id}/edit`" />
                <ButtonsDelete :item="slotProps.data" eventName="deleteProduct"
                  @deleteProduct="confirmItemDelete(slotProps.data._id, confirmDeleteAgent)" />

              </div>
            </template>
          </Column>
        </DataTable>
      </client-only>
    </div>
  </div>
</template>
