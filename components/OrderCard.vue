<script lang="ts" setup>
    defineProps<{
        order: {
            title: string; 
            count: number;
        } 
    }>();
</script>

<template>
    <Card class="px-4">
        <template #title>{{ order.title }}</template>
        <template #content>
            <p class="mt-6 text-4xl font-bold">
                {{ order.count }}
            </p>
        </template>
    </Card>
</template>
  
<style scoped>
</style>
