import {defineStore} from "pinia";
import accessToken from "~/composables/useCookies";
import {postData} from "~/composables/useFetch";
import {getData} from "~/composables/useFetch";

interface User {
    id?: number;

    [key: string]: unknown;
}

interface TokenUserData {
    token: string | null;
    user: User | null;
}

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    errors: Record<string, unknown>;
    isLoading: boolean;
    userWithRole: {}
}

export const useAuthStore = defineStore("auth", () => {
    // State
    const state = reactive<AuthState>({
        isLoggedIn: !!accessToken(), // If token present loggedIn true
        token: accessToken() || null, // Get token from cookie or null
        user: null,
        errors: {},
        isLoading: false,
        userWithRole: {},
    });

    // Getters
    const isAuthenticated = computed(() => {
        return !!(state.token && state.user && state.user.id);
    });

    // Actions
    async function register(payload: Record<string, unknown>) {
        const {data, error, refresh} = await postData("auth/signup", payload);
        setTokenUser(data || {});
        return {data, error, refresh};
    }

    async function login(payload: Record<string, unknown>) {
        const {data, error} = await postData("auth/login", payload) as {
            data: any,
            error: any,
        };
        setTokenUser(data || {});
        return {data, error};
    }

    async function setUser(payload: User) {
        state.user = payload;
    }

    function setTokenUser(data: any) {
        window.localStorage.setItem('user', JSON.stringify(data?.value?.user));
        state.token = data?.value?.user?.token || null; // Set token in store
        state.user = data?.value?.user || null; // Set user data in store
        state.isLoggedIn = !!(data?.value?.user?.token && data?.value?.user && data?.value?.user?.id); // Update isLoggedIn state
        accessToken(data?.value?.user.token); // Set the token in cookies
    }

    async function getUser() {
        if (!accessToken()) return {};

        const {data, refresh, error} = await getData("user") as { data: any, error: any, refresh: any };
        if (error && error.value) {
            clearAuth(); // Clear auth data if there's an error
        } else {
            state.user = data || null; // Set user data in store
            state.isLoggedIn = !!(state.token && state.user && state.user.id); // Update isLoggedIn state
        }
        return {data: data, error: error, refresh};
    }

    async function loggedInUser() {
        if (!accessToken()) return {};

        const {data, refresh, error} = await getData("auth/profile") as { data: any, error: any, refresh: any };
        if (error && error.value) {
            clearAuth(); // Clear auth data if there's an error
        } else {
            window.localStorage.setItem('user', JSON.stringify(data.value.user));
            state.userWithRole = data.value.user || null; // Set user data in store
            state.isLoggedIn = !!(state.token && state.user && state.user.id); // Update isLoggedIn state
        }
        return {data: data, error: error, refresh};
    }

    async function logout() {
        clearAuth();
        window.localStorage.removeItem('user');
        navigateTo('/admin/signin');
    }

    function clearAuth() {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;

        if (process.server) return;
        accessToken("");
    }

    const getStart = () => {
        if (state.isLoggedIn) {
            navigateTo('/admin/dashboard');
        } else {
            navigateTo('/admin/signin');
        }
    }

    return {
        ...toRefs(state),
        isAuthenticated,
        token: state.token,
        register,
        login,
        setUser,
        setTokenUser,
        getUser,
        logout,
        clearAuth,
        getStart,
        loggedInUser,
    };
}, {persist: true});