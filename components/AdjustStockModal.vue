<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (event: 'adjust-stock', data: { action: string | null; quantity: number | null; price: number | null }): void;
}>();

const visible = ref<boolean>(false);
const selectedAction = ref<string | null>(null);
const quantity = ref<number | null>(0);
const price = ref<number | null>(null);

const handleIncrease = () => {
    selectedAction.value = 'increase';
};

const handleDecrease = () => {
    selectedAction.value = 'decrease';
};

const saveAdjustStock = () => {
    const data = {
        action: selectedAction.value,
        quantity: quantity.value,
        price: price.value,
    };
    emit('adjust-stock', data);
    visible.value = false;

    selectedAction.value = null;
    quantity.value = 0;
    price.value = null;
};
</script>

<template>
    <div>
        <Button label="Show" @click="visible = true" v-tooltip.top="'Adjust Stock'">
            <Icon
                name="streamline:interface-setting-slider-horizontal-adjustment-adjust-controls-fader-horizontal-settings-slider" />
        </Button>
        <Dialog v-model:visible="visible" header="Adjust Stock" :style="{ width: '50rem' }"
            class="max-w-full sm:max-w-2xl">
            <span class="text-surface-500 dark:text-surface-400 block"></span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label for="action" class="font-semibold">Action<span class="text-orange-500">*</span></label>
                    <div class="flex gap-4 mt-3">
                        <Button
                            :class="selectedAction === 'increase' ? 'bg-green-500 text-white' : 'bg-white text-black'"
                            @click="handleIncrease" class="border-gray-300 flex-1">
                            <Icon name="streamline:add-1" />Increase
                        </Button>
                        <Button :class="selectedAction === 'decrease' ? 'bg-red-500 text-white' : 'bg-white text-black'"
                            @click="handleDecrease" class="border-gray-300 flex-1">
                            <Icon name="ix:minus" />Decrease
                        </Button>
                    </div>
                </div>
                <div>
                    <label for="quantity" class="font-semibold">Quantity<span class="text-orange-500">*</span></label>
                    <div class="mt-3">
                        <InputNumber name="quantity" v-model="quantity" fluid />
                    </div>
                </div>
                <div>
                    <label for="price" class="font-semibold">Price<span class="text-orange-500">*</span></label>
                    <div class="mt-3">
                        <InputNumber name="price" v-model="price" fluid />
                    </div>
                </div>
            </div>
            <div class="flex gap-2 mt-5 justify-center sm:justify-start">
                <Button type="button" label="Save" @click="saveAdjustStock" class="w-full sm:w-auto"></Button>
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"
                    class="w-full sm:w-auto"></Button>
            </div>
        </Dialog>
    </div>
</template>
z