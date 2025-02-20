<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { getData, postData } from "~/composables/useFetch";
import { showUsersRolePage } from '#components';

const users = ref([]);
const selectedUsers = ref([]);
const roles = ref([]);
const selectedRoles = ref(null);
const { showMessage } = useMessages();
const authStore = useAuthStore();
const loading = ref(false);

const fetchUsersWithRoles = async () => {
    loading.value = true; 
    try {
        const { data, error } = await getData("user/user-with-roles");
    if (error && error.value) {
        console.log("Error fetching users with roles:", error.value);
    } 
    else {
        users.value = data.value.map((user, index) => ({
            sl: index + 1,
            name: user.name,
            roles: user.roles.map(role => role.name).join(" , "),
            code: user._id
        }));
    } 
    }
    catch (err) {
    console.error('Error fetching roles:', err);
    error.value = err;
  } finally {
    loading.value = false; 
  } 
};

const fetchRoles = async () => {
    const { data, error } = await getData("role");
    if (error && error.value) {
        console.log("Error fetching roles:", error.value);
    } else {
        roles.value = data.value.map(role => ({
            name: role.name,
            id: role._id
        }));
    }
};

fetchUsersWithRoles();
fetchRoles();

const assignRole = async () => {
    if (!selectedUsers.value.length || !selectedRoles.value) {
        showMessage("error", "Error", "Please Select a User & Role");
        return;
    }

    const newRole = {
        role: selectedRoles.value.id,
        users: selectedUsers.value.map(user => user.code)
    };

    const { data, error } = await postData("role/assign", newRole);

    if (error && error.value) {
        console.log('Error assigning role:', error.value);
    } else {
        showMessage('success', 'Role Assigned', 'The given Role is assigned');

        selectedUsers.value = [];
        selectedRoles.value = null;

        fetchUsersWithRoles();
    }
};

definePageMeta({
    middleware: "auth"
});
</script>

<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Role Assign to Users</h1>
            <Button label="Assign" @click="assignRole" />
        </div>
        
        <form @submit.prevent="assignRole">
            <div class="flex space-x-4 mb-6">
                <MultiSelect v-model="selectedUsers" display="chip" :options="users" optionLabel="name" filter
                    placeholder="Select Users" :maxSelectedLabels="3" class="w-1/2" />
                <Select v-model="selectedRoles" :options="roles" filter optionLabel="name"
                    placeholder="Select a Role" class="w-1/2">
                    <template #value="slotProps">
                        <div v-if="slotProps.value">{{ slotProps.value.name }}</div>
                        <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                        <div>{{ slotProps.option.name }}</div>
                    </template>
                </Select>
            </div>
        </form>
        <SkeletonsShowUsersRolesPage v-if="loading" />
        <div v-else>
        <client-only>
        <DataTable
            :value="users"
            class="p-datatable-striped"
            paginator 
            :rows="5" 
            :rowsPerPageOptions="[5, 10, 20, 50]" 
            tableStyle="min-width: 50rem"
            >
            <Column field="sl" header="SL" style="width: 50px;"></Column>
            <Column field="name" header="User Name"></Column>
            <Column field="roles" header="Roles"></Column>
        </DataTable>
    </client-only>
    </div>
</div>
</template>
