

<template>
  <el-divider/>
  <span>vueuse/core案例</span>
<div>{{state.count}}</div>
  <el-button @click="add">count</el-button>



  <input
      v-for="i in 6"
      :key="i"
      type="text"
      :data-id="i"
      class="!my-0 !min-w-0"
      :name="`名字${i}`"
      :placeholder="`占位文字${i}`"
  >
  <div class="mt-2">
    Current Active Element:
    <span class="text-primary">{{ key }}</span>
  </div>
</template>

<script setup>
import { useGlobalState } from '@/store/test2.js'
import {watch,computed} from 'vue'
import {useActiveElement} from "@vueuse/core";
const state = useGlobalState()


function add(){
  // 这里取  state.value.count
  state.value.count++
}


const activeElement = useActiveElement()

watch(activeElement, (el) => {
  console.log('focus changed to', el)
  console.log('当前属性值', activeElement.value?.dataset?.id)
  console.log('当前属性值', activeElement.value?.placeholder)
})

// const key = computed(() => activeElement.value?.dataset?.id || 'null')
// const key = computed(() => activeElement.value?.placeholder || 'null')
const key = computed(() => activeElement.value?.name || 'null')
// const key = computed(() => activeElement.value?.dataset?.key || 'null')
</script>


<style scoped>

</style>
