<script setup lang="ts">
import { ref } from 'vue';
import { Role } from '~/types/role';
import Button from 'primevue/button';
import RoleTable from './RoleTable.vue';

const roles = ref<Role[]>([
  { id: 1, name: 'Super Admin', usersCount: 1, permissionsCount: 141 },
  { id: 2, name: 'Hasan', usersCount: 0, permissionsCount: 5 },
  { id: 3, name: 'Calling Agent', usersCount: 0, permissionsCount: 7 },
]);

const createRole = () => {
  alert('New Role action triggered!');
};
</script>



<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Roles</h1>
      <Button 
        label="New Role" 
        icon="pi pi-plus" 
        class="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded" 
        @click="createRole" 
      />
    </div>
    <RoleTable :roles="roles" />
  </div>
</template>
