import AuthorDashboard from '../views/user/AuthorDashboard.vue'

export default [
    {
        path: '/authordashboard',
        name: 'authordashboard',
        component: AuthorDashboard,
        meta: { public: false, role: 'author' }
    },
]