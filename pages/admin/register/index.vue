<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg shadow-xl p-5 rounded-2xl border bg-white">
      <SignupForm/>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignupForm from '~/components/register/SignupForm.vue';

definePageMeta({
  layout: 'blank',
  middleware: 'guest'
})
</script>
