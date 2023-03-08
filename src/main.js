import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@/assets/styles/quasar.scss'
import 'quasar/dist/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { createMetaManager } from 'vue-meta'

createApp(App).use(Quasar, quasarUserOptions)
.use(createMetaManager()).use(store).use(router).mount('#app')