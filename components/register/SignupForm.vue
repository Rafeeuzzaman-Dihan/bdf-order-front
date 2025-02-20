<template>
  <div>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-2">
     <nuxt-link to="/">
       <img class="mx-auto h-12 w-auto" src="https://bdfunnelbuilder.site/logo.png" alt="Workflow" />
     </nuxt-link>
      <h1 class="text-2xl font-bold mb-4 text-center">Sign up</h1>
      <p class="text-center text-sm mb-6">
        or
        <nuxt-link to="/admin/signin" class="text-orange-600 font-semibold hover:underline">sign in to your account</nuxt-link>
      </p>

      <div class="flex flex-col gap-1 mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-1">Name<span class="text-red-500">*</span></label>
        <InputText v-model="name" type="text" placeholder="Enter Your Name" :class="{ 'p-invalid': errors.name }" />
        <small class="p-error text-red-600" v-if="errors.name">{{ errors.name }}</small>
      </div>

      <div class="flex flex-col gap-1 mb-4">
        <label for="phoneNumber" class="block text-gray-700 font-medium mb-1">Phone Number<span
            class="text-red-500">*</span></label>
        <InputText v-model="phoneNumber" type="text" placeholder="Enter Bangladeshi Phone Number"
          :class="{ 'p-invalid': errors.phoneNumber }" />
        <small class="p-error text-red-600" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</small>
      </div>

      <div class="flex flex-col gap-1 mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-1">Email<span class="text-red-500">*</span></label>
        <InputText class="focus:border-orange-500" v-model="email" type="email" placeholder="Enter Your Email"
          :class="{ 'p-invalid': errors.email }" />
        <small class="p-error text-red-600" v-if="errors.email">{{ errors.email }}</small>
      </div>

      <div class="flex flex-col gap-1 mb-4">
        <label for="password" class="block text-gray-700 font-medium mb-1">Password<span
            class="text-red-500">*</span></label>
        <Password v-model="password" type="password" placeholder="Enter Password" :feedback="false" toggleMask fluid
          :class="{ 'p-invalid': errors.password }" />
        <small class="p-error text-red-600" v-if="errors.password">{{ errors.password }}</small>
      </div>

      <div class="flex flex-col gap-1 mb-4">
        <label for="confirmPassword" class="block text-gray-700 font-medium mb-1">Confirm Password<span
            class="text-red-500">*</span></label>
        <Password v-model="confirmPassword" type="password" placeholder="Enter Confirm Password" :feedback="false"
          toggleMask fluid :class="{ 'p-invalid': errors.confirmPassword }" />
        <small class="p-error text-red-600" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</small>
      </div>

      <Button type="submit" severity="warn" label="Submit" />
    </form>
  </div>
</template>


<script setup lang="ts">

import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/stores/auth';

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ToastParams {
  severity: any;
  summary: string;
  detail: string;
  life: number;
}

const schema = yup.object({
  name: yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z][A-Za-z\s]*$/, 'Name must start with a letter'),
  phoneNumber: yup.string()
    .required('Phone number is required')
    .matches(/^01\d{9}$/, 'Phone number must be 11 digits and start with 01'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match')
});

const toast = useToast();
const authStore = useAuthStore();

const { handleSubmit, errors, defineField, setErrors } = useForm({
  validationSchema: schema
});

const [name, nameProps] = defineField<string>('name');
const [phoneNumber, phoneNumberProps] = defineField<string>('phoneNumber');
const [email, emailProps] = defineField<string>('email');
const [password, passwordProps] = defineField<string>('password');
const [confirmPassword, confirmPasswordProps] = defineField<string>('confirmPassword');

const onSubmit = handleSubmit(async (values) => {
  const { error } = await authStore.register({
    name: values.name,
    phone: values.phoneNumber,
    email: values.email,
    password: values.password,
  }) as { data: any, error: any };

  console.log(authStore.$state.token)
  if (error && error.value) {
    dispatchToast("error", error.value?.data?.statusCode, error.value?.data?.message)
    setErrors(error?.value?.data?.message)

  } else {
    console.log(authStore.$state.user)
    navigateTo('/admin/dashboard')
    dispatchToast()
  }
});
const dispatchToast = (severity: ToastParams['severity'] = 'success', summary: string = '200', detail: string = 'success') => {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  });
}
</script>
