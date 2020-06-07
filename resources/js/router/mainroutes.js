import Index from '../views/Index.vue'
import Show from '../views/Show.vue'
import About from '../views/About.vue'
import UserDashboard from '../views/UserDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
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
        path: '/userdashboard',
        name: 'userdashboard',
        component: UserDashboard,
    },
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
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