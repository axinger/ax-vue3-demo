<script setup>
import mixin from '@/mixin/addBtn.js'
import Test from "@/store/test.js";

const {addNum, num} = mixin();

let test = Test()

const testEvent = () => {
  test.num++
}
</script>

<template>
  <div>
    我是B
    {{ num }} <br>

    <el-button @click="addNum">A改变数据</el-button> <br>

    <el-button @click="testEvent">修改状态的值</el-button>
    <br>
    状态管理值: {{test.num}}
  </div>
</template>

<style scoped>

</style>
