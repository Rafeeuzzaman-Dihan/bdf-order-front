<template>
  <div class="w-full h-full my-5">
    <div class="">
      <div class="flex flex-wrap justify-between items-center mt-3">
        <h1 class="text-3xl font-bold">Customers</h1>
      </div>
    </div>
    <div class="flex flex-wrap justify-end gap-4 px-5 sm:px-10 my-6">
      <Button label="Import Customer" severity="secondary" raised/>
      <Button label="Export Customer" severity="secondary" raised/>
    </div>

    <div class="px-5 sm:px-8 my-6 ">
      <CustomersCustomerList/>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>