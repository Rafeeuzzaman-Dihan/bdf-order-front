<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

import { getData } from '~/composables/useFetch';
import ViewButton from '~/components/buttons/view.vue';
import { SkeletonsRolePage } from '#components';

const roles = ref([]);
const error = ref(null);
const loading = ref(false);

const fetchRoles = async () => {
  loading.value = true; 
  try {
    const { data, error: fetchError } = await getData('role') as { data: any, error: any };
    
    if (fetchError && fetchError.value) {
      console.log(fetchError.value);
      error.value = fetchError.value;
    } else {
      roles.value = data.value.map(role => ({
        name: role.name,
        permissionCount: role.permissions.reduce((count, perm) => count + perm.actions.length, 0),
        userCount: role.users ? role.users.length : 0,
        id: role.id
      }));
    }
  } catch (err) {
    console.error('Error fetching roles:', err);
    error.value = err;
  } finally {
    loading.value = false; 
  }
};

fetchRoles();
</script>

<template>
  <div class="container mx-auto my-5">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Roles List</h1>
      <NuxtLink to="/admin/roles/create">
        <Button label="Create Role" />
      </NuxtLink>
    </div>

    <div v-if="error" class="p-4 mb-4 text-red-500 bg-red-100 rounded-lg">
      Error loading roles: {{ error.message }}
    </div>

    <SkeletonsRolePage v-if="loading" />

    <div v-else>
      <client-only>
        <DataTable 
          :value="roles" 
          class="p-datatable-striped" 
          paginator 
          :rows="5" 
          :rowsPerPageOptions="[5, 10, 20, 50]" 
          tableStyle="min-width: 50rem"
        >
          <Column field="name" header="Role Name" />
          <Column field="permissionCount" header="Permission Count" />
          <Column field="userCount" header="User Count" />
          <Column header="Actions">
            <template #body="slotProps">
              <ViewButton :link="`/admin/roles/${slotProps.data.id}`" />
            </template>
          </Column>
        </DataTable>
      </client-only>
    </div>
  </div>
</template>