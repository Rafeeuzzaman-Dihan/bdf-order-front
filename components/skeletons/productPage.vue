<template>
    <div class="card">
  
      <DataTable :value="skeletons" class="p-datatable-striped mt-10">
        <!-- Product Image Column -->
        <Column>
          <template #body>
            <Skeleton shape="circle" width="60px" height="60px"></Skeleton>
          </template>
        </Column>
  
        <!-- Product Name Column -->
        <Column>
          <template #body>
            <Skeleton width="140px" height="20px"></Skeleton>
          </template>
        </Column>
  
        <!-- Variant Count Column -->
        <Column>
          <template #body>
            <Skeleton width="100px" height="16px"></Skeleton>
          </template>
        </Column>
  
        <!-- Stock Column -->
        <Column>
          <template #body>
            <Skeleton width="80px" height="16px"></Skeleton>
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";

  
  const skeletons = ref(new Array(5));
  </script>
  
  <style scoped>
  .p-datatable-striped .p-datatable-tbody tr:nth-child(odd) {
    background-color: #f8f9fa;
  }
  </style>
