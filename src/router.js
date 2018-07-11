import Vue from 'vue';
import Router from 'vue-router';
import List from './views/List.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'list/ban',
    },
    {
      path: '/list/:type',
      name: 'list',
      component: List,
      props: true,
    },
  ],
});
