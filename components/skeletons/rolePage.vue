<script setup>
import { ref } from 'vue';

const skeletonRows = ref(new Array(5)); 
</script>

<template>
  <div class="card">
    <DataTable :value="skeletonRows" class="p-datatable-striped" tableStyle="min-width: 50rem">
      <Column field="name" header="Role Name">
        <template #body>
          <Skeleton width="70%" height="1.5rem" />
        </template>
      </Column>
      <Column field="permissionCount" header="Permission Count">
        <template #body>
          <Skeleton width="10%" height="1.5rem" />
        </template>
      </Column>
      <Column field="userCount" header="User Count">
        <template #body>
          <Skeleton width="10%" height="1.5rem" />
        </template>
      </Column>
      <Column header="Actions">
        <template #body>
          <Skeleton width="40%" height="1.5rem" />
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