<script lang="ts" setup>
const {slotProps} = defineProps(["slotProps"]);
</script>

<template>
  <div class="flex flex-col gap-1 text-lg">
    <div class="font-bold">
      <span>{{ slotProps.data.name }}</span>
    </div>
    <span>{{ slotProps.data.phone }}</span>
    <span>{{ slotProps.data.email }}</span>
    <span>{{ slotProps.data.address }}</span>
  </div>
</template>

<style></style>
