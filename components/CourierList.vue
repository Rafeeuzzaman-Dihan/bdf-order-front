<template>
    <div class="card ">
        <DataTable class="rounded-md shadow-md border-solid" :value="products" tableStyle="min-width: 50rem" paginator
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"> 
            <Column field="name" header="Name" class="hover:bg-slate-50 ">
                <template #body="slotProps">
                    <div class="flex gap-4">
                        <Checkbox inputId="ingredient1" name="pizza" value="Cheese"
                            class="custom-checkbox" />

                        <p>anything</p>
                    </div>
                    <!-- <Icon name="uil:github" style="color: black" /> -->
                </template>
            </Column>
            <Column field="code" header="Code" class="hover:bg-slate-50 ">
                <template #body="slotProps">
                    {{ slotProps.data.code }}
                    <!-- <Icon name="uil:github" style="color: black" /> -->
                </template>
            </Column>

            <Column field="actions" class="hover:bg-slate-50 ">
                <template #body="slotProps">

                    <div class="text-xl flex gap-3">
                        <NuxtLink :to="`/couriers/${slotProps.data.id}`">
                            <Icon style="color: #388507" name="lets-icons:view-fill" @click="handleCourierView" />
                        </NuxtLink>
                        <Icon style="color: #ef5b08" name="flowbite:edit-outline" />
                        <Icon style="color: #d60e08" name="material-symbols-light:delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProductService } from '/src/service/ProductService.js';
const router = useRoute()

onMounted(() => {
    ProductService.getProductsMini().then((data) => (products.value = data));
});

const handleCourierView = () => {

    console.log('btn clicked')

}
const products = ref();
const columns = [
    { field: 'code', header: 'Name' },
    { field: 'name', header: 'Vendor' },
    { field: 'price', header: 'price' },
    { field: 'shafa', header: 'shafa' }

];


</script>
<!-- <style scoped >
 /* Style for the checked state */
 .custom-checkbox input:checked + label {
   color: orange; /* Change label color when checkbox is checked */
 }

 /* Customize checkbox appearance */
 .custom-checkbox input:checked {
  accent-color: orange; /* Modern browsers support this */
 }
 </style>  -->