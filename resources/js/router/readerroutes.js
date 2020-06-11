import ReaderDashboard from '../views/user/ReaderDashboard.vue'

export default [
    {
        path: '/readerdashboard',
        name: 'readerdashboard',
        component: ReaderDashboard,
        meta: { requiresAuth: true, scopes: ['reader_access'] }
    }
];
