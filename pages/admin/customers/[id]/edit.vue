<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const route = useRoute();
const {showMessage} = useMessages();
const customer = ref<any>({});
const routeId = route.params.id

const loadCustomer = async () => {
  const {data, error} = await getData(`customer/${route.params.id}`) as { data: any, error: any }
  if (error && error.value) {
    console.log(error.value);
  } else {
    customer.value = data.value
  }
}

await loadCustomer()

const saveChanges = async () => {
  const {data, error} = await putData(`customer/${route.params.id}`, customer.value) as { data: any, error: any };
  console.log(customer.value)
  if (error && error.value) {
    showMessage("error", "Error", "Failed to update customer");
  } else {
    showMessage("success", "Success", "Customer updated successfully!");
  }
  
};

const deleteCustomer = async () =>{
  const {data} = await deleteData(`customer/${routeId}`) as { data: any, error: any }
  navigateTo('/admin/customers')
}
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Edit Customer</h1>
      <Button @click="deleteCustomer" label="Delete" severity="danger"/>
    </div>

    <form>
      <div class="flex flex-col md:flex-row mb-4">
        <div class="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
          <label class="text-sm font-medium">
            Name <span class="text-red-500">*</span>
          </label>
          <InputText required id="name" v-model="customer.name" class="w-full border rounded p-2"/>
        </div>
        <div class="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
          <label class="text-sm font-medium">
            Email
          </label>
          <InputText id="email" v-model="customer.email" class="w-full border rounded p-2"/>
        </div>
      </div>

      <div class="flex flex-col md:flex-row mb-4">
        <div class="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
          <label class="text-sm font-medium">
            Phone
          </label>
          <InputText id="phone" v-model="customer.phone" class="w-full border rounded p-2" disabled
                     placeholder="01648474774"/>
        </div>
        <div class="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
          <label class="text-sm font-medium">
            Address <span class="text-red-500">*</span>
          </label>
          <InputText required id="address" v-model="customer.address" class="w-full border rounded p-2"/>
        </div>
      </div>

      <div class="flex flex-col md:flex-row mb-4">
        <div class="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
          <label class="text-sm font-medium">
            Secondary Phone
          </label>
          <InputText id="secondaryPhone" v-model="customer.secondary_phone" class="w-full border rounded p-2"/>
        </div>
        <div class="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
          <label class="text-sm font-medium">
            Note
          </label>
          <Textarea id="note" v-model="customer.customer_note" class="w-full border rounded p-2" rows="2">
          </Textarea>
        </div>
      </div>

      <div class="mb-4">
        <span class="text-sm font-medium">Tag</span>
        <div class="mb-4">
          <div class="flex gap-4 mt-4">
            <div class="flex items-center">
              <input type="radio" id="new" v-model="customer.customer_type" value="NEW" class="hidden peer"/>
              <label for="new"
                     class="px-8 cursor-pointer flex items-center justify-center h-10 w-10 rounded-lg border-2 border-gray-300 peer-checked:bg-blue-500 peer-checked:text-white hover:bg-blue-400">
                NEW
              </label>
            </div>

            <div class="flex items-center">
              <input type="radio" id="regular" v-model="customer.customer_type" value="REGULAR" class="hidden peer"/>
              <label for="regular"
                     class="px-12 cursor-pointer flex items-center justify-center h-10 w-10 rounded-lg border-2 border-gray-300 peer-checked:bg-green-500 peer-checked:text-white hover:bg-green-400">
                REGULAR
              </label>
            </div>

            <div class="flex items-center">
              <input type="radio" id="vip" v-model="customer.customer_type" value="VIP" class="hidden peer"/>
              <label for="vip"
                     class="px-6 cursor-pointer flex items-center justify-center h-10 w-10 rounded-lg border-2 border-gray-300 peer-checked:bg-purple-500 peer-checked:text-white hover:bg-purple-400">
                VIP
              </label>
            </div>

            <div class="flex items-center">
              <input type="radio" id="fraud" v-model="customer.customer_type" value="FRAUD" class="hidden peer"/>
              <label for="fraud"
                     class="px-10 cursor-pointer flex items-center justify-center h-10 w-10 rounded-lg border-2 border-gray-300 peer-checked:bg-red-500 peer-checked:text-white hover:bg-red-400">
                FRAUD
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <span class="flex gap-2">
          <NuxtLink to="/admin/customers"><Button @click="saveChanges" label="Save changes" severity="warn" type="submit"/></NuxtLink>
          
          <Button label="Cancel" severity="contrast" variant="outlined"/>
        </span>
      </div>
    </form>
  </div>
</template>