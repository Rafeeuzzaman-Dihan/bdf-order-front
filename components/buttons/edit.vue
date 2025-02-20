<template>
    <button @click="handleClick" class="flex items-center font-bold text-[#F59E0B] hover:underline">
      <Icon name="material-symbols:edit-square-outline-rounded" class="pr-1" />
      <span>Edit</span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const {link} = defineProps(['link']); 
 
  
  const handleClick = () => {
      navigateTo(link) ;
  };
  </script>
  