<template>
    <button @click="handleClick" class="flex items-center text-zinc-400 font-bold cursor-pointer hover:underline">
        <Icon name="lets-icons:view-fill" class="pr-1" />
      <span>View</span>
    </button>
  </template>

<!-- <NuxtLink to="products/001" class="flex items-center text-zinc-400 font-bold cursor-pointer hover:underline">
    <Icon name="lets-icons:view-fill" class="pr-1" />
    <span>View</span>
  </NuxtLink> -->
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const {link} = defineProps(['link']); 
 
  
  const handleClick = () => {
      navigateTo(link) ;
  };
  </script>
  