import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRoutes from './mainroutes.js'

Vue.use(VueRouter)

// const routes = MainRoutes

// global.router = new VueRouter({
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: MainRoutes
})

export default router
