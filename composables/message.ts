import type { ToastMessageOptions } from 'primevue/toast'
import { useToast } from '#imports'

export function useMessages() {
    const toast = useToast()

    function showMessage(severity: ToastMessageOptions['severity'], summary: string='Success', detail: string='Successed', life: number = 3000) {
        toast.add({ severity, summary, detail, life })
    }

    return { showMessage }
}