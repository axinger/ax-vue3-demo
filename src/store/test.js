// 引入创建的pinia的defineStore
import {defineStore} from 'pinia'

// pinia仓库的唯一值 (为了区别别的store)
const testName = 'testName'

// defineStore(唯一的值(为了区别别的store),{state(){return{}},actions:{},getters:{}})
const Test = defineStore(testName, {
    state() {
        return {
            num: 0, // 可以直接修改值
            price: 0
        }
    },
    actions: {
        updateNum(val) {
            this.num = val
        }
    },
    getters: {
        numStr() {
            return this.num + "abc"
        }

    },

    // 开启缓存
    persist: {
        // storage: sessionStorage,
        storage: localStorage, // 本地缓存
        paths: ['num'], // 指定缓存的字段
    }
})

export default Test
