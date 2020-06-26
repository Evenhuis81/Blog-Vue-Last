import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

export default [
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
]
