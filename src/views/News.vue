<script setup>
//生命周期

import {useRoute} from "vue-router";




onMounted(() => {
})

const route = useRoute();
onMounted(() => {
  // 打印
  console.log('route:', toRaw(route).query)
  console.log('route:'+route.query.name)
})

</script>

<template>

</template>

<style scoped>

</style>
