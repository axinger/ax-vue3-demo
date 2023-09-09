import {createRouter,createWebHistory} from 'vue-router'

import Home from "@/views/Home.vue";
import User from "@/views/News.vue";

// 这个名字一定要叫routes不能为其他名称，否则报错
const routes = [
    {
        path: "/",
        name: 'home',
        component: Home,
    },
    {
        path: "/user",
        name: 'User',
        component: User,
    }
]

// 2.初始化创建VueRouter实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
