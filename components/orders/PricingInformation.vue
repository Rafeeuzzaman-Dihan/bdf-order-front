<script lang="ts" setup>

function formatCurrency(value: Number) {
  if (value)
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "BDT",
    });
  return;
}

const {slotProps} = defineProps(['slotProps'])


</script>
<template>
  <div class="flex flex-col gap-1 text-lg">
              <span class="font-semibold"
              >Subtotal: {{
                  formatCurrency(slotProps.data.pricing.subtotal)
                }}</span
              >
    <span class="whitespace-nowrap"
    >Delivery Fee: {{
        formatCurrency(slotProps.data.pricing.delivery_fee)
      }}</span
    >
    <span>Discount: {{ slotProps.data.pricing.discount }}</span>
    <span>Grand Total: {{ slotProps.data.pricing.grand_total }}</span>
    <span>Paid: {{ slotProps.data.pricing.paid }}</span>
    <span>Due: {{ slotProps.data.pricing.due }}</span>
    <Badge class="max-w-12">{{ slotProps.data.pricing.status }}</Badge>
  </div>
</template>


<style>

</style>