<script lang="ts" setup>
const {slotProps} = defineProps(["slotProps"]);
</script>

<template>
  <div class="flex flex-col gap-1 text-lg">
    <div v-if="slotProps.data?.orderItems && slotProps.data?.orderItems?.length">
      <div v-for="(item,i) in slotProps.data?.orderItems" :key="i">
        <p class="font-bold"> {{ item?.product_name }} x {{ item?.quantity }}</p>
        <div v-if="item.attributes">
          <p>Price: {{item?.price}} .Tk</p>
          <p>discount: {{item?.discount}} .Tk</p>
          <p>total: {{ item?.total}} .Tk</p>
          <span v-for="(attr, index) in item?.attributes" :key="index">
          <span v-for="(value, key) in attr" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </span>
          <span v-if="index < item?.attributes?.length - 1">, </span>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
