import Index from '../views/Index.vue'
import Show from '../views/Show.vue'
import About from '../views/About.vue'
import Redirect from '../views/Redirect.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const PageNotFound = { template: "<div>Page Not Found => " + window.location.pathname.substr(1) + "</div>" }

const routes = [
    {
        // => index
    },
    {
        // => about
    },
    {
        // => blog/id
        props: true
    },
    {
        // => 404
        alias: "*",
    },
    {
        // => redirect
    },
    {
        // => register
        meta: { guestRouteOnly: true }
    },
    {
        // => login
        meta: { guestRouteOnly: true }
    },
]

const path = ['/', '/about', '/blog/:id', '/404', '/redirect', '/register', '/login']
const name = ['index', 'about', 'blog', 'pagenotfound', 'redirect', 'register', 'login']
const component = [Index, About, Show, PageNotFound, Redirect, Register, Login]

export default routes.map((route, index) => {
    route.path = path[index]
    route.name = name[index]
    route.component = component[index]
    if (!route.meta) {
        route.meta = {
            requiresAuth: false
        }
    } else {
        route.meta = { requiresAuth: false, ...route.meta }
    }
    return route
});
