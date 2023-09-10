<script setup>
// import {ref, reactive} from "vue"; // 使用插件
import News from "@/views/News.vue";
import {useRouter} from "vue-router";
import Order from "@/views/Order.vue";
import Details from "@/views/Details.vue";


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

let router = useRouter()
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

const changeOrder = (val) => {
  console.log('子父传值=' + (val))
}

let toSub = ref(220)
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


  父子传值: {{ toSub }}
  <!--  <News :msg="toSub"  @change-order="changeOrder"></News>-->
  <!--  父子双向传值-->


  <el-row>
    <News v-model:msg=toSub @change-order="changeOrder" style="background-color: #535bf2"></News>
    <Order style="background-color: red"></Order>
  </el-row>


  <el-row>
    <Details>

      <template v-slot:p1>
        插槽传值1
      </template>

      <!--      简写插槽 #名称-->
      <template #p2>
        插槽传值2
      </template>



      <template v-slot="{user}">
        {{ user.id }} -- {{ user.name }}
      </template>


      <!-- 直接解构组件MyTest 返回的数据-->
      <template v-slot:info="{ msg, info }">
        <p>{{ msg }}</p>
        <p>{{ info.address }}</p>
      </template>

      <template v-slot:games="{games}">
        <div v-for="(item,index) in games" :key="index">{{ item }}</div>
      </template>


    </Details>
  </el-row>
</template>

<style scoped>

</style>
