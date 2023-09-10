// 引入创建的pinia的defineStore
import {defineStore} from 'pinia'

// pinia仓库的唯一值 (为了区别别的store)
const testName = 'user'

// defineStore(唯一的值(为了区别别的store),{state(){return{}},actions:{},getters:{}})
const User = defineStore(testName, {
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
    }
})

export default User()
