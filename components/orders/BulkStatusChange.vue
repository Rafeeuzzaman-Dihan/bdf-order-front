<script lang="ts" setup>
import { orderStatusService } from "~/assets/service/OrderService";
const menu = ref();
const toggle = (event: any) => {
  menu.value.toggle(event);
};
const {showMessage} = useMessages() ;
const selectedStatus = ref<string | undefined>('Change Status');
const { selectedOrder} = storeToRefs(useOrderStore());

const handleStatus = async (item: any) => {
 console.log(selectedOrder.value)
 const payload = {
     order_ids:selectedOrder.value.map((item: any) => item._id), 
     status: item.name.toLowerCase(),
   }
    const{data, error} = await putData('order/bulk/update-status', payload) as {data:any, error:any};
  if (error && error?.value) {
    console.error(error)
  } else {
    showMessage('success' , data.value.message , 'Bulk Action Successed')
    selectedOrder.value = [] ;
  }
};
</script>

<template>
  <div>
    <Button
      type="button"
      severity="success"
      class="break-keep w-fit min-w-40"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    >
      <Icon name="carbon:status-resolved" size="30"/>
      <h1 class="whitespace-nowrap font-semibold text-lg">
        {{ selectedStatus }}
      </h1>
    </Button>

    <TieredMenu
      ref="menu"
      popup
      :model="orderStatusService"
      class="mt-3 w-fit p-4 flex flex-col items-center hover:bg-none"
    >
      <template #item="{ item }">
        <div
          ref="menubar"
          @click="handleStatus(item)"
          class="flex justify-center items-center"
        >
          <Icon
            :style="`color:${item.color}`"
            :color="item.color"
            :name="`${item.icon}`"
            size="28"
          />
          <Button
            :class="`bg-transparent border-none font-semibold tracking-wider  `"
            :style="`color:${item.color}`"
            fluid
          >
            {{ item.name }}</Button
          >
        </div>
      </template>
    </TieredMenu>
  </div>
</template>

<style></style>
