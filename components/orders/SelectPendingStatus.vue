<script lang="ts" setup>
import {useOrderStore} from "~/stores/order";

const menu = ref();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const {fetchOrders} = useOrderStore()
const toggle = (event: any) => {
  menu.value.toggle(event);
};

const status = [
  {name: "Pending", value: "pending", color: "red", icon: "material-symbols:pending-actions"},
  {name: "Followup", value: "followup", color: "blue", icon: "mynaui:brightness-high-solid"},
  {
    name: "Confirmed",
    value: "confirmed",
    color: "green",
    icon: "line-md:circle-filled-to-confirm-circle-filled-transition"
  },
  {
    name: "Ready to Ship",
    value: "ready to ship",
    color: "purple",
    icon: "material-symbols-light:delivery-truck-speed-rounded"
  },
  {name: "Shipped", value: "shipped", color: "orange", icon: "f7:shippingbox-fill"},
  {name: "Delivered", value: "delivered", color: "green", icon: "hugeicons:package-delivered"},
  {name: "Returned", value: "returned", color: "red", icon: "ic:outline-keyboard-return"},
]

const bgColorGenerator = computed(() => {
  const status = props.data.status.toLowerCase();
  return status === "pending" ? {color: "background-color: #ff4d4f", icon: "material-symbols:pending-actions"} :
      status === "followup" ? {color: "background-color: #1890ff", icon: "mynaui:brightness-high-solid"} :
          status === "confirmed" ? {
                color: "background-color: #52c41a",
                icon: "line-md:circle-filled-to-confirm-circle-filled-transition"
              } :
              status === "ready to ship" ? {
                    color: "background-color: #722ed1",
                    icon: "material-symbols-light:delivery-truck-speed-rounded"
                  } :
                  status === "shipped" ? {color: "background-color: #fa8c16", icon: "f7:shippingbox-fill"} :
                      status === "delivered" ? {
                            color: "background-color: #52c41a",
                            icon: "hugeicons:package-delivered"
                          } :
                          status === "returned" ? {
                            color: "background-color: #ff4d4f",
                            icon: "ic:outline-keyboard-return"
                          } : "background-color: #000000";
});

const handleStatus = async (item: any) => {
  const {data, error} = await putData(`order/${props.data.id}`, {status: item.value}) as {
    data: any,
    error: any
  }
  if (error && error?.value) {
    console.log(error?.value);
  } else {
    props.data.status = item.name;
    await fetchOrders()
  }
};
</script>

<template>
  <div>
    <Button
        type="button"
        :style="bgColorGenerator.color"
        class="break-keep w-fit min-w-40 border-none"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_tmenu"
    >
      <Icon :name="bgColorGenerator.icon" size="30"/>
      <h1 class="whitespace-nowrap font-semibold text-lg">
        {{ data.status }}
      </h1>

    </Button>

    <TieredMenu
        ref="menu"
        popup
        :model="status"
        class="mt-3 w-fit p-4 flex flex-col items-center hover:bg-none"
    >
      <template #item="{ item }">
        <div
            ref="menubar"
            @click="handleStatus(item)"
            class="flex justify-center items-center"
        >
          <Button
              :class="`bg-transparent border-none font-semibold tracking-wider  `"
              :style="`color:${item.color}`"
              fluid
          >
            <Icon :name="item.icon"></Icon>
            {{ item.name }}
          </Button
          >
        </div>
      </template>
    </TieredMenu>
  </div>
</template>

<style></style>
