import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
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
