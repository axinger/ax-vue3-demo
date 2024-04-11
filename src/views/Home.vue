<template>

  首页12
  {{ name }} <br>

  ref:{{ obj }} <br>
  reactive:{{ obj2 }} <br>

  a3:{{ a3 }} <br>
  b3:{{ b3 }} <br>

  str:{{ str }} <br>
  computed:{{ changeStr }} <br>




  <el-divider>toRef</el-divider>
  <div>
    info.greet: {{info.greet}}
    rGreet: {{rGreet}}

    <el-button type="primary" @click="onChangeGreet"> rGreet修改值</el-button>
    <el-button type="primary" @click="onChangeInfoGreet"> info.greet修改值</el-button>

  </div>

  <el-divider>toRaw</el-divider>

  <div>
    original: {{original.age}}
    reactiveObj: {{reactiveObj.age}}
    toRaw: {{rawObj.age}}

    <el-button type="primary" @click="_toRawOnChangeOriginal">修改original,值会变化,但页面不会变化</el-button><br>
    <el-button type="primary" @click="_toRawOnChangeReactiveObj">修改reactive,值会变化,页面也会变化,会实时根据original值</el-button><br>
    <el-button type="primary" @click="_toRawOnChangeRawObj"> 修改toRaw,值会变化,但页面不会变化</el-button><br>
  </div>

  <el-divider></el-divider>
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
    <div id="main">
      传送必须在子组件前,才有效:
    </div>
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


  <el-divider/>
  <h2 style="color: red">动态组件 component</h2><br>
  <el-row>
    <el-button v-for="(item,index) in tableList" :key="index" @click="changeIndex(index)">点击{{ item.name }}
    </el-button>
    <br>
  </el-row>
  <keep-alive>
    <component :is="currentTab.com"></component>
  </keep-alive>
  <br>

  <el-divider/>
  <h2 style="color: red">异步组件</h2><br>


  <el-divider/>
  <h2 style="color: red">Mixin混入,同一个js代码中的变量不会互相影响</h2><br>
  <el-row>
    <A style="background-color: #535bf2"></A>
    <B style="background-color: orchid"></B>
  </el-row>


  <el-divider/>
  <h2 style="color: red">依赖注入,用于父子,子父传值,类似pinia </h2><br>
  <el-row>
    <el-button @click="proObjEvent">点击</el-button>
    <A style="background-color: #535bf2"></A>
  </el-row>

  <el-divider/>
  <h2 style="color: red">pinia </h2><br>
  <el-row>
    <A style="background-color: #535bf2"></A>
    <B style="background-color: orchid"></B>
  </el-row>


  <UI/>

</template>

<script setup>
// import {ref, reactive} from "vue"; // 使用插件
import News from "@/views/News.vue";
import {useRouter} from "vue-router";
import Order from "@/views/Order.vue";
import Details from "@/views/Details.vue";
import A from "@/views/A.vue";
import C from "@/views/C.vue";
import B from "@/views/B.vue";
import UI from "@/views/ui.vue"

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

let info = reactive({
  name: 'Tony',
  greet: 0
})
// 复制 info 里的 greet 属性
let rGreet = toRef(info, 'greet')
// 更改 rGreet
const onChangeGreet = () => {
  rGreet.value ++
}
const onChangeInfoGreet = () => {
  info.greet++
}


//=======================toRaw
const original = { name: 'Alice', age: 0 };
const reactiveObj = reactive(original);

// console.log(reactiveObj.name); // 输出：Alice

const rawObj = toRaw(reactiveObj);
// console.log(rawObj === original); // 输出：true

const _toRawOnChangeOriginal = () => {
  original.age++
  console.log('original'+JSON.stringify(original))
  console.log('reactiveObj'+JSON.stringify(reactiveObj))
  console.log('rawObj'+JSON.stringify(rawObj))
}

const _toRawOnChangeReactiveObj = () => {
  reactiveObj.age++
  console.log('original'+JSON.stringify(original))
  console.log('reactiveObj'+JSON.stringify(reactiveObj))
  console.log('rawObj'+JSON.stringify(rawObj))
}
const _toRawOnChangeRawObj = () => {
  rawObj.age++
  console.log('original'+JSON.stringify(original))
  console.log('reactiveObj'+JSON.stringify(reactiveObj))
  console.log('rawObj'+JSON.stringify(rawObj))
}



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


let tableList = reactive([
  {name: 'A', com: markRaw(A)},
  {name: 'B', com: markRaw(B)},
  {name: 'C', com: markRaw(C)},

])

let currentTab = reactive({
  com: tableList[0].com
})
const changeIndex = (index) => {
  currentTab.com = tableList[index].com
}

// 注入
let proObj = ref(100)

provide('order-value',proObj)

const proObjEvent=()=>{
  proObj.value++
}

</script>
<style scoped>

</style>
