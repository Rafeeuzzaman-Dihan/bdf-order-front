<script setup lang="ts">

import { ref, computed } from 'vue'

const props = defineProps({
    variantName: {
        type: Object as any,
        required: true,
        default: {}
    }
})

const emit = defineEmits(['update-variant']);

const variantPrice = ref<number | null>(null);
const variantCourierWeight = ref<number | null>(null);
const variantChecked = ref(false);
const variantDiscount = ref<number | null>(null);
const variantLowStocklimit = ref<number | null>(null);
const variantOption = ref('');
const variantDiscountType = ref<{ name: string; value: string } | null>(null);
const variantEnableStock = ref<boolean>(false);
const deliveryOption = ref('');
const deliveryCharge = ref<number | null>(null);
const deliveryOptions = ref<Array<{ option: string; charge: number | null }>>([]);

const updateDeliveryOptions = () => {
    if (deliveryOption.value && deliveryCharge.value !== null) {
        deliveryOptions.value.push({
            option: deliveryOption.value,
            charge: deliveryCharge.value,
        });
    }
};
watch([deliveryOption, deliveryCharge], updateDeliveryOptions);

const variantDiscountOptions = [
    { name: 'Percent', value: 'percentage' },
    { name: 'Fixed', value: 'flat' },
];

const formData = computed(() => ({
    name: props.variantName[0].value,
    attributes: props.variantName[0],
    price: variantPrice.value,
    discount: variantDiscount.value,
    discount_type: variantDiscountType.value?.value || 'percentage',
    discount_end: Date.now(),
    stock_enabled: variantEnableStock.value,
    low_stck_limit: variantLowStocklimit.value,
    courier_weight: variantCourierWeight.value,
    delivery_charge: deliveryOptions.value,
}));


watch(formData, (newData) => {
    emit('update-variant', newData);
}, { deep: true });

const variantDeliveryOptionsData = ref<{ option: string; charge: number | null }[]>([{ option: '', charge: null }]);
const addNewOption = () => variantDeliveryOptionsData.value.push({ option: '', charge: null });
const removeOption = (index: number) => variantDeliveryOptionsData.value.length > 1 && variantDeliveryOptionsData.value.splice(index, 1);


</script>



<template>
    <div>
        <div class="border-2 border-gray-300 rounded-lg p-4">
            <h6 class="font-bold text-xl mb-4">Variants</h6>
            <div class="border border-gray-300 rounded-lg p-4">

                <div class="p-2 border-b-2 flex justify-end">
                    <button>
                        <Icon name="material-symbols:delete-outline-rounded" class="pr-1" />
                    </button>
                </div>

                <div class="p-0 grid grid-cols-1 lg:grid-cols-2">
                    <!-- Left Section: Image Upload and Delivery Options -->
                    <div class="flex-1 p-4">
                        <div class="flex flex-col">
                            <!-- File Upload -->
                            <div class="border border-dashed border-gray-400 rounded-lg p-4 text-center mb-4">
                                <FileUpload name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000">
                                    <template #empty>
                                        <span>Drag and drop files here to upload.</span>
                                    </template>
                                </FileUpload>
                                <small>Width: 600px, Height: 600px</small>
                            </div>
                            <!-- Delivery Option and Charge -->
                            <div v-for="(delivery, index) in variantDeliveryOptionsData" :key="index" 
                                class="border border-gray-300 rounded-lg p-4 md:p-6 mb-4">
                                <div class="flex justify-between p-2 md:p-4">
                                    <button>
                                        <Icon name="mdi-light:format-line-spacing" class="pr-1" />
                                    </button>
                                    <button @click="removeOption(index)">
                                        <Icon name="material-symbols:delete-outline-rounded" class="pr-1" />
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                                    <InputGroup>
                                        <InputText v-model="delivery.option" placeholder="Delivery Option" />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputNumber v-model="delivery.charge" placeholder="Delivery Charge" />
                                    </InputGroup>
                                </div>
                            </div>
                            <Button label="Add More Options" severity="secondary" @click="addNewOption" class="mt-4" />
                        </div>
                    </div>

                    <!-- Right Section: Variant Inputs -->
                    <div class="flex-1 p-4">
                        <div class="flex flex-col gap-4">
                            <!-- Variant Name Inputs -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div v-for="variant in props.variantName" :key="variant.name" class="w-full">
                                    <input type="text" v-model="variant.value" :placeholder="variant?.name"
                                        class="border border-gray-300 rounded-lg p-2 w-full" />
                                </div>
                            </div>
                            <!-- Variant Price and Other Inputs -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                <div class="flex flex-col gap-4">
                                    <InputNumber v-model="variantPrice" inputId="stacked-buttons" placeholder="Price"
                                        showButtons mode="currency" :min="0" currency="BDT" />
                                    <InputNumber v-model="variantCourierWeight" inputId="minmax-buttons" mode="decimal"
                                        :min="0" placeholder="Courier Weight (kg)" showButtons />
                                    <div class="flex gap-1 items-center">
                                        <ToggleSwitch v-model="variantChecked" />
                                        <p>Active</p>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-4">
                                    <InputNumber v-model="variantDiscount" inputId="minmax-buttons" mode="decimal"
                                        placeholder="Discount" showButtons />
                                    <InputNumber v-model="variantLowStocklimit" inputId="minmax-buttons" mode="decimal"
                                        :min="0" placeholder="Low Stock Limit" showButtons />
                                    <div class="flex flex-col gap-1">
                                        <span>
                                            <p>Option</p>
                                        </span>
                                        <InputText v-model="variantOption" name="option" type="text"
                                            placeholder="Options" />
                                    </div>
                                </div>

                                <div class="flex flex-col gap-4">
                                    <Select v-model="variantDiscountType" :options="variantDiscountOptions"
                                        optionLabel="name" placeholder="Discount Type" class="w-full" />
                                    <div class="flex items-center gap-2">
                                        <ToggleSwitch v-model="variantEnableStock" />
                                        <label for="checked">Enable Stock</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>
