<template>
  <div>
    <div class="flex items-center justify-center">
      <div>
        <div class="flex flex-wrap items-center gap-2 text-sm">
          <NuxtLink to="/admin/agents" class="cursor-pointer hover:text-zinc-500">Agents</NuxtLink>
          <p> > View Agent </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl p-4">
          <viewAgentsCart
              v-for="(agent, index) in agents"
              :key="index"
              :agent="agent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
});

const route = useRoute()
const id = route.params.id

const agents = [
  {title: "Total Orders", totalOrders: 5, description: "Total Sales Amount: ", totalSales: 45},
  {title: "Pending Orders", totalOrders: 3, description: "Pending Sales Amount: ", totalSales: 3200},
  {title: "Confirmed Orders", totalOrders: 8, description: "Confirmed Sales Amount: ", totalSales: 7600},
  {title: "Canceled Orders", totalOrders: 2, description: "Canceled Sales Amount: ", totalSales: 1500},
  {title: "Ready To Ship Orders", totalOrders: 10, description: "Ready To Ship Sales Amount: ", totalSales: 9500},
  {title: "Delivered Orders", totalOrders: 1, description: "Delivered Sales Amount: ", totalSales: 500},
  {title: "Active Time", totalOrders: 6,},
  {title: "Inactive Time", totalOrders: 4,},
  {title: "Total Discount", totalOrders: 7,},
  {title: "Created Orders", totalOrders: 9,},
  {title: "Total Call Count", totalOrders: 2,},
  {title: "Total Call Duration", totalOrders: 11, description: "Average Call Duration: ", totalSales: "10"},
  {title: "Order Handling Average Duration", totalOrders: 3,},
];
</script>

<style>

</style>