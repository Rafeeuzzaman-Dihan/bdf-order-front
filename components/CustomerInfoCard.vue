<script lang="ts" setup>
  const { customer } = defineProps(['customer'])
</script>

<template>
  <Card class="px-4 mb-10">
    <template #title>
      <p class="text-[1.5rem] font-bold pb-2">Customer Information</p>
    </template>
    <template #content>
      <div class="text-[1.2rem] grid lg:grid-cols-4 gap-y-[2.5rem] py-6 border-t-2">
        <div>
          <p class="font-semibold">Name</p>
          <p>{{ customer.name }}</p>
        </div>

        <div>
          <p class="font-semibold">Email</p>
          <p>{{ customer.email }}</p>
        </div>

        <div>
          <p class="font-semibold">Address</p>
          <p>{{ customer.address }}</p>
        </div>

        <div>
          <p class="font-semibold">Note</p>
          <p>{{ customer.customer_note }}</p>
        </div>

        <div>
          <p class="font-semibold">Tag</p>
          <p>{{ customer.customer_type }}</p>
        </div>

        <div>
          <p class="font-semibold">Phone</p>
          <p>{{ customer.phone }}</p>
        </div>

        <div>
          <p class="font-semibold">Secondary Phone</p>
          <p>{{ customer.secondary_phone }}</p>
        </div>
      </div>

    </template>
  </Card>

</template>

<style scoped></style>
