import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router/index.js";
import ElementPlus from "element-plus";

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
