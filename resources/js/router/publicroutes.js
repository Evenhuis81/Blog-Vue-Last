import Index from '../views/Index.vue';
import Show from '../views/Show.vue';
import About from '../views/About.vue';
import Redirect from '../views/Redirect.vue';
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const PageNotFound = { template: "<div>Page Not Found</div>" };

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/blog/:id',
        name: 'blog',
        component: Show,
        props: true
    },
    {
        path: "/404",
        alias: "*",
        name: "pagenotfound",
        component: PageNotFound
    },
    {
        path: "/auth/redirect",
        name: "redirect",
        component: Redirect
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { guestRouteOnly: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { guestRouteOnly: true }
    },
];

export default routes.map((route) => 
    {
        const meta = 
        {
            requiresAuth: false
        }
    
        return { ...route, meta };
    });
