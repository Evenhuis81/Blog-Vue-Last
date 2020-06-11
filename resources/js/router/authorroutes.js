import AuthorDashboard from '../views/user/AuthorDashboard.vue'

export default [
    {
        path: '/authordashboard',
        name: 'authordashboard',
        component: AuthorDashboard,
        meta: { requiresAuth: true, scopes: ['author_access'] }
    },
]