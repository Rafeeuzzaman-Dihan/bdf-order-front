<template>
  <div>
    <CourierCard :datas="dataByid" />
  </div>
</template>
<script setup lang="ts">
import CourierCard from '~/components/couriers/CourierCard.vue';
import { useRoute } from 'vue-router';
const dataByid = ref<any>(null);
const route = useRoute()
const routeId = route.params.id
console.log(routeId)

const getDatabyId = async (id: string | number) => {
  const { data, error } = await getData(`courier/${routeId}`);

  if (error?.value) {
    console.log(error.value);
  } else {
    dataByid.value = data.value;
    console.log(dataByid.value);
  }
};
getDatabyId()

</script>
