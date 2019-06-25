import Vue from 'vue';
import Router from 'vue-router';

import NotFound from '@/views/NotFound.vue';

import ListView from '@/components/ListView.vue';
import PlayerProfile from '@/components/PlayerProfile.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'list',
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
    },
    {
      path: '/player',
      component: PlayerProfile,
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
    },
  ],
});
