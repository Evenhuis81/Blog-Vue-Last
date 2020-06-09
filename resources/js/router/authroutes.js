import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export default [
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
]