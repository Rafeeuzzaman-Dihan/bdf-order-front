
export const deleteItem =  () => {
  const {showMessage} = useMessages() ; 
    const deletebyId = async(id:string , url:string)=>{ 
      const { error } = await deleteData(`${url}/${id}`) as { data: any, error: any };
      if (error && error.value) {
          showMessage('error' , 'Error',`Failed to delete ${url}`)
      } else {
          showMessage('success' , 'Deleted',`${url} deleted successfully!`)
          navigateTo('/admin/'+url+'s')
      }
    }
    return {deletebyId}
};