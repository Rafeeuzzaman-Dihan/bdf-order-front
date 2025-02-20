<template>
    
   <Toast />
   <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
const confirm = useConfirm();
const toast = useToast();
import { defineProps, defineEmits } from 'vue';
 
const emit = defineEmits(['registerOpenDialog'])
const props = defineProps<{ onDelete: (id: number) => void }>();
console.log(props)

const openDialog = (id : number) : void => {
    console.log(id)
   confirm.require({
       message: 'Do you want to delete this record?',
       header: 'Delete Courier',
       
       rejectLabel: 'Cancel',
       rejectProps: {
           label: 'Cancel',
           severity: 'secondary',
           outlined: true
       },
       acceptProps: {
           label: 'Confirm',
           severity: 'danger'
       },
       accept: () => {props.onDelete(id)
        console.log(props.onDelete)
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Product successfully deleted!', life: 3000 });
       },
       reject: () => {
        toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
       }
   });
};


    


emit("registerOpenDialog",openDialog)

</script>

