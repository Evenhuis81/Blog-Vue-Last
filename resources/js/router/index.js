import Vue from 'vue';
import VueRouter from 'vue-router';
import MainRoutes from './mainroutes.js';
import AuthRoutes from "./authroutes.js";
import UserRoutes from "./userroutes.js";
import beforeEach from './beforeEach.js';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...MainRoutes,
    ...AuthRoutes,
    ...UserRoutes
  ]
})

router.beforeEach(beforeEach);

export default router
