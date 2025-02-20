<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <nuxt-link to="/">
      <img class="mx-auto h-12 w-auto" src="https://bdfunnelbuilder.site/logo.png" alt="Workflow"/>
    </nuxt-link>
    <h2 class="text-center text-2xl font-extrabold text-gray-900 dark:text-white">
      Sign in
    </h2>
    <p class="text-center text-sm text-stone-600 max-w">
      or
      <NuxtLink to="/admin/register"
                class="font-medium text-orange-500 hover:underline focus:outline-none focus:underline transition ease-in-out duration-150">
        sign up for an account
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>