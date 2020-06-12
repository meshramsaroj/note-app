import Router from 'vue-router';
import Home from './views/Home.vue';
import Callback from './views/Callback.vue';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
  ],
});
