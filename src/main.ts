import { createApp } from 'vue';
import router from './router';
import App from './views/App.vue';

window.addEventListener('scroll', e => {
    document.body.style.setProperty('--scrollY', `${window.scrollY}px`);
})

createApp(App).use(router).mount('#app');
