import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Index from '../views/Index.vue'
import About from '../views/About.vue'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
        // component: require('../views/Index.vue').default
        // component: _ => import('../views/Index.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        // beforeEnter: (to, from, next) => {
        //   if (!store.getters['auth/authenticated'])
        //     return next({
        //       name: 'signin'
        //     })
        // }
    },
    {
        path: '/about',
        name: 'about',
        component: About
        // component: require('../views/Index.vue').default
        // component: _ => import('../views/Index.vue')
    },
    // {
    //   path: '/blog/:id',
    //   name: 'blog',
    //   component: Show,
    //   props: true
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
