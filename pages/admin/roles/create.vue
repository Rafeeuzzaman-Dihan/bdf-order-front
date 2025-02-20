<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
});

import { getData, postData } from '~/composables/useFetch';
import { usePermissions } from '~/composables/roleSelector';
const { showMessage } = useMessages();

const user = ref({
    name: '',
    role: [],
    actions: []
});
const permissions = ref([]);
const roles = ref([]);
const existingRoles = ref([]);
const error = ref(null);

const fetchRoles = async () => {
    const { data, error: fetchError } = await getData('permission') as { data: any, error: any };
    if (fetchError && fetchError.value) {
        error.value = fetchError.value;
    } else {
        roles.value = data.value;
        permissions.value = roles.value.map(item => ({
            name: item.resource,
            checked: false,
            children: item.actions.map(child => ({
                name: child,
                checked: false
            }))
        }));
    }
};

const fetchExistingRoles = async () => {
    const { data, error: fetchError } = await getData('Role') as { data: any, error: any };
    if (fetchError && fetchError.value) {
        error.value = fetchError.value;
    } else {
        existingRoles.value = data.value;
    }
};

fetchRoles();
fetchExistingRoles();

const { updateSelectedGroupPermissions, updateSelectedGroupDependsOnPermission } = usePermissions(permissions);

const createRole = async () => {
    if (!user.value.name) {
        showMessage('error', 'Error', 'Please enter a role name');
        return;
    }

    if (existingRoles.value.some(role => role.name === user.value.name)) {
        showMessage('error', 'Error', 'Role name already exists');
        return;
    }

    const permissionsToSend = permissions.value.flatMap(group => {
        const actions = group.children
            .filter(child => child.checked)
            .map(child => child.name);
        return actions.length > 0 ? [{ resource: group.name, actions }] : [];
    });

    if (permissionsToSend.length === 0) {
        showMessage('error', 'Error', 'Please select at least one permission');
        return;
    }

    const newRole = {
        name: user.value.name,
        permissions: permissionsToSend
    };

    const { data, error } = await postData("Role", newRole) as { data: any, error: any };

    if (error && error.value) {
    } else {
        showMessage('success', 'Created', `Role created successfully`);
    }

    user.value.name = '';
    permissions.value.forEach(group => {
        group.checked = false;
        group.children.forEach(child => child.checked = false);
    });
};
</script>

<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Create Role</h1>
            <span class="flex gap-2 mt-4 md:mt-0">
                <NuxtLink to="/admin/roles">
                    <Button class="ml-4" label="Cancel" severity="secondary" variant="outlined" />
                </NuxtLink>
                <Button label="Create" @click="createRole" />
            </span>
        </div>
        <form @submit.prevent="createRole">
            <div class="flex flex-col mb-4">
                <label class="text-sm font-medium">
                    Name <span class="text-red-500">*</span>
                </label>
                <InputText required id="name" v-model="user.name" class="w-full border rounded p-2" />
            </div>
        </form>

        <div v-if="error" class="text-red-500 mb-4">Error fetching roles: {{ error }}</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(group) in permissions" :key="group.name" class="permission-category border rounded p-4">
                <div class="flex items-center py-2">
                    <Checkbox v-model="group.checked" binary
                        @update:modelValue="updateSelectedGroupPermissions(group.checked, group.name)" />
                    <label class="ml-2">{{ group.name }}</label>
                </div>
                <div class="flex flex-col pl-6 border-t border-gray-300 pt-2">
                    <div v-for="(permission) in group.children" :key="permission.name" class="flex items-center mr-4">
                        <Checkbox v-model="permission.checked" binary
                            @update:modelValue="updateSelectedGroupDependsOnPermission(permission.checked, group)" />
                        <label class="ml-2">{{ permission.name }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>