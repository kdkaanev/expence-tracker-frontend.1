import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/authStore.js'

import App from './App.vue'
import router from './router'
import '@picocss/pico/css/pico.min.css'
import "@fortawesome/fontawesome-free/css/all.css";


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'





import {faNewspaper} from '@fortawesome/free-solid-svg-icons'
import { faUtensils, faPlane, faShoppingBag, faFileInvoice, faDollarSign, faTag }
  from "@fortawesome/free-solid-svg-icons";


library.add(faNewspaper,faUtensils, faPlane, faShoppingBag, faFileInvoice, faDollarSign, faTag)


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')


