<template>
  <div class="card">
    <OrderNavbar/>
    <DataTable :value="skeletons" class="p-datatable-striped mt-10">
      <!-- Order Column -->
      <Column >
        <template #body>
          <div class="flex flex-col gap-6">
            <Skeleton width="120px" height="20px"></Skeleton>
            <Skeleton width="150px" height="16px"></Skeleton>
          </div>
        </template>
      </Column>

      <!-- Customer Column -->
      <Column >
        <template #body>
          <div class="flex flex-col gap-6">
            <Skeleton width="100px" height="20px"></Skeleton>
            <Skeleton width="120px" height="16px"></Skeleton>
            <Skeleton width="160px" height="14px"></Skeleton>
            <Skeleton width="120px" height="14px"></Skeleton>
          </div>
        </template>
      </Column>

      <!-- Product Column -->
      <Column >
        <template #body>
          <div class="flex flex-col gap-6">
            <Skeleton width="140px" height="20px"></Skeleton>
            <Skeleton width="100px" height="16px"></Skeleton>
          </div>
        </template>
      </Column>

      <!-- Pricing Column -->
      <Column >
        <template #body>
          <div class="flex flex-col gap-6">
            <Skeleton width="100px" height="20px"></Skeleton>
            <Skeleton width="80px" height="16px"></Skeleton>
            <Skeleton width="60px" height="14px"></Skeleton>
            <Skeleton width="50px" height="14px"></Skeleton>
          </div>
        </template>
      </Column>

      <!-- Status Column -->
      <Column>
        <template #body>
          <div class="flex gap-2">
            <Skeleton width="60px" height="30px"></Skeleton>
            <Skeleton width="80px" height="30px"></Skeleton>
          </div>
        </template>
      </Column>

      <!-- Actions Column -->
      <Column >
        <template #body>
          <div class="flex gap-2">
            <Skeleton shape="circle" width="40px" height="40px"></Skeleton>
            <Skeleton shape="circle" width="40px" height="40px"></Skeleton>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OrderNavbar from "../OrderNavbar.vue";
console.log('skelentons')
const skeletons = ref(new Array(5)); 
</script>

<style scoped>
.p-datatable-striped .p-datatable-tbody tr:nth-child(odd) {
  background-color: #f8f9fa; 
}
</style>