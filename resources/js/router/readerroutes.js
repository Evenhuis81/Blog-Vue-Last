import ReaderDashboard from '../views/user/ReaderDashboard.vue'

export default [
    {
        path: '/readerdashboard',
        name: 'readerdashboard',
        component: ReaderDashboard,
        meta: { requiresAuth: true, scope: 'reader_access' }
    }
];
