import { defineStore } from "pinia";
export const useThemeStore = defineStore("themeStore", () => {
    const isDarkMode = ref(false)

    const toggleDarkMode = () => {
        document.documentElement.classList.add('my-app-dark');
        isDarkMode.value = true;
    }

    const toggleLightMode = () => {
        document.documentElement.classList.remove('my-app-dark');
        isDarkMode.value = false;
    }

    return { isDarkMode, toggleDarkMode, toggleLightMode }

},
    {
        persist: true,
})