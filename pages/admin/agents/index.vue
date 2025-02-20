<script setup lang="ts">
import AddAgents from "@/components/AddAgents.vue";
import {FilterMatchMode} from '@primevue/core/api';
import type {agents, AgentOverview} from "~/interfaces/agents";

definePageMeta({
  middleware: 'auth'
});

const dt = ref();
const Agents = ref<agents[]>([]);
const selectedagents = ref<agents[]>([]);
const {showMessage} = useMessages();
const {confirmItemDelete} = useConfirmation();

const {data, error} = await getData("agent") as { data: any, error: any }
error && error.value ? console.log(error.value) : Agents.value = data.value;

const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const updateAgent = (agent: string): void => {
  Agents.value = Agents.value.filter(item => item._id !== agent);
}

const confirmDeleteAgent = async (agent: string) => {

  const {error} = await deleteData(`agent/${agent}`) as { data: any, error: any };
  if (error && error.value) {
    showMessage('error', 'Error', `Failed to delete agent`)
  } else {
    showMessage('success', 'Deleted', `Agent deleted successfully!`)
    updateAgent(agent);
  }

};

const handleNewAgent = (newAgent: agents) => {
  Agents.value.unshift(newAgent);
};

const agentOverviews: AgentOverview[] = [
  {title: "Total Agents", value: 1},
  {title: "Active Agents", value: 4},
  {title: "Assigned Orders", value: 7},
  {title: "Unassigned Orders", value: 5},
  {title: "Average Unassigned Order Time", value: "2 hours"}
];
</script>


<template>

  <ConfirmDialog/>


  <div class=" rounded-md my-5">
    <div>
      <h1 class="text-3xl font-bold  "> Agents</h1>
      <div class="flex items-center justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4">
          <AgentOverview
              v-for="(agentOverview, index) in  agentOverviews"
              :key="index"
              :agentOverview=" agentOverview"
          />
        </div>
      </div>
    </div>
    <div class="card flex justify-end pt-2 rounded pr-2">
      <AddAgents @agentAdded="handleNewAgent"/>
    </div>
    <div class="card">
      <DataTable
          ref="dt"
          :value="Agents"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5,10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-end">
            <IconField>
              <InputIcon>
                <i class="pi pi-search"/>
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Search..."/>
            </IconField>
          </div>
        </template>
        <Column style="width: 3rem" :exportable="false"></Column>
        <Column field="name" header="Nick name" style="min-width: 8rem">
          <template #body="slotProps">
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="capacity" header="Capacity" style="min-width: 8rem">
          <template #body="slotProps">
            {{ slotProps.data.capacity }}
          </template>
        </Column>

        <Column field="online" header="Online" style="min-width: 12rem">
          <template #body="slotProps">
            <Icon v-if="slotProps.data.online" name="radix-icons:cross-circled" class="text-red-500 text-lg"/>
            <Icon v-else name="lsicon:check-correct-outline" class="text-green-500 text-lg"/>
          </template>
        </Column>

        <Column>
          <template #body="slotProps">
            <div class="flex flex-row gap-4 items-center">
              <!-- Here change the path of the productview page -->
              <ButtonsView :link="`agents/${slotProps.data._id}`"/>

              <ButtonsEdit :link="`agents/${slotProps.data._id}/edit`"/>
              <ButtonsDelete :item="slotProps.data" eventName="deleteAgent"
                             @deleteProduct="confirmItemDelete(slotProps.data._id , confirmDeleteAgent )"/>

            </div>
          </template>
        </Column>
      </DataTable>
    </div>


  </div>
</template>

