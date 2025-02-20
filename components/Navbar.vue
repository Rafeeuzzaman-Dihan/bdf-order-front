<script lang="ts" setup>
import { useThemeStore } from "@/stores/themeStore";
import { items } from "~/assets/service/navItems";
const themeStore = useThemeStore();
const { slide } = storeToRefs(useToggleStore())
const menu = ref();
const visible = ref(false);
const {logout} = useAuthStore(); 

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <Menubar class="sticky top-0 z-10 rounded-none min-h-20 px-[1rem] md:px-[2rem] lg:px-[2rem]">
    <template #start>
      <div class="flex items-center text-4xl">
                <NuxtLink v-if="!slide" to="/admin/dashboard">
          <img
              :src="themeStore.isDarkMode ? '/logo-dark_mode.png' : '/logo.png'"
              class="h-16 hidden md:inline lg:inline"
              alt="BD Funnel Builder logo"
          />
        </NuxtLink>
        <Icon @click="slide = !slide" name="ic:baseline-arrow-back-ios" :class="[slide ? 'rotate-180' : 'rotate-0', slide ? '' : 'ml-10']"
          class="max-sm:hidden sm:hidden md:block cursor-pointer" />
        <Icon @click="visible = !visible" name="ic:baseline-menu" class="sm:block md:hidden lg:hidden" />

      </div>
    </template>

    <template #end>
      <div>
        <img
          src="public/logout.jpg"
          class="h-10 w-10 rounded-[50%] cursor-pointer"
          alt="logout logo"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_tmenu"
        />
        <TieredMenu ref="menu" popup :model="items" class="mt-3 hover:bg-none">
          <template #item="{ item, props }">
            <div v-if="item.type === 'icons'"
              class="text-gray-500 flex justify-around items-center py-2 cursor-pointer">
              <span class="bg-gray-200 rounded-md px-4 pt-1.5" v-tooltip.top="'Enable Dark Theme'"
                @click="themeStore.toggleDarkMode">
                <Icon :name="item.icon1" class="text-2xl"
                  :class="themeStore.isDarkMode ? 'text-orange-500' : 'text-gray-500'" />
              </span>
              <span class="bg-gray-200 rounded-md px-4 pt-1.5" v-tooltip.top="'Enable Light Theme'"
                @click="themeStore.toggleLightMode">
                <Icon :name="item.icon2" class="text-2xl"
                  :class="!themeStore.isDarkMode ? 'text-orange-500' : 'text-gray-500'" />
              </span>
            </div>

            <a
              v-else
              v-ripple
              class="flex items-center text-gray-500"
              v-bind="props.action"
            >
              <Icon :name="item.icons" class="text-xl" />
              <span @click="item.label==='Sign Out'?logout():''" class="ml-2 text-xl ">{{ item.label }}</span>
            </a>
          </template>
        </TieredMenu>
      </div>
    </template>
  </Menubar>
  
  <Drawer v-model:visible="visible">
    <common-side-bar-item />
  </Drawer>
</template>
