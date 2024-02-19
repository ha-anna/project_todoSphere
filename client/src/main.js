import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import icons from './plugins/icons';

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon)
  .use(icons).mount('#app')
