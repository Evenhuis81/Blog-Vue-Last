import Index from '../views/Index.vue'
import Redirect from '../views/auth/Redirect.vue'

const PageNotFound = { template: "<div>Page Not Found => " + window.location.pathname.substr(1) + "</div>" }

export default [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Redirect
    },
    {
        path: '/404',
        name: 'pagenotfound',
        alias: "*",
        component: PageNotFound
    }
]

// const path = ['/', '/about', '/404', '/redirect', '/register', '/login']
// const name = ['index', 'about', 'pagenotfound', 'redirect', 'register', 'login']
// const component = [Index, About, PageNotFound, Redirect, Register, Login]

// export default routes.map((route) => {
    // route.path = path[index]
    // route.name = name[index]
    // route.component = component[index]
    // if (!route.meta) {
    //     route.meta = {
    //         requiresAuth: false
    //     }
    // } else {
    // route.meta = { requiresAuth: false, ...route.meta }
    // }
    // return route
// });
