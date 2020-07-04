import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRoutes from './mainroutes.js'
import AuthRoutes from "./authroutes.js"
import UserRoutes from "./userroutes.js"
import BlogRoutes from "./blogroutes.js"
import CategoryRoutes from "./categoryroutes.js"
import CommentRoutes from "./commentroutes.js"
import BeforeEach from './beforeeach.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...MainRoutes,
    ...AuthRoutes,
    ...UserRoutes,
    ...BlogRoutes,
    ...CategoryRoutes,
    ...CommentRoutes
  ]
})

router.beforeEach(BeforeEach)

export default router
