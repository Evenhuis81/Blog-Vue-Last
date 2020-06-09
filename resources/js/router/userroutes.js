import AdminDashboard from '../views/user/AdminDashboard.vue'
import AuthorDashboard from '../views/user/AuthorDashboard.vue'
import ReaderDashboard from '../views/user/ReaderDashboard.vue'

export default [
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
        meta: { auth: ['admin'] }
    },
    {
        path: '/authordashboard',
        name: 'authordashboard',
        component: AuthorDashboard,
        meta: { auth: ['author'] }
    },
    {
        path: '/readerdashboard',
        name: 'readerdashboard',
        component: ReaderDashboard,
        meta: { auth: ['reader'] }
    }, 
]