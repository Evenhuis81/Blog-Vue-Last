import Vue from 'vue';
import VueRouter from 'vue-router';
import Public from './public.js';
import Admin from "./admin.js";
import Author from "./author.js";
import Reader from "./reader.js";
import BeforeEach from './beforeeach.js';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...Public,
    ...Admin,
    ...Author,
    ...Reader
  ]
})

router.beforeEach(BeforeEach);

export default router
