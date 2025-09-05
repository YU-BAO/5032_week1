import './assets/main.css'

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from '../router'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router);

app.mount('#app')
