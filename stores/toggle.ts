import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggle", () => {
    const visible = ref(false);
    const slide = ref(false)


    return { visible, slide };
});

//Recent Push