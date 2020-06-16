import Vue from 'vue';
import VueRouter from 'vue-router';
import PublicRoutes from './publicroutes.js';
import AdminRoutes from "./adminroutes.js";
import AuthorRoutes from "./authorroutes.js";
import ReaderRoutes from "./readerroutes.js";
import BeforeEach from './beforeeach.js';
import blog from './blog.js';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...blog,
    ...PublicRoutes,
    ...AdminRoutes,
    ...AuthorRoutes,
    ...ReaderRoutes,
  ]
})

router.beforeEach(BeforeEach);

export default router
