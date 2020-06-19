import AdminDashboard from '../views/admin/AdminDashboard.vue'

export default [
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, scope: 'admin_access' }
    },
]
