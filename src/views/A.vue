
<template>
  <div>

    我是A
    {{ num }} <br>
    <el-button @click="addNum">A改变数据</el-button>
    <br>

    inject注入值:{{ injectObj }}<br>

    <el-button @click="testEvent">修改状态的值</el-button>
    <el-button @click="restEvent">重置状态的值</el-button>
    <br>
    状态管理值方式1: {{ test.num }}<br>
    状态管理值方式2: {{ numA }}<br>
    状态管理值price: {{ price }}<br>
    状态管理值numStr: {{ numStr }}<br>

  </div>


</template>

<script setup>
import mixin from '@/mixin/addBtn.js'
// 引入pinia index导出的是Test
import Test from '@/store/test.js'
import {storeToRefs} from "pinia";


const {addNum, num} = mixin();

// eslint-disable-next-line no-undef
const injectObj = inject("order-value")


// 方式一
let test = Test()

// 方式二
let {num: numA, price, numStr} = storeToRefs(Test())

const testEvent = () => {
  // test.num++
  numA.value++
  price.value++
  //批量修改数据

}

const restEvent = () => {
  test.$reset()
}
</script>


<style scoped>

</style>
