import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@picocss/pico/css/pico.min.css'
import "@fortawesome/fontawesome-free/css/all.css";


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



import {faNewspaper} from '@fortawesome/free-solid-svg-icons'

library.add(faNewspaper)


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')


