import Index from '../views/Index.vue'
import Show from '../views/Show.vue'
import About from '../views/About.vue'
// import store from '../store'

// import PageNotFound from '../views/PageNotFound.vue'

export default [
    // {
        // path: '*', component: PageNotFound
    // },
    {
        path: '/',
        name: 'index',
        component: Index
        // component: require('../views/Index.vue').default
        // component: _ => import('../views/Index.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        // beforeEnter: (to, from, next) => {
        // if (!store.getters['auth/authenticated']) {
        // if (false) {
        //     next({
        //         name: 'index'
        //     })
        // } else {
        //     next()
        // }
        // },
    },
    {
        path: '/blog/:id',
        name: 'blog',
        component: Show,
    },
    // {
    //     path: "/404",
    //     alias: "*",
    //     name: "PageNotFound",
    //     component: () =>
    //         import(/* webpackChunkName: "NotFound" */"../views/PageNotFound")
    // }
]