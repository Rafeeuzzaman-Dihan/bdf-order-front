<script setup lang="ts">
import { useToggleStore } from '@/stores/toggle';

const { visible } = storeToRefs(useToggleStore()); 

</script>

<template>

  <div class="card flex justify-center">
    <Drawer v-model:visible="visible">
      <common-site-bar-item />
    </Drawer>
  </div>
</template>