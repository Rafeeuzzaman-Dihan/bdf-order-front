<script lang="ts" setup>

const menu = ref();
const toggle = (event: any) => {
  menu.value.toggle(event);
};

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const selectedStatus = ref<string>("Select Courier");

const vendors = [
  {name: "Pathao", value: "pathao"},
  {name: "Custom", value: "custom"},
  {name: "STEADFAST", value: "steadfast"},
];

const handleStatus = async (item: any) => {
  const {data, error} = await putData(`order/${props.data.id}`, {courier_name: item.value}) as {
    data: any,
    error: any
  } as {
    data: any,
    error: any
  };
  if (error && error?.value) {
    console.log(error?.value);
  } else {
    props.data.courier_name = item.name;
  }
};
</script>

<template>
  <div>
    <Button
        type="button"
        severity="warn"
        class="break-keep w-fit min-w-40"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_tmenu"
    >
      <Icon
          name="material-symbols-light:delivery-truck-speed-rounded"
          size="30"
      />
      <h1 class="whitespace-nowrap font-semibold text-lg">
        {{ data.courier_name }}
      </h1>
    </Button>

    <TieredMenu
        ref="menu"
        popup
        :model="vendors"
        class="mt-3 w-fit flex flex-col items-center"
    >
      <template #item="{ item }">
        <Button
            @click="handleStatus(item)"
            severity="secondary"
            class="m-1 min-w-36 bg-transparent hover:bg-none border-none font-bold"
        >{{ item.name }}
        </Button>
      </template>
    </TieredMenu>
  </div>
</template>

<style></style>
