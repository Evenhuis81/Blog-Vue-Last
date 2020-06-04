import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRoutes from './mainroutes.js'
import AuthRoutes from "./authroutes.js"

Vue.use(VueRouter)

// const routes = MainRoutes

// global.router = new VueRouter({
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...MainRoutes,
        ...AuthRoutes
        //etc. 
  
        //Note '...' here is "spread operator" and not ellipsis
      ]
})

// router.beforeEach((to, from, next) => {
//     if(to.meta.requiresAuth) {
//         console.log('req');
//     } else {
//         console.log('vit');
//     }
// });


export default router
