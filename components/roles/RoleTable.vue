<script setup lang="ts">
import { defineProps } from "vue";
import { Role } from "~/types/role";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import RoleActions from "../RoleActions.vue";



defineProps<{ roles: Role[] }>();
</script>

<template>
    <DataTable :value="roles" stripedRows responsiveLayout="scroll">
        <Column field="name" header="Name" />
        <Column field="usersCount" header="Users Count">
            <template #body="slotProps">
                <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded">
                    {{ slotProps.data.usersCount }}
                </span>
            </template>
        </Column>
        <Column field="permissionsCount" header="Permissions Count">
            <template #body="slotProps">
                <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded">
                    {{ slotProps.data.permissionsCount }}
                </span>
            </template>
        </Column>
        <Column header="">
            <template #body="slotProps">
                <RoleActions
                :role="slotProps.data" />
            </template>
        </Column>
    </DataTable>
</template>
