import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Configurator from './views/Configurator.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/configurator',
            name: 'Configurator',
            component: Configurator
        }
    ]
});

export default router;