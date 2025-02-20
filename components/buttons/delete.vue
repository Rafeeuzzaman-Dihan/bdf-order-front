<template>
  <div class="flex items-center text-[#dc2626] font-bold cursor-pointer hover:underline" @click="deleteItem">
    <Icon name="material-symbols:delete-outline-rounded" class="pr-1" />
    <span>delete</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';


const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
    default: 'delete',
  }
});


const emit = defineEmits(['deleteProduct']);


const deleteItem = () => {
  console.log(props.item)
  emit("deleteProduct", props.item._id); 
};
</script>
