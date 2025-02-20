<template>
  <div>
    <CourierCard :datas="[]"/>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import CourierCard from '~/components/couriers/CourierCard.vue';

definePageMeta({
  middleware: 'auth'
});

const route = useRoute()
console.log(route.name)
</script>
