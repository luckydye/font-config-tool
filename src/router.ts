import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Configurator from './views/Configurator.vue';
import Examples from './views/Examples.vue';
import Resources from './views/Resources.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/configurator',
      name: 'Configurator',
      component: Configurator,
    },
    {
      path: '/examples',
      name: 'Examples',
      component: Examples,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    },
  ],
});

export default router;
