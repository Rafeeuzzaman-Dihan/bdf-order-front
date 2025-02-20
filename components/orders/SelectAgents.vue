<script lang="ts" setup>
import { agentService } from "~/assets/service/OrderService"
const menu = ref();
const toggle = (event: any) => {
  menu.value.toggle(event);
};
const selectedStatus = ref<string>("?");

const handleStatus = (item: any) => {
  const firstTwoLetter = item.name.slice(0, 2).toUpperCase();
  selectedStatus.value = firstTwoLetter;
};
</script>

<template>
  <div>
    <Button
      type="button"
      severity="secondary"
      class="w-12 h-12 rounded-3xl"
      :label="selectedStatus"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    />

    <TieredMenu
      ref="menu"
      popup
      :model="agentService"
      class="mt-3 w-fit flex flex-col items-center"
    >
      <template #item="{ item }">
        <Button
          @click="handleStatus(item)"
          severity="secondary"
          class="m-1 bg-transparent min-w-36 hover:bg-none border-none font-bold"
          >{{ item.name }}</Button
        >
      </template>
    </TieredMenu>
  </div>
</template>

<style></style>
