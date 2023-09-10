<script setup>
import bus from '@/plugin/Bus.js'

let num = ref(100)

const to = () => {
  bus.emit("orderNum", ++num.value)
}

</script>

<template>
  <div>
    兄弟传值用mitt
    {{ num }}<br>
    <el-button @click="to">子父传值</el-button>
  </div>
</template>

<style scoped>

</style>
