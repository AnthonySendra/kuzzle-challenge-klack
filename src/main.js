import {} from './style/global.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import {configRouter} from './routeConfig';
import store from './vuex/store';

import userStore from './store/user';

Vue.use(VueRouter);

Vue.config.debug = true;

export var router = new VueRouter();

sync(store, router);

configRouter(router);

userStore.getCurrentUser(function () {
  router.start({ store }, '#app');
});
