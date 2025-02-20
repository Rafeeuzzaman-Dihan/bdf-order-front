<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const route = useRoute();
const id = route.params.id as string;

const agent = ref<{ name: string; id: string; capacity: number } | null>(null);
const nickname = ref<string>("");
const capacity = ref<number>(0);

const {showMessage} = useMessages();
const {deletebyId} = deleteItem()
const {confirmDelete} = useConfirmation();

const fetchAgent = async () => {
  const {data, error} = await getData(`agent/${id}`) as { data: any, error: any };
  if (error && error.value) {
    console.error(error.value);
  } else {
    agent.value = data.value;
    nickname.value = data.value.name;
    capacity.value = data.value.capacity;
  }
};

fetchAgent();

const saveChanges = async () => {
  const updatedAgent = {
    name: nickname.value,
    user: agent.value?.id,
    capacity: capacity.value,
  };
  const {data, error} = await putData(`agent/${id}`, updatedAgent) as { data: any, error: any };
  error && error.value ? showMessage('error', 'Error', 'Failed to update agent') : showMessage('success', 'Success', 'Agent updated successfully!')
};

const validateCapacity = () => {
  if (capacity.value < 0) {
    capacity.value = 0;
  }
};
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Edit Agent</h1>
    <div class="flex justify-end">
      <button @click="confirmDelete(id,'agent', deletebyId )"
              class="ml-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
        Delete
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6 items-center">
      <div>
        <label class="block text-sm font-medium mb-1">User</label>
        <select v-model="agent" class="w-full border rounded px-3 py-2  cursor-not-allowed"
                disabled>
          <option :value="null" disabled>Select User</option>
          <option v-if="agent" :value="agent" :key="agent.id">
            {{ agent.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Capacity<sup class="text-red-500">*</sup></label>
        <input v-model="capacity" type="number" class="w-full border rounded px-3 py-2"
               @input="validateCapacity" placeholder="Enter capacity"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Nickname<sup class="text-red-500">*</sup></label>
        <input v-model="nickname" type="text" class="w-full border rounded px-3 py-2"
               placeholder="Enter nickname"/>
      </div>
    </div>

    <div class="flex items-center gap-4 mt-6">
      <button @click="saveChanges"
              class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
        Save changes
      </button>
      <NuxtLink to="/agents">
        <div class="pb-1">
          <Button severity="contrast" variant="outlined" label="Cancel"
                  class="  shadow  w-18 h-10 text-center"/>
        </div>
      </NuxtLink>
    </div>
    <ConfirmDialog/>
  </div>
</template>
