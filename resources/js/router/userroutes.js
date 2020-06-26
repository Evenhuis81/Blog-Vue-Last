import Dashboard from '../views/user/Dashboard.vue'

export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, scopes: ['admin_access', 'reader_access', 'author_access'] }
    },
]
