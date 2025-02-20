<script lang="ts" setup>
const { slotProps } = defineProps(["slotProps"]);
</script>

<template>
  <div class="flex flex-col gap-1 text-lg">
    <span class="text-orange-500 font-semibold">{{
      slotProps.data.order_id
    }}</span>
    <span>{{ slotProps.data.order_date }}</span>
    <span>{{ slotProps.data.order_time }}</span>
  </div>
</template>

<style></style>
