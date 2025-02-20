<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>


<template>
  <div class="card flex justify-center">
    <Button
      title="Receive Paid Amount"
      class="h-11 w-11 rounded-3xl"
      @click="visible = true"
    >
      <Icon name="material-symbols:paid" color="orange"></Icon>
    </Button>
    <Dialog
      v-model:visible="visible"
      modal
      header="Paid Amount"
      :style="{ width: '50rem' }"
    >
      <div class="flex items-center gap-4 mb-8">
        <InputText
          type="number"
          id="email"
          class="flex-auto"
          autocomplete="off"
          fluid
        />
      </div>
      <div class="flex justify-start gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>
