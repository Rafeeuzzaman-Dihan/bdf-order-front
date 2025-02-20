<script lang="ts" setup>
import {Menubar} from 'primevue';
import {useOrderStore} from "~/stores/order";

const {status} = storeToRefs(useOrderStore())
const orderButton = [
  "Show Duplicate Orders",
  "Me Mode",
  "Unassigned Orders",
];

const statusButton = [
  'All',
  'Pending',
  'Followup',
  'Cofirmed',
  'Ready To Ship',
  'Shipped',
  'Delivered',
  'Returned',
];

</script>

<template>
  <div>
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-x-6 mb-10 my-5">
      <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Orders</h2>
      <div class="card flex flex-wrap items-center gap-2">
        <Button v-for="button in orderButton" :key="button" :label="button"
                severity="secondary" variant="outlined" class="text-md"/>
        <Button label="Export" class="text-md"/>
      </div>
    </div>

    <Menubar class="overflow-x-auto rounded-lg w-full">
      <template #start>
        <div class="flex flex-none gap-x-2">
          <Button @click="status = sta.toLocaleLowerCase()" v-for="sta in statusButton" :key="sta" :label="sta"
                  severity="secondary" :class="status === sta.toLocaleLowerCase() ? 'bg-amber-500 text-white' : ''" variant="text" class="text-lg  "/>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped></style>