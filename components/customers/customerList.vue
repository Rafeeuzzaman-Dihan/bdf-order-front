<template >
  <ConfirmDialog></ConfirmDialog>
  <div class="flex justify-between mt-5 mb-5">
      <Button label="Deselect" icon="pi pi-trash" severity="danger" outlined
          :disabled="!selectedcustomers || !selectedcustomers.length"
          @click="deselect()" 
          eventName=""/> 

    <div class="flex w-full sm:w-64">

      <FloatLabel variant="on">
        <IconField class="mb-15">
          <InputIcon class="mb-2">
            <Icon name="ic:round-search" class="text-3xl" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Search..." />
        </IconField>
      </FloatLabel>

      <button @click="requireConfirmation($event)" class="text-3xl ml-3 p-1 rounded-full flex items-center justify-center" title="filter">
        <Icon name="ic:sharp-filter-alt" class="pr-1" badge="2" />
        <h6 class="position: absolute mb-8 ml-6 text-xl text-red-500">0</h6>
      </button>
  <ConfirmPopup group="headless">
  <template #container="{ message, acceptCallback, rejectCallback }">
    <div class="rounded p-4">
      <div class="flex justify-between ">
        <p class="mt-2 mr-10 font-bold">Filter</p>
        <div class="flex items-center gap-2">
          <Button label="Reset" @click="resetFilters" size="small"></Button>
        </div>
      </div>
      <div class="flex justify-between mt-5 mb-2">
        <p class="mr-10 font-bold">Start Date</p>
        <p class="font-bold">End Date</p>
      </div>
      <div class="card flex justify-center">
        <div class="flex">
          <DatePicker class="mr-2" v-model="startDate" showIcon fluid :showOnFocus="false" inputId="start-date" placeholder="dd/mm/yy"/>
          <DatePicker v-model="endDate" showIcon fluid :showOnFocus="false" inputId="end-date" placeholder="dd/mm/yy"/>
        </div>
      </div>
    </div>
  </template>
</ConfirmPopup>
      </div>
    </div>
  <div class="card">
    <DataTable v-model:selection="selectedcustomers" :value="customers" tableStyle="min-width: 50rem" :paginator="true"
      :rows="5" :filters="filters" :rowsPerPageOptions="[5, 10, 20, 50]" 
      class="rounded-md shadow-md border border-gray-300">

     <Column selectionMode="multiple" style="width: 3rem"></Column>
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column field="phone" header="Phone" />
      <Column field="secondary_phone" header="Secondary Phone" />
      <Column field="address" header="Address" />
      <Column field="customer_note" header="Note" />
      <Column field="customer_type" header="Tag" />
      <Column field="order_number" header="Order Count" />

      <Column header="">
        <template #body="slotProps">
          <div class="flex flex-row gap-4 items-center">
            <NuxtLink :to="`customers/${slotProps.data._id}`" class="flex items-center text-zinc-400 cursor-pointer hover:underline">
              <Icon name="ic:round-remove-red-eye" class="pr-1" />
            </NuxtLink>
            <NuxtLink :to="`customers/${slotProps.data._id}/edit`" class="flex items-center text-[#F59E0B] hover:underline">
              <Icon name="material-symbols:edit-square-outline-rounded" class="pr-1" />
            </NuxtLink>
            <div label="Delete" severity="danger" outlined
              class="flex items-center text-red-500 cursor-pointer hover:underline">
              <ButtonsDelete :item="slotProps.data"
               eventName="deleteCustomer" @deleteProduct="confirmItemDelete(slotProps.data._id , confirmDeletecustomer )" />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { ButtonsDelete } from '#components';
import type { customers } from "~/interfaces/customers";


//const buttondisplay = ref();
const {showMessage} = useMessages(); 
const {confirmItemDelete} = useConfirmation(); 
const confirm = useConfirm();
const toast = useToast();

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

const resetFilters = () => {
  startDate.value = null;
  endDate.value = null;
};


const filters = reactive({
  global: { value: '', matchMode: FilterMatchMode.CONTAINS }
});

const customers = ref<customers[]>([]);
const selectedcustomers = ref<customers[]>([]);

const deselect = ()=>{
  selectedcustomers.value=[];
}

const { data, error } = await getData("customer") as { data: any, error: any };

if (data.value != null) {
  customers.value = data.value;
  console.log("data receive" + customers.value);
} else {
  console.log("No data");
}
const updateCustomer = (customer: string)=>{
  customers.value = customers.value.filter(item => item._id !== customer); 
}
const confirmDeletecustomer = async(customer: string ) => {
  const { error } = await deleteData(`customer/${customer}`) as { data: any, error: any };
      if (error && error.value) {
          showMessage('error' , 'Error',`Failed to delete `)
      }
       else {
          showMessage('success' , 'Deleted',` deleted successfully!`)
          updateCustomer(customer) ;
      }
};
const requireConfirmation = (event : any) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Save your current process?',
        accept: () => {
            toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
        },
        reject: () => {
            toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
    });
}
 
</script>

<style scoped>
.p-datatable {
  border-radius: 8px;
  overflow: hidden;
}
</style>
