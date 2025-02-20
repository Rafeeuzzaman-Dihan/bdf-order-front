<template>
  <p class=" py-5 pl-8">
    <NuxtLink to="/admin/couriers"><span>Couriers</span></NuxtLink> > <span>View</span>
  </p>
  <div class="font-bold text-3xl pl-8 pr-8 pb-8">View Courier</div>

  <div class="lg:-ml-44">
    <div class="grid grid-cols-1  md:grid-cols-2 lg:flex text-center ">
      <Card class="shadow-md mx-auto lg:mx-auto my-auto max-w-sm lg:w-[25rem] overflow-hidden">

        <template #content>
          <div class="rounded-lg border border-slate-50 shadow-lg">
            <h1 class=" font-bold p-5">Courier Info</h1>
            <hr class="bg-black">

            <DataTable responsiveLayout="scroll" class="p-datatable-sm">
              <div class="grid grid-cols-2 gap-4">
                <div class="p-5">
                  <span>Name</span>
                  <p>{{ courier?.name }}</p>
                </div>
                <div class="p-5">
                  <span>Vendor</span>
                  <p>{{ courier?.vendor }}</p>
                </div>
              </div>

            </DataTable>

          </div>
        </template>
      </Card>
      <div v-if="courier?.vendor === 'pathao' || courier.vendor === 'steadfast'">

        <Card
          class="shadow-md mx-auto  md:-ml-6 md:w-auto  lg:mr-20 pl-5 pr-5 my-6 max-w-sm lg:w-[25rem] overflow-hidden"
          style="width: 25rem; overflow: hidden">

          <template #content>
            <h1 class="text-center"
              v-if="courier?.vendor === 'pathao' || courier.vendor === 'steadfast' ? 'hidden' : ''">Credential</h1>
            <DataTable v-if="courier?.credentials"
              :value="Object.entries(courier.credentials).map(([key, value]) => ({ key, value }))"
              responsiveLayout="scroll">
              <Column field="key" header="Key"></Column>
              <Column field="value" header="Value"></Column>
            </DataTable>


          </template>

        </Card>
      </div>
      <div v-else></div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const courier = ref<any>({})
console.log(courier)

const route = useRoute()
const routeId = route.params.id
console.log(routeId)


const viewData = async () => {
  const { data, error } = await getData(`courier/${routeId}`)
  if (error && error?.value) {
    console.log(error)
  } else {

    courier.value = data.value
    console.log(courier.value.credentials);
  }
}
onMounted(() => {
  viewData()
})

</script>
