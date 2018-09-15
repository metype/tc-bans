import Vue from 'vue';
import {
  Vuetify,
  VApp,
  VBtn,
  VCard,
  VDataTable,
  VDivider,
  VGrid,
  VIcon,
  VList,
  VProgressLinear,
  VTextField,
  VToolbar
} from 'vuetify';

require('vuetify/src/stylus/app.styl')


Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VDataTable,
    VDivider,
    VGrid,
    VIcon,
    VList,
    VProgressLinear,
    VTextField,
    VToolbar
  }
});