<template>
  <div class="w-full h-screen flex flex-col items-center justify-center ">
  <img class="object-cover h-72" src="/public/notperm.png" alt="">

   <div class="flex flex-col items-center justify-center gap-1">
    <h1 class="text-2xl font-semibold mt-2 ">Not Permitted</h1>
    <h1 class="text-xl">You are not permitted to perform this operation</h1>

      <Button @click="backToPrev" severity="secondary">
        <Icon name="icon-park:return" />
        <h1>back</h1>
      </Button>
 
   </div>
  
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const backToPrev = ()=>{
  router.back() ; 
}
definePageMeta({
  layout:false
})
</script>

<style>

</style>