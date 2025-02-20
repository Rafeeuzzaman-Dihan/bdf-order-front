<script setup lang="ts">
import { defineProps } from "vue";
import { Role } from "~/types/role";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import { Icon } from "@iconify/vue";

defineProps<{ role: Role }>();
const router = useRouter();

const viewRole = (id: number) => {
    router.push(`/roles/${id}`);
};

const editRole = (id: number) => {
    router.push(`/roles/edit/${id}`);
};
</script>

<template>
    <div class="flex gap-2">
        <!-- View Button -->
        <Button class="p-button-text p-button-secondary flex items-center gap-1" @click="viewRole(role.id)">
            <Icon icon="mdi:eye" class="text-gray-500" />
            <span>View</span>
        </Button>

        <!-- Edit Button (Hidden for Super Admin) -->
        <template v-if="role.name !== 'Super Admin'">
            <Button class="p-button-text p-button-warning flex items-center gap-1" @click="editRole(role.id)">
                <Icon icon="mdi:pencil" class="text-orange-500" />
                <span>Edit</span>
            </Button>
        </template>
    </div>
</template>


