import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import icons from './dependencies/fontawesome'

createApp(App).use(router).use(icons).mount('#app')
