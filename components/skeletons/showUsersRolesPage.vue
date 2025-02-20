<script setup>
import { ref } from 'vue';

const skeletonRows = ref(new Array(5)); 
</script>

<template>
  <div class="card">
    <DataTable :value="skeletonRows" class="p-datatable-striped" tableStyle="min-width: 50rem">
      <Column field="name" header="SL">
        <template #body>
          <Skeleton width="15%" height="1.5rem" />
        </template>
      </Column>
      <Column field="permissionCount" header="User Name">
        <template #body>
          <Skeleton width="50%" height="1.5rem" />
        </template>
      </Column>
      <Column field="userCount" header="Role Name">
        <template #body>
          <Skeleton width="100%" height="1.5rem" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>