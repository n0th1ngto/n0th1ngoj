import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'
import '@/access'
import 'bytemd/dist/index.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import lazyLoad from './directives/lazyload'

createApp(App).directive('lazy', lazyLoad).use(ArcoVue).use(ArcoVueIcon).use(VCalendar, {}).use(createPinia()).use(router).mount('#app')
