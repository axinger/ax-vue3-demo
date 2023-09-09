<script setup>
// import {ref, reactive} from "vue"; // 使用插件

import router from "@/router/index.js";


let name = "ji"
// let obj = {
//   a: 1
// }

//ref 需要.value.属性
let obj = ref({
  a: 10
})

//reactive 不需要.value,
// 只能写对象或者数组,不能基本类型
let obj2 = reactive({
  a: 20,
  b: 220
})

//  不用  toRef也可以了
let {a3, b3} = reactive({
  a3: 30,
  b3: 330
})

let str = ref('')
let changeStr = computed(() => {
  return str.value
})

//监听
watch(str, (newValue, oldValue) => {
  console.log('监听=' + newValue)
})

//初始化就监听
let str2 = ref('c')
watch(str2, (newValue, oldValue) => {
  console.log('监听str2=' + newValue)
}, {
  immediate: true // watchEffect类型
})


watch(obj2, (newValue, oldValue) => {
  console.log('监听obj2=' + newValue)
}, {
  immediate: true
})

watch(() => obj2.a, (newValue, oldValue) => {
  console.log('监听obj2.a=' + newValue)
}, {
  immediate: true,
  deep: true // 深度监听
})


// 方法,和属性,都写在setup里面
const btn = () => {
  obj.value.a++
  obj2.a++
  a3 = a3 + 2
  b3 = b3 + 10
}

// let router = useRouter()
// let route = useRoute()
const go = () => {
  router.push("/user?name=jim")


}

//生命周期
onBeforeMount(() => {
  //用来请求接口
  console.log('onBeforeMount=')
})



onMounted(() => {
  // 用来获取dom
  console.log('onMounted=')
})

//修改前
onBeforeUpdate(() => {
  console.log('修改前=')
})

//修改后
onUpdated(() => {
  console.log('修改后=')
})

//销毁前
onBeforeUnmount(() => {
  console.log('销毁前=')
})
// 销毁后
onUnmounted(() => {
  console.log('销毁后=')
})

onActivated(() => {
  console.log('onActivated=')
})

// onDestroy(()=>{
//   console.log('onDestroy=')
// })
</script>

<template>

  首页12
  {{ name }} <br>

  ref:{{ obj }} <br>
  reactive:{{ obj2 }} <br>

  a3:{{ a3 }} <br>
  b3:{{ b3 }} <br>

  str:{{ str }} <br>
  computed:{{ changeStr }} <br>

  <el-button type="primary" @click="btn"> 改变</el-button>

  <el-input v-model="str"></el-input>
  <el-input v-model="str2"></el-input>

  <el-button type="primary" @click="go">跳转路由</el-button>
  <br>

  <router-link to="/user">router-link</router-link>
  <br>

</template>

<style scoped>

</style>
