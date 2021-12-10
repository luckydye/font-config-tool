import { createApp } from 'vue';
import App from './App.vue';

// lit components
import './components/Button';
import DynamicStyles from './components/DynamicStyle';

DynamicStyles.init();

createApp(App).mount('#app');
