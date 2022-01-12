import { createApp } from 'vue';
import router from './router';
import App from './views/App.vue';

window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scrollY', `${window.scrollY}px`);
});

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => customElements.get(tag) != null;
app.use(router).mount('#app');
