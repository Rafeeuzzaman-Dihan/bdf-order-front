<script lang="ts" setup>
const {selectedOrder} = storeToRefs(useOrderStore()); 
</script>

<template>
  <div class="flex gap-6 font-semibold">
         
          <OrdersBulkCourierChange  
          v-show="selectedOrder && selectedOrder.length" />

          <OrdersBulkStatusChange  
          v-show="selectedOrder && selectedOrder.length" />


          <Button
            class="flex items-center gap-2 "
            severity="secondary"
            @click=""
            v-show="selectedOrder && selectedOrder.length"
          > <Icon name="iconamoon:menu-kebab-vertical" size="28"/> <h1>Print Invoice</h1> </Button>
  </div>
</template>


<style>

</style>
