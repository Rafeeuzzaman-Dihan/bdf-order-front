<script setup lang="ts">
import {FilterMatchMode} from "@primevue/core/api";
import {OrdersFilterModal} from "#components";
import {ref} from "vue";
import {useOrderStore} from "~/stores/order";

definePageMeta({
  middleware: 'auth'
});

const {totalRecords, orders, selectedOrder, state} = storeToRefs(useOrderStore());
const {fetchOrders} = useOrderStore()

const dt = ref();
const filters = ref<any>({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const rows = ref(15);
const currentPage = ref(1);
const loading = ref(false);

watch(() => filters.value, async () => {
  if (filters.value.global.value === null || filters.value.global?.value?.length > 4) {
    setTimeout(async () => {
      await fetchOrders(rows.value, currentPage.value, filters);
    }, 1000);
  }
}, {deep: true});

await fetchOrders(rows.value, currentPage.value);

const onPageChange = async (event: any) => {
  currentPage.value = event.page + 1;
  rows.value = event.rows;
  await fetchOrders(rows.value, currentPage.value);
};

function exportCSV() {
  dt.value.exportCSV();
}
</script>

<template>
  <ConfirmDialog/>
  <SkeletonsOrderPage v-if="state"/>
  <div v-else class="flex flex-col gap-5">
    <OrderNavbar/>
    <div class="">
      <DataTable
          ref="dt"
          v-model:selection="selectedOrder"
          :value="orders"
          dataKey="id"
          :paginator="true"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          :rows="rows"
          :totalRecords="totalRecords"
          :lazy="true"
          :loading="loading"
          :filters="filters"
          :rowsPerPageOptions="[15, 100, 200, 300, 500]"
          @page="onPageChange"
          emptyMessage="No products found"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <OrdersBulkActions/>
            <div class="flex gap-4">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search"/>
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Search..."/>
              </IconField>
              <OrdersFilterModal/>
            </div>
          </div>

        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="order_id" header="Order" sortable style="min-width: 12rem">
          <template #body="slotProps">
            <OrdersOrderInformation :slotProps="slotProps"/>
          </template>
        </Column>
        <Column field="name" header="Customer" sortable style="min-width: 16rem">
          <template #body="slotProps">
            <OrdersCustomerInformation :slotProps="slotProps"/>
          </template>
        </Column>
        <Column field="product" header="Product" sortable style="min-width: 12rem">
          <template #body="slotProps">
            <OrdersProductInformation :slotProps="slotProps"/>
          </template>
        </Column>
        <Column style="min-width: 16rem">
          <template #body="slotProps">
            <div class="flex gap-6 items-center">
              <OrdersSelectCourier :data="slotProps.data"/>
              <OrdersSelectPendingStatus :data="slotProps.data"/>
              <OrdersSelectAgents/>
              <OrdersPrintInvoice :values="slotProps?.data"/>
              <OrdersReceivePaidModal/>
              <OrdersCopyInfomation :values="slotProps.data"/>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
