<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold">{{ isEdit ? 'Edit' : 'Create' }} Product</h1>

    <div class="border-2 border-gray-300 rounded-lg my-8 p-8">
      <div class="grid mb-8 gap-4 grid-cols-1 lg:grid-cols-2">
        <div class="flex-1">
          <FileUpload name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000">
            <template #empty>
              <span>Drag and drop files here to upload.</span>
            </template>
          </FileUpload>
          <small class="">Width: 600px, Height: 600px</small>
        </div>
        <InputText v-model="productName" name="productName" type="text" placeholder="Product Name"
          class="mb-10 h-10 flex-1" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputNumber v-model="price" inputId="stacked-buttons" placeholder="Price" showButtons mode="currency" :min="0"
          currency="BDT" class="flex-1" />
        <InputNumber v-model="discount" inputId="minmax-buttons" mode="decimal" placeholder="Discount" showButtons
          class="flex-1" />
        <Select v-model="discountType" :options="discountOptions" optionLabel="name" placeholder="Discount Type"
          class="w-full" />
        <InputNumber v-model="courierWeight" inputId="minmax-buttons" mode="decimal" :min="0"
          placeholder="Courier Weight (kg)" showButtons class="flex-1" />
        <InputNumber v-model="lowStocklimit" inputId="minmax-buttons" mode="decimal" :min="0"
          placeholder="Low Stock Limit" showButtons class="flex-1" />
        <div class="flex items-center gap-2">
          <ToggleSwitch v-model="enableStock" />
          <label for="checked">Enable Stock</label>
        </div>
      </div>

      <div class="flex flex-col md:flex-row pt-8 mb-4 gap-4">
        <div class="w-full md:w-1/2">
          <div class="w-full">
            <div v-for="(delivery, index) in deliveryOptionsData" :key="index"
              class="border border-gray-300 rounded-lg p-4 md:p-6 mb-4">
              <div class="flex justify-between p-2 md:p-4">
                <button>
                  <Icon name="mdi-light:format-line-spacing" class="pr-1" />
                </button>
                <button @click="removeOption(index)" :disabled="deliveryOptionsData.length === 1">
                  <Icon name="material-symbols:delete-outline-rounded" class="pr-1" />
                </button>
              </div>

              <div class="card grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                <InputGroup>
                  <InputText v-model="delivery.option" placeholder="Delivery Option" />
                </InputGroup>
                <InputGroup>
                  <InputNumber v-model="delivery.charge" placeholder="Delivery Charge" />
                </InputGroup>
              </div>
            </div>

            <Button label="Add More Options" severity="secondary" @click="addNewOption" class="mt-4 w-full" />
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <div class="flex flex-col gap-4">
            <MultiSelect v-model="variantName" display="chip" :options="variantOptions" optionLabel="name" filter
              placeholder="Select Variants" :maxSelectedLabels="3" class="w-full" />
            <small>Choose items from available options or type your custom text and press enter.</small>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        <div class="flex flex-col gap-2">
          <label for="options">Options</label>
          <InputText v-model="option" name="option" type="text" placeholder="Options" class="flex-1/2" />
        </div>
      </div>
    </div>

    <div v-if="variantName && variantName.length > 0">
      <ProductsVariantsForm :variantName="variantName" @update-variant="updateVariantData" />
    </div>

    <div class="flex gap-4 md:gap-6 mt-6 mb-10">
      <Button @click="onSubmit" :label="isEdit ? 'Update' : 'Create'" severity="warn" raised class="w-full sm:w-auto" />
      <Button label="Cancel" severity="secondary" raised @click="navigateBack" class="w-full sm:w-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductForm } from '~/composables/useProductForm';
import type { ProductData } from '~/interfaces/productData';
import { ProductsVariantsForm } from "#components";

const props = defineProps<{ isEdit?: boolean; initialData?: ProductData; }>();
const emit = defineEmits<{ submit: [productData: any]; cancel: []; }>();


const {
  productName, 
  price, 
  discount, 
  discountType, 
  courierWeight, 
  lowStocklimit,
  enableStock, 
  deliveryOptionsData, 
  variantName, 
  option, 
  discountOptions, 
  variantOptions,
  variants,
  initializeForm, getFormData
} = useProductForm(props.initialData);

onMounted(initializeForm);

const addNewOption = () => deliveryOptionsData.value.push({ option: '', charge: null });
const removeOption = (index: number) => deliveryOptionsData.value.length > 1 && deliveryOptionsData.value.splice(index, 1);

const updateVariantData = (newVariant: any) => {
  const existingIndex = variants.value.findIndex(v => v.name === newVariant.name);
  if (existingIndex !== -1) {
    variants.value[existingIndex] = newVariant;
  } else {
    variants.value.push(newVariant);
  }
}

const onSubmit = () => {
  emit('submit', getFormData());
};
const navigateBack = () => emit('cancel');
</script>
