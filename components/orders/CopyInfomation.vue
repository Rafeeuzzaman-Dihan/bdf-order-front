<script lang="ts" setup>
const props = defineProps({
  values: {
    type: Object || undefined,
    required: true,
  },
});
const copyContent = `Order Number: ${props.values.order_number} Name: ${props.values.name} Phone: ${props.values.phone} Email: ${props.values.email}`;

const {showMessage} = useMessages();

const CopyToClipBoard = async () => {
  await navigator.clipboard.writeText(copyContent);
  showMessage("success", "Copy to ClipBoard");
};
</script>

<template>
  <div>
    <Icon
        @click="CopyToClipBoard"
        name="material-symbols:content-copy-rounded"
        size="24"
        class="text-orange-500 cursor-pointer"
    ></Icon>
  </div>
</template>

<style></style>
