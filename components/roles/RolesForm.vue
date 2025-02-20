<script setup lang="ts">


const { id } = defineProps(['id']);
const user = ref({
  name: '',
  role: []
});

const searchQuery = ref('');
const allSelected = ref(false);

const filteredPermissions = computed(() => {
  return permissions.filter((permission: string) =>
    permission.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleSelectAll = () => {
  if (allSelected.value) {
    user.value.role = [];
  } else {
    user.value.role = filteredPermissions.value;
  }
  allSelected.value = !allSelected.value;
};

const onSubmit = () => {
  console.log(user.value);
};

onMounted(() => {
  if (id) {
    user.value.role = ['assign agent', 'block/unblock ip',
      'delete call configuration', 'view announcement'
    ];
  }
});


</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">{{ id ? 'Edit Role' : 'Create Role' }}</h1>
      <Button v-if="id" label="Delete" severity="danger" />
    </div>


    <form @submit.prevent="onSubmit">
      <div class="flex flex-col md:flex-row mb-4 mt-6">
        <div class="w-full">
          <label class="text-sm font-medium">
            Name <span class="text-red-500">*</span>
          </label>
          <InputText required id="name" v-model="user.name" class="w-full border rounded p-2" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row">
        <div class="w-full">
          <label class="text-sm font-medium">
            Permissions <span class="text-red-500">*</span>
          </label>
          <InputText v-model="searchQuery" placeholder="Start typing to search..."
            class="w-full border rounded p-2 mb-4" />

          <span @click="toggleSelectAll" class="cursor-pointer font-semibold text-orange-500 hover:underline">
            Select All
          </span>

          <div class="flex flex-wrap">
            <div v-for="(permission, i) in filteredPermissions" :key="i"
              class="text-sm font-semibold w-2/3 md:w-1/4 p-2 mt-2 flex items-center">
              <Checkbox :inputId="permission" :value="permission" v-model="user.role" />
              <label :for="permission" class="ml-2">{{ permission }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <span class="flex gap-2">
          <Button label="Create" type="submit" />
          <Button label="Cancel" severity="contrast" variant="outlined" />
        </span>
      </div>
    </form>
  </div>
</template>