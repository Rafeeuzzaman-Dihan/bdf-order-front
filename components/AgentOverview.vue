<template>
  <Card class="shadow-md border">
  <template #content>
      <p class="text-base">{{ agentOverview.title }}</p>
    <p class=" font-bold text-2xl">{{ agentOverview.value }}</p>
    
  </template>
</Card>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
  const props = defineProps({
    agentOverview:{
      type: Object,
      required:true
    }
  });
</script>