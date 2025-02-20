<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
});

const orderData = ref([
  {title: "Total Orders", count: 2},
  {title: "Processing Orders", count: 1},
  {title: "Completed Orders", count: 1},
  {title: "Canceled Orders", count: 0}
]);

const ordersInfo = ref([
  {
    id: '250126002',
    date: '26-01-2025 02:02 PM',
    ip: '113.212.109.136',
    items: 'Product2',
    extraInfo: 'Brand: Easy',
    status: 'Payment Received',
    source: 'Landing Page',
    grandTotal: 110,
    total: 90,
    due: 0,
    address: 'Merul Badda, Dhaka'
  },
  {
    id: '250126001',
    date: '26-01-2025 01:57 PM',
    ip: '113.212.109.136',
    items: 'Product1',
    extraInfo: 'Material: iron',
    status: 'Pending',
    source: 'Landing Page',
    grandTotal: 8,
    total: 7,
    due: 0,
    address: 'Merul Badda, Dhaka'
  }
]);

const customer = ref<any>({});

const route = useRoute()

const loadCustomer = async () => {
  const {data, error} = await getData(`customer/${route.params.id}`) as { data: any, error: any }
  if (error && error.value) {
    console.log(error.value);
  } else {
    customer.value = data.value
  }
}

await loadCustomer()

</script>


<template>
  <div>
    <h1 class="text-[1rem] lg:text-[2rem] font-bold mb-6 mt-6">View Customer</h1>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div v-for="order in orderData">
        <OrderCard :order="order"/>
      </div>
    </div>

    <div v-if="customer">
      <CustomerInfoCard :customer="customer"/>
    </div>

    <Card class="px-4 mb-10">
      <template #title>
        <p class="text-[1.5rem] font-bold border-b-2 pb-4">Order Information</p>
      </template>
      <template #content>
        <div v-for="order in ordersInfo">
          <OrderInfoCard :order="order"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>