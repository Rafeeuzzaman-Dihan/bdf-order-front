<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="mt-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Total Users</h2>
        <p class="text-3xl font-semibold">100</p>
      </div>
      <div class="shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Total Posts</h2>
        <p class="text-3xl font-semibold">100</p>
      </div>
      <div class="shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Total Comments</h2>
        <p class="text-3xl font-semibold">100</p>
      </div>
      <div class="shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Total Categories</h2>
        <p class="text-3xl font-semibold">100</p>
      </div>
      <div class="shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Total Tags</h2>
        <p class="text-3xl font-semibold">100</p>
      </div>
      <div class="shadow-md p-4 rounded-lg">
        <h2 class="text-lg font-semibold">Total Pages</h2>
        <p class="text-3xl font-semibold">100</p>
      </div>
    </div>
  </div>
</template>