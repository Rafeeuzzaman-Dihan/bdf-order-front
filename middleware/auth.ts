import accessToken from "~/composables/useCookies";

export default defineNuxtRouteMiddleware((to, from) => {

    const token = accessToken();

    if (process.server && !token) { /// IN server only check for token ....
        return navigateTo('/admin/signin?next=' + to.fullPath)
    } else if (process.client && !token) { // while in client check for both token and user data ...
        return navigateTo('/admin/signin?next=' + to.fullPath)
    }
});
