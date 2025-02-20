<template>
  <NuxtLayout>
    <Toast/>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup>
import {useAuthStore} from "~/stores/auth.ts";

const {loggedInUser} = useAuthStore();

onMounted(async () => {
  await loggedInUser()
});
</script>