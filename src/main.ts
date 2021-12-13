import { createApp } from 'vue';
import App from './App.vue';

// lit components
import './components/Button';
import './components/HeaderBackground';
import './components/ChildSelector';
import './components/SpoilerHint';

// other
import DynamicStyles from './components/DynamicStyle';

DynamicStyles.init();

window.addEventListener('scroll', e => {
    document.body.style.setProperty('--scrollY', `${window.scrollY}px`);
})

createApp(App).mount('#app');
