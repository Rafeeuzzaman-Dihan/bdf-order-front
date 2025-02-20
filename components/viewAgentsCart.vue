<template>
    <Card class="shadow-md border">
    <template #content>
        <p class="text-base">{{ agent.title }}</p>
      <h2 class=" font-bold text-3xl brightness-110">{{ agent.totalOrders }}</h2>
      <p class="text-base">{{agent.description }} {{ agent.totalSales }}</p>
    </template>
</Card>
  </template>
  <script setup>
    const props = defineProps({
      agent:{
        type: Object,
        required:true 
      }
    });
  </script>
<style  scoped>
</style>