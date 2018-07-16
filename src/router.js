import Vue from 'vue';
import Router from 'vue-router';

import NotFound from '@/views/NotFound';

import ListView from '@/components/ListView';
import PlayerProfile from '@/components/PlayerProfile';

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
      component: ListView,
      props: true,
    },
    {
      path: '/player/:name',
      name: 'player',
      component: PlayerProfile,
      props: true,
    },
    {
      path: '*',
      component: NotFound,
    }
  ],
});
