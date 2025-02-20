<template>
    <div class="card flex justify-center">

        <button @click="toggle" class="text-3xl text-center ml-2" title="filter">
            <Icon name="ic:sharp-filter-alt" class="pr-1 hover:text-[#71717a] text-[#a1a1aa]" badge="2" />
        </button>
        <Popover ref="op">
            <div class="flex justify-between gap-4 w-[20rem]">
                <p class="font-semibold pt-2">Filters</p>
                
                    <Button label="Reset" variant="link" class="text-red-600 font-semibold"/>
               
                
            </div>
            <div class="card flex flex-col justify-start ">
                <p class="pt-5">Assignee</p>
                <AutoComplete v-model="value" dropdown :suggestions="items" @complete="search" class="w-[20rem] pt-2" />
            </div>
            <div class="grid grid-cols-2">
                <div>
                    <p class="pt-3">Start date</p>
                    <DatePicker v-model="value2" placeholder="mm/dd/yyyy" showIcon iconDisplay="input"
                        class="w-[9rem] pt-2" />
                </div>
                <div>
                    <p class="pt-3">End date</p>
                    <DatePicker v-model="value2" placeholder="mm/dd/yyyy" showIcon iconDisplay="input"
                        class="w-[9rem] pt-2" />
                </div>
            </div>
            <div class="flex flex-col ">
                <label for="user" class="pt-3">Product</label>
                <Select id="user" v-model="selectedUser" :options="users" filter optionLabel="name"
                    placeholder="Choose a product" class="w-[20rem] mt-2">
                    <template #value="slot">
                        <div v-if="slot.value" class="flex items-center">
                            <div>{{ slot.value.name }}</div>
                        </div>
                        <span v-else>{{ slot.placeholder }}</span>
                    </template>
                    <template #option="slot">
                        <div class="flex items-center">
                            <div>{{ slot.option.name }}</div>
                        </div>
                    </template>
                </Select>
            </div>
            <div class="flex flex-col">
                <label for="user" class="pt-3">Variant</label>
                <Select id="user" v-model="selectedUser" :options="users" filter optionLabel="name"
                    placeholder="Choose a variant" class="w-[20rem] mt-2">
                    <template #value="slot">
                        <div v-if="slot.value" class="flex items-center">
                            <div>{{ slot.value.name }}</div>
                        </div>
                        <span v-else>{{ slot.placeholder }}</span>
                    </template>
                    <template #option="slot">
                        <div class="flex items-center">
                            <div>{{ slot.option.name }}</div>
                        </div>
                    </template>
                </Select>
            </div>
            <div class="pt-3 grid grid-cols-1 ">
                <p>Customer Tag</p>
                <AutoComplete v-model="value" dropdown :suggestions="items" @complete="search" class="w-[20rem] pt-2" />
            </div>
            <div class="pt-3 grid grid-cols-1 ">
                <p>Courier</p>
                <AutoComplete v-model="value" dropdown :suggestions="items" @complete="search" class="w-[20rem] pt-2" />
            </div>
        </Popover>
    </div>
</template>

<script setup>
import { ref } from "vue";

const op = ref();
const members = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);

const toggle = (event) => {
    op.value.toggle(event);
}

const items = ref([]);

const search = (event) => {
    let _items = [...Array(10).keys()];

    items.value = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
}
</script>
