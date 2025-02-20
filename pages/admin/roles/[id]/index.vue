<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
});

import { getData, putData } from '~/composables/useFetch';
import { usePermissions } from '~/composables/roleSelector';
import { useConfirmation } from '~/composables/confirmation';
import { deleteItem } from '~/composables/deleteItem';

const { showMessage } = useMessages();
const { confirmDelete } = useConfirmation();
const { deletebyId } = deleteItem();
const route = useRoute();
const roleId = route.params.id;
const role = ref(null);
const permissions = ref([]);
const error = ref(null);
const editAble = ref<boolean>(false);

const fetchRoleDetails = async () => {
    const { data, error: fetchError } = await getData(`role/${roleId}`) as { data: any, error: any };

    if (fetchError && fetchError.value) {
        console.log(fetchError.value);
        error.value = fetchError.value;
    } else {
        role.value = data.value;
        fetchPermissions();
    }
};

const fetchPermissions = async () => {
    const { data, error: fetchError } = await getData('permission') as { data: any, error: any };

    if (fetchError && fetchError.value) {
        console.log(fetchError.value);
        error.value = fetchError.value;
    } else {
        permissions.value = data.value.map(item => {
            const isGroupChecked = role.value.permissions.some(rolePerm => rolePerm.resource === item.resource);
            return {
                name: item.resource,
                checked: isGroupChecked,
                children: item.actions.map(child => {
                    return {
                        name: child,
                        checked: role.value.permissions.some(rolePerm =>
                            rolePerm.resource === item.resource && rolePerm.actions.includes(child)
                        )
                    };
                })
            };
        });
    }
};

fetchRoleDetails();

const { updateSelectedGroupPermissions, updateSelectedGroupDependsOnPermission } = usePermissions(permissions);

const saveChanges = async () => {
    const updatedPermissions = permissions.value.flatMap(group => {
        return group.checked ? [{
            resource: group.name,
            actions: group.children.filter(child => child.checked).map(child => child.name)
        }] : [];
    });

    const updatedRole = {
        name: role.value.name,
        permissions: updatedPermissions
    };

    const { data, error } = await putData(`role/${roleId}`, updatedRole) as { data: any, error: any };

    if (error && error.value) {
        showMessage("error", "Error", "Failed to update role");
    } else {
        showMessage("success", "Success", "Role updated successfully!"); 
    }
};
</script>

<template>
    <div>
        <ConfirmDialog />
        <div class="container mx-auto p-6">
            <div class="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 class="text-3xl font-bold">{{ editAble ? 'Edit Role' : 'View Role' }}</h1>
                <span class="flex gap-2 mt-4 md:mt-6">
                    <NuxtLink to="/admin/roles">
                        <Button label="Back" severity="secondary" variant="outlined" />
                    </NuxtLink>
                    <Button label="Edit" @click="editAble = !editAble" />
                    <Button @click="confirmDelete(route.params.id, 'role', deletebyId)" label="Delete"
                        severity="danger" />
                    <Button @click="saveChanges" label="Save changes" severity="warn" :disabled="!editAble" />
                </span>
            </div>

            <div v-if="error" class="text-red-500 mb-4">Error fetching role: {{ error }}</div>

            <div v-if="role">
                <form>
                    <div class="flex flex-col mb-4">
                        <label class="text-sm font-medium">
                            Name
                        </label>
                        <InputText v-model="role.name" class="w-full border rounded p-2" :disabled="!editAble" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div v-for="(group) in permissions" :key="group.name"
                            class="permission-category border rounded p-4">
                            <div class="flex items-center py-2">
                                <Checkbox v-model="group.checked" binary
                                    @update:modelValue="updateSelectedGroupPermissions(group.checked, group.name)"
                                    :disabled="!editAble" />
                                <label class="ml-2">{{ group.name }}</label>
                            </div>
                            <div class="flex flex-col pl-6 border-t border-gray-300 pt-2">
                                <div v-for="(action) in group.children" :key="action.name"
                                    class="flex items-center mr-4">
                                    <Checkbox v-model="action.checked" binary
                                        @update:modelValue="updateSelectedGroupDependsOnPermission(action.checked, group)"
                                        :disabled="!editAble" />
                                    <label class="ml-2">{{ action.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>