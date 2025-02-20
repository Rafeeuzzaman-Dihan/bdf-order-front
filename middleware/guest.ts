import accessToken from "~/composables/useCookies";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = accessToken();
    // const token = authStore.token;
    if (token) return navigateTo('/admin/dashboard')
});