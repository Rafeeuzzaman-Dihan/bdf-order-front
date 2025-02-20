<template>
  <slot/>
</template>

<script lang="ts" setup>
import {useThemeStore} from "@/stores/themeStore";

const {isDarkMode} = useThemeStore();

onMounted(() => {
  const dom = document.documentElement.classList;
  isDarkMode ? dom.add("my-app-dark") : dom.remove("my-app-dark");
});

</script>