<script lang="ts" setup>
const menu = ref();
import { courierService } from "~/assets/service/OrderService";
const toggle = (event: any) => {
  menu.value.toggle(event);
};
const {showMessage} = useMessages() ; 
const {selectedOrder} = storeToRefs(useOrderStore());
const {fetchOrders} = useOrderStore();

const selectedStatus = ref<string>('Change Courier Vendor');

const handleStatus = async(item: any) => {
  
   const payload = {
     order_ids:selectedOrder.value.map((item: any) => item._id), 
     courier_name: item.name,
   }
    const{data, error} = await putData('order/bulk/update-courier', payload) as {data:any, error:any};
  if (error && error?.value) {
    console.error(error)
  } else {
    showMessage('success' , data.value.message , 'Bulk Action Successed')
    await fetchOrders()
    selectedOrder.value = [] ;
  }

};
</script>

<template>
  <div>
    <Button
      type="button"
      severity="warn"
      class="break-keep w-fit min-w-40"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    >
      <Icon
        name="material-symbols-light:delivery-truck-speed-rounded"
        size="30"
      />
      <h1 class="whitespace-nowrap font-semibold text-lg">
        {{ selectedStatus }}
      </h1>
    </Button>

    <TieredMenu
      ref="menu"
      popup
      :model="courierService"
      class="mt-3 w-fit flex flex-col items-center"
    >
      <template #item="{ item }">
        <Button
          @click="handleStatus(item)"
          severity="secondary"
          class="m-1 min-w-36 bg-transparent hover:bg-none border-none font-bold"
          >{{ item.name }}</Button
        >
      </template>
    </TieredMenu>
  </div>
</template>

<style></style>
