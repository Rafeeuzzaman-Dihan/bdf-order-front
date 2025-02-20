<template>
  <div>
    <div class=" my-5">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl ">Couriers</h1>
        <NuxtLink to="/admin/couriers/create">
          <Button class="w-28 h-10 text-sm " label="New Courier" severity="warn"/>
        </NuxtLink>
      </div>
    </div>
    <div class="">
      <CourierList/>
    </div>
  </div>

</template>

<script setup lang="ts">
import CourierList from '~/components/couriers/CourierList.vue';

definePageMeta({
  middleware: 'auth'
});
</script>

