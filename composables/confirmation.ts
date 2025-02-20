import { useConfirm } from '#imports'

export function useConfirmation() {
    const confirm = useConfirm()
    const { showMessage } = useMessages()

    function confirmDelete(id: any,url:any, acceptCallback: (id: any , url:any) => void) {
        confirm.require({
        message: `Do you really want to delete this`,
         header: 'Confirm Deletion',
         icon: 'pi pi-info-circle',
         rejectLabel: 'Cancel',
         rejectProps: { severity: 'secondary', outlined: true },
         acceptProps: { label: 'Delete', severity: 'danger' },
            accept: () => {
                
                acceptCallback(id , url)
            },
            reject: () => {
              showMessage('error', 'Cancelled','Deletion cancelled')
            },
        })
    }

    function confirmItemDelete(id: any, acceptCallback: (id: any ) => void) {
        confirm.require({
        message: `Do you really want to delete this`,
         header: 'Confirm Deletion',
         icon: 'pi pi-info-circle',
         rejectLabel: 'Cancel',
         rejectProps: { severity: 'secondary', outlined: true },
         acceptProps: { label: 'Delete', severity: 'danger' },
            accept: () => {
                console.log(acceptCallback)
                acceptCallback(id)
            },
            reject: () => {
              showMessage('error', 'Cancelled','Deletion cancelled')
            },
        })
    }


    return { confirmDelete ,confirmItemDelete }
}