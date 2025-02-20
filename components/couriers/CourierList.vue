<script setup lang="ts">
import {ref} from 'vue';
import DialogBox from '../common/DialogBox.vue';

const courier = ref<any>([])
let selectColumn = ref([])
const ids = ref<any>

watch(courier, (newVal) => {
  ids.value = newVal.map((cour: any) => cour._id);
}, {immediate: true});
const bulkCreate = async () => {
  const selectIds = selectColumn?.value.map((cour) => cour._id);
  const deleteIds = selectIds.length ? selectIds : ids.value;

  if (!deleteIds.length) {
    console.log("No IDs");
    return;
  }
  const payload = {courier_ids: deleteIds};
  await bulkDelete('courier/bulk-delete', payload);
  courier.value = courier.value.filter(cour => !deleteIds.includes(cour._id));
  selectColumn.value = [];
};
const deselectAll = () => {
  selectColumn.value = ref([])
}
const openDialog = ref<((id: number) => void) | null>(null)
const setOpenDialog = (dialogFnc: (id: number) => void): void => {
  openDialog.value = dialogFnc;
}

const confirmOpen = (id: number): void => {
  if (openDialog.value) {
    openDialog.value(id)
  }
}
const fetchData = async () => {
  const {data, error} = await getData('courier')
  if (error && error?.value) {
    console.log(error)
  } else {

    courier.value = data?.value
    console.log(data?.value);

  }
}

fetchData()
const handleDelete = async (id) => {
  const {data, error} = await deleteData(`courier/${id}`)
  if (error && error?.value) {
    console.log(error)
  } else {
    courier.value = courier.value.filter(item => item._id !== id);
  }
}
</script>
<template>
  <div class="card ">
    <div class="p-4">
      <DataTable class="rounded-2xl shadow-md border-solid " :value="courier" tableStyle="min-width: 50rem "
                 paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                 dataKey="_id">
        <div v-if="courier.length > 0">
          <Column v-model="selectColumn" style="width: 3rem" :exportable="false">
          </Column>
          <Column field="name" header="Name" style="min-width: 16rem">
            <template #body="slotProps">

              <div class="flex gap-4">
                <p>{{ slotProps.data.name }}</p>
              </div>
            </template>
          </Column>
          <Column field="Vendor" header="Vendor" class="ml-7">
            <template #body="slotProps">
              <h1 :class="slotProps.data.vendor === 'steadfast'
                                ? 'text-orange-600'
                                : slotProps.data.vendor === 'pathao'
                                    ? 'text-green-700'
                                    : slotProps.data.vendor === 'custom'
                                        ? 'text-purple-600'
                                        : 'text-gray-600'">
                {{ slotProps.data.vendor }}
              </h1>

            </template>
          </Column>

          <Column field="actions">
            <template #body="slotProps">

              <div class="text-xl flex gap-3 justify-end">
                <NuxtLink :to="`/admin/couriers/${slotProps.data._id}`">
                  <Icon style="color: #388507" name="lets-icons:view-fill"/>

                </NuxtLink>
                <NuxtLink :to="`/admin/couriers/${slotProps.data._id}/edit`">
                  <Icon style="color: #ef5b08" name="flowbite:edit-outline"/>
                </NuxtLink>
                <Icon class="cursor-pointer" style="color: #d60e08" name="material-symbols-light:delete"
                      @click="confirmOpen(slotProps.data._id)"/>
              </div>
            </template>
          </Column>
        </div>
        <div v-else>
          <div class="text-center mr-16">
            <Icon class="text-5xl" name="oui:cross-in-circle-filled" style="color: #e7dada"/>
            <h1 class="font-bold ">No Couriers</h1>
          </div>
        </div>
      </DataTable>
      <div class="card flex justify-center mx-auto  ">
        <DialogBox @registerOpenDialog="setOpenDialog" :onDelete="handleDelete"/>

      </div>
    </div>
  </div>
</template>
