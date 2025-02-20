<script lang="ts" setup>
    defineProps<{
        order: {
            id: string;
            date: string;
            ip: string;
            items: string;
            extraInfo?: string;
            status: string;
            source: string;
            grandTotal: number;
            total: number;
            due: number;
            address: string;
        }
    }>();
</script>

<template>
    <Card class="my-6 pb-4">
        <template #content>
            <div class="text-[1.2rem] grid gap-y-6 md:grid-cols-2 lg:grid-cols-4">
                <div class="grid gap-y-6">
                    <p>{{ order.id }}</p>
                    <p>{{ order.date }}</p>
                    <p>IP: {{ order.ip }}</p>
                </div>
                <div>
                    <p class="mb-4 font-semibold">Order Items</p>
                    <p> {{ order.items }}</p>
                </div>
                <div class="grid gap-y-6">
                    <p><span class="font-semibold">Status:</span> {{ order.status }}</p>
                    <p><span class="font-semibold">Source:</span> {{ order.source }}</p>
                    <p><span class="font-semibold">Address:</span> {{ order.address }}</p>
                </div>
                <div class="grid gap-y-6">
                    <p><span class="font-semibold">Grand Total:</span> {{ order.grandTotal }} TK</p>
                    <p><span class="font-semibold">Total:</span> {{ order.total }} TK</p>
                    <p><span class="font-semibold">Due:</span> {{ order.due }} TK</p>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
</style>

