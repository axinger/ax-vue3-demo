<template>
  <div>

    子内容<br>

    <el-divider></el-divider>
    父传值: {{ msg }}<br>


    <el-button @click="to">子父传值</el-button>
    obj:{{ obj }}<br>

    兄弟传值:{{ orderNum }}
  </div>
</template>

<script setup>
//生命周期

import {useRoute} from "vue-router";
import bus from '@/plugin/Bus.js'

onMounted(() => {
})

const route = useRoute();
onMounted(() => {
  // 打印
  console.log('route:', toRaw(route).query)
  console.log('route:' + route.query.name)
})

// 定义属性
let props = defineProps({
  msg: {
    type: Number,
    default: 0
  }
})

// 响应式解构 count 属性
const msg = toRef(props, 'msg')

// let {msg} = defineProps({
//   msg: {
//     type: Number,
//     default: 0
//   },
//   age:Number
// })



let emits = defineEmits([
  'changeOrder',
  'update:msg' // 修改父属性, 固定格式  update:
])


let obj = ref(1)


const to = () => {
  obj.value++;
  emits('changeOrder', obj.value) // .value

  // 修改父属性, 不能用++
  // emits('update:msg', 1 + msg.value) // .va
  // props.msg++
  emits('update:msg',1+props.msg ) // .va
}

let orderNum = ref(0)
onBeforeMount(() => {
  bus.on('orderNum', e => {
    console.log('orderNum=' + e)
    orderNum.value = e
  })
})

onMounted(() => {

})

onBeforeUnmount(() => {
  bus.off('orderNum')
})
</script>


