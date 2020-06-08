import Index from '../views/Index.vue'
import Show from '../views/Show.vue'
import About from '../views/About.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AuthorDashboard from '../views/AuthorDashboard.vue'
import ReaderDashboard from '../views/ReaderDashboard.vue'
// import store from '../store'

import PageNotFound from '../views/PageNotFound.vue'

export default [
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
    },
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
    },
    {
        path: '/authordashboard',
        name: 'authordashboard',
        component: AuthorDashboard,
    },
    {
        path: '/readerdashboard',
        name: 'readerdashboard',
        component: ReaderDashboard,
    }, 
    {
        path: '/blog/:id',
        name: 'blog',
        component: Show,
    },
    {
        path: "/404",
        alias: "*",
        name: "PageNotFound",
        component: PageNotFound
    //     component: () =>
    //         import(/* webpackChunkName: "NotFound" */"../views/PageNotFound")
    }
]