import ReaderDashboard from '../views/user/ReaderDashboard.vue'

export default [
    {
        path: '/readerdashboard',
        name: 'readerdashboard',
        component: ReaderDashboard,
        meta: { public: false, role: 'reader' }
    }
];
