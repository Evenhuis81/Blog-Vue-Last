import Vue from 'vue';
import VueRouter from 'vue-router';
import MainRoutes from './mainroutes.js';
import AuthRoutes from "./authroutes.js";
import store from "../store";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...MainRoutes,
    ...AuthRoutes
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = store.getters['auth/unverifiedToken'];
  if (token) {
    await store.dispatch('auth/verifyToken').catch(() => {
      return;
    });
  }
  console.log(store.getters['auth/authenticated']);
  if (to.meta.guestRouteOnly) {
    //
  }
  next();
});


export default router
