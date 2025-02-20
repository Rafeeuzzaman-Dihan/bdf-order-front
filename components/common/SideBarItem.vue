<script setup lang="ts">

import {useThemeStore} from '~/stores/themeStore';
import $hasPermission from "~/composables/canAccess";

const themeStore = useThemeStore();
const hoverColor = computed(() => {
  return themeStore.isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200';
});

const menuItems = [
  {
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'ic:baseline-dashboard',
    resource: 'dashboard',
  },
  {label: 'Products', link: '/admin/products', icon: 'ic:baseline-shopping-basket', resource: 'products'},
  {label: 'Orders', link: '/admin/orders', icon: 'ic:baseline-shopping-cart', resource: 'orders'},
  {label: 'Agents', link: '/admin/agents', icon: 'ic:baseline-person', resource: 'agents'},
  {
    label: 'Settings',
    subItems: [
      {label: 'Courier Integration', link: '/admin/couriers', icon: 'ic:baseline-local-shipping'}
    ],
    resource: 'settings'
  },
  {
    label: 'Users & Roles',
    subItems: [
      {label: 'Customers', link: '/admin/customers', icon: 'ic:baseline-group'},
      {label: 'Roles', link: '/admin/roles', icon: 'ic:baseline-security'},
      {label: 'Users', link: '/admin/users', icon: 'material-symbols:person-raised-hand'}
    ],
    resource: 'users'
  }
];

const hasPermission = (permission: string) => {
  return $hasPermission(permission);
}
</script>

<template #container>
  <div class="flex flex-col h-full fixed">
    <div class="overflow-y-auto">
      <ul class="list-none p-4 m-0">
        <li v-for="(item,i) in menuItems" :key="item.label" v-show="hasPermission(item.resource)">
          <NuxtLink v-if="!item.subItems" :to="item.link"
                    :class='`flex items-center cursor-pointer p-4 rounded ${hoverColor}`'
                    active-class="text-orange-500">
            <Icon :name="item.icon" size="25" class="mr-2"/>
            <span class="font-medium">{{ item.label }}</span>
          </NuxtLink>

          <div v-if="item.subItems" v-ripple v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-slideup'
                    }" class="p-4 flex items-center justify-between cursor-pointer">
            <span class="font-medium">{{ item.label }}</span>
            <Icon
                name="ic:baseline-arrow-drop-down" size="25"/>
          </div>

          <ul v-if="item.subItems"
              class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[100ms] ease-in-out">
            <li v-for="subItem in item.subItems" :key="subItem.label">
              <NuxtLink :to="subItem.link"
                        :class='`flex items-center cursor-pointer p-4 rounded ${hoverColor}`'
                        active-class="text-orange-500">
                <Icon :name="subItem.icon" size="25" class="mr-2"/>
                <span class="font-medium">{{ subItem.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>