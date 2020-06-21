import Index from '../views/Index.vue'
import About from '../views/About.vue'
import Redirect from '../views/auth/Redirect.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ShowBlog from '../views/ShowBlog.vue'
import store from '../store'

const PageNotFound = { template: "<div>Page Not Found => " + window.location.pathname.substr(1) + "</div>" }

export default [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Redirect
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { guestRouteOnly: true }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { guestRouteOnly: true },
    },
    {
        path: '/blog/:id',
        name: 'blog',
        component: ShowBlog,
        props: true,
        beforeEnter: (to, from, next) => {
            if (store.getters['blogs/blogs'].map(x => x.id).includes(parseInt(to.params.id))) {
                next();
            } else {
                next({ name: 'pagenotfound' })
            }
        }
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
