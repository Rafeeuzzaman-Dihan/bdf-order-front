<template>
  <div class="flex flex-col">
    <Navbar/>
    <div class="flex flex-grow">
      <Siderbar/>
      <div class="flex-grow grid grid-cols-5">
        <div v-if="!slide" class="col-span-1 hidden md:block">
          <common-side-bar-item/>
        </div>
        <div :class="`${slide? 'md:col-span-5' : 'md:col-span-4'} col-span-5 px-6`">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useThemeStore} from "@/stores/themeStore";

const {isDarkMode} = useThemeStore();
const {slide} = storeToRefs(useToggleStore())

onMounted(() => {
  const dom = document.documentElement.classList;
  isDarkMode ? dom.add("my-app-dark") : dom.remove("my-app-dark");
});

</script>

<style scoped></style>