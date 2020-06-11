import AdminDashboard from '../views/user/AdminDashboard.vue'

export default [
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, scopes: ['admin_access'] }
    },
]
