<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const emit = defineEmits(["agentAdded"]);
interface User {
    _id: string;
    name: string;
    email: string;
}

const users = ref<User[]>([]);
const visible = ref(false);
const selectedUser = ref<User | null>(null);
const nickname = ref<string>("");
const cap = ref<any>();
const { data, error } = await authStore.getUser();
users.value=data.value
console.log(data)



const createAgent =async () => {
    if (selectedUser.value && nickname.value && cap.value !== null) {
        const newAgent = {
            name: nickname.value,
            user: selectedUser.value._id,
            capacity: Number(cap.value),
           
        };
        console.log("New Agent Created:", newAgent);
        const {data,error} =await postData("agent",newAgent)as {data:any, error:any}
        
        if(error && error.value)
        console.log(error.value)
    else{
        console.log(data.value)
        emit("agentAdded", data.value);
        visible.value = false;
        clearForm();
    }
    }
};

const clearForm = () => {
    selectedUser.value = null;
    nickname.value = "";
    cap.value = null;
};

const validateCapacity = () => {
    if (cap.value !== null && cap.value < 0) {
        cap.value = 0;
    }
};

</script>

<template>
    <div>
        <Button label="Add Agent" @click="visible = true" class="bg-[#F59E0B] text-white" />
        <Dialog v-model:visible="visible" modal header="Create Agent" :style="{ width: '64rem', height: '18rem' }">
            <div class="flex flex-row justify-center gap-4">
                <div class="flex flex-col mb-8 w-1/3 text-black">
                    <label for="user" class="font-semibold mb-4">User<sup class="text-[#df3b3b]">*</sup></label>
                    <Select id="user" v-model="selectedUser" :options="users" filter optionLabel="name"
                        placeholder="Select a user" class="w-full">
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

                <div class="flex flex-col mb-8 mx-auto w-1/3 text-black">
                    <label for="capacity" class="font-semibold mb-4">Capacity<sup class="text-[#df3b3b]">*</sup></label>
                    <InputText id="capacity" v-model="cap" type="number" @input="validateCapacity" autocomplete="off"
                        placeholder="Enter the capacity" />
                </div>

                <div class="flex flex-col mb-8 text-black w-1/3 mx-auto">
                    <label for="nickname" class="font-semibold mb-4">Nick Name<sup
                            class="text-[#df3b3b]">*</sup></label>
                    <InputText id="nickname" v-model="nickname" autocomplete="off" placeholder="Enter a nickname" />
                </div>
            </div>
            <div class="flex flex-row gap-3 pb-1 text-black">
                <Button label="Create" @click="createAgent"
                    class="bg-[#d97706] hover:bg-[#F59E0B] text-white w-18 h-10 border-none" />
                <Button label="Cancel" @click="visible = false"
                    class="bg-white border shadow hover:bg-[#fafafa] text-black w-18 h-10" />
            </div>
        </Dialog>
    </div>
</template>
