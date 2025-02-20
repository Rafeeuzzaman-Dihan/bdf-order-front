<script setup lang="ts">
import {useForm} from "vee-validate";
import * as yup from "yup";
import {useToast} from "primevue/usetoast";
import {ref} from "vue";
import {useAuthStore} from "~/stores/auth";

definePageMeta({
  layout: 'blank',
  middleware: 'guest'
})

interface Common {
  [key: string]: any;
}

const toast = useToast();

const isLoading = ref<boolean>(false);

const schema = yup.object({
  email: yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
  password: yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
});

const {errors, handleSubmit, defineField, setErrors} = useForm({
  validationSchema: schema,
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const authStore = useAuthStore();
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const {data, error} = await authStore.login(values) as { data: Common, error: Common };

  if (error && error.value) {
    dispatchToast("error", error.value?.data?.statusCode, error.value?.data?.message)
    setErrors(error?.value?.data?.message)

  } else {

    navigateTo('/admin/dashboard')
    dispatchToast()
  }

  isLoading.value = false;
});

const dispatchToast = (severity: any = 'success', summary: string = '200', detail: string = 'success') => {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  });
};
onMounted(() => {
  document.documentElement.classList.remove('my-app-dark')
})
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg shadow-xl p-5 rounded-2xl border bg-white">
      <LoginTitle/>
      <div class="py-8 px-6 sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-1">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email<span class="text-red-500">*</span>
            </label>
            <InputText
                v-model="email"
                type="email"
                placeholder="Enter Your Email"
                :class="{ 'p-invalid': errors.email, 'w-full': true }"
            />
            <small class="p-error text-red-600" v-if="errors.email">{{ errors.email }}</small>
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password<span class="text-red-500">*</span>
            </label>
            <Password
                v-model="password"
                :feedback="false"
                :toggleMask="true"
                placeholder="Enter Password"
                :class="{ 'p-invalid': errors.password, 'w-full': true }"
                class="w-full"
                inputClass="w-full"
            />
            <small class="p-error text-red-600" v-if="errors.password">{{ errors.password }}</small>
          </div>


          <Button
              type="submit"
              :loading="isLoading"
              severity="warning"
              class="w-full"
              label="Sign In"
          />
        </form>
      </div>
    </div>
  </div>
</template>

