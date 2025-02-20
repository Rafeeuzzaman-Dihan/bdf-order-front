<script setup lang="ts">
import { useRoute } from 'vue-router';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Button from 'primevue/button';
import { ref } from "vue";
import { NuxtLink } from '#components';
const inputName = ref<string | null>(null)
const route = useRoute()
const selectedservice = ref<Service | null>(null);
const body = ref<any>
const routeId = route.params.id
import { defineProps } from 'vue';
const props = defineProps<{ datas: any }>();
const credentials = ref({
    client_id: "",
    client_secret: "",
    user_name: "",
    password: "",
    grand_type: "",
    store_id: ""
})

const isEditMode = route.name === "admin-couriers-id-edit";

interface Service {
    name: string;
}

const modelValue = ref("");
const courierService = ref<Service | null>(null);

watch(
    () => props.datas,
    (newData) => {
        if (isEditMode && newData) {
            modelValue.value = newData.name || "";
            courierService.value =
                services.value.find((s) => s.name === newData.vendor) || null;
            credentials.value = newData.credentials || null

        }
    },
    { immediate: true, deep: true }
);

watch(
    () => courierService.value,
    (newService) => {
        if (newService) {
            credentials.value = {
                client_id: "",
                client_secret: "",
                user_name: "",
                password: "",
                grand_type: "",
                store_id: "",
                ...credentials.value,
            };
        }
    }
);
const services = ref<Service[]>([
    { name: 'custom' },
    { name: 'pathao' },
    { name: 'steadfast' }
])
const clearInput = () => {
    inputName.value = '';
    selectedservice.value = null;
}

watch([modelValue, courierService, credentials], () => {
    body.value = {
        name: modelValue.value,
        vendor: courierService.value?.name || "",
        credentials: courierService.value?.name === "custom"
            ? {}
            : { ...credentials.value }
    };
}, { deep: true, immediate: true });

const createCourier = async () => {
    const fromData = {
        name: modelValue.value,
        vendor: courierService?.value?.name,
        credentials: credentials.value
    }

    const { data, error } = await postData('courier', fromData) as { data: any, error: any };
    if (error && error.value) {
        console.log(error.value)
    }
    else {
        console.log(data.value);

    }
    console.log(fromData)
    navigateTo('/admin/couriers')
}
const handleEdit = async () => {
    const { data, error } = await putData(`courier/${routeId}`, body.value)
    console.log(data)
}
const deleteCourier = async () => {
    const { data } = await deleteData(`courier/${routeId}`)
    navigateTo('/admin/couriers')
}

</script>

<template>
    <NuxtLink class="ml-14" to="/admin/couriers"><span>Couriers</span></NuxtLink> > View

    <div class="flex justify-between">
        <h1 class="font-bold text-3xl mt-4 mx-14 my-5">{{ route.name === 'admin-couriers-id-edit' ? 'Edit Courier' :
            'Create Courier' }}</h1>
        <Button @click="deleteCourier" :class="route.name === 'admin-couriers-id-edit' ? '' : 'hidden'"
            class="h-10 mx-auto lg:mx-16" label="Delete" severity="danger" />
    </div>

    <Card class="w-11/12 mx-auto shadow-lg">
        <template #title class="text-black">General Information</template>
        <template #content>
            <hr class="w-full">
            <p class="m-2 font-bold">
                Name <span class="text-red-500">*</span>
            </p>
            <div class="flex flex-col items-center justify-center">
                <InputText class="w-11/12 m-2" type="text" v-model="modelValue" size="small" required />
            </div>
        </template>
    </Card>
    <Card class="w-11/12 my-8 mx-auto shadow-lg">
        <template class="p-5" #title>Courier Vendor</template>
        <template #content>
            <hr class="w-full">

            <div class="card flex justify-center">

                <Select class="w-11/12 m-5" v-model="courierService" size="small" placeholder="Select an option"
                    :options="services" optionLabel="name" />
            </div>

        </template>
    </Card>
    <div v-if="courierService?.name === 'pathao'">
        <Card class="w-11/12 mx-auto ">
            <template class="p-10 mx-40" #title>Credential</template>
            <template #content>
                <hr class="w-full">

                <div class="grid grid-cols-2 gap-5">
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Client id <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.client_id"
                            aria-describedby="username-help" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Client Secret <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.client_secret"
                            aria-describedby="username-help" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Username <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.user_name"
                            aria-describedby="username-help" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Password <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.password"
                            aria-describedby="username-help" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Grant Type <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.grand_type"
                            aria-describedby="username-help" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Store Id <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.store_id"
                            aria-describedby="username-help" />
                    </div>
                </div>
            </template>
        </Card>
    </div>

    <div v-else-if="courierService?.name === 'steadfast'">
        <Card class="w-11/12 mx-auto ">
            <template #title>Credential</template>
            <template #content>
                <hr class="w-full">

                <div class="grid grid-cols-2 gap-5  mx-auto">
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Client id <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.client_id"
                            aria-describedby="username-help" required />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="username" class="font-bold">Client Secret <span class="text-red-500">*</span></label>
                        <InputText size="small" id="username" v-model="credentials.client_secret"
                            aria-describedby="username-help" />
                    </div>
                </div>
            </template>
        </Card>
    </div>

    <div v-else>

    </div>


    <div class="flex gap-3 mt-10 mx-14">
        <NuxtLink to="/admin/couriers"><Button
                @click="route?.name === 'admin-couriers-id-edit' ? handleEdit() : createCourier()"
                :label="route?.name === 'admin-couriers-id-edit' ? 'Save Changes' : 'Create'" severity="warn" />
        </NuxtLink>
        <Button label="Cancel" severity="secondary" />
    </div>
</template>
