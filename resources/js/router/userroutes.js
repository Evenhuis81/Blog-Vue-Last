import AdminDashboard from '../views/user/AdminDashboard.vue'
import AuthorDashboard from '../views/user/AuthorDashboard.vue'
import ReaderDashboard from '../views/user/ReaderDashboard.vue'

const routes =  [
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
    },
    {
        path: '/authordashboard',
        name: 'authordashboard',
        component: AuthorDashboard,
    },
    {
        path: '/readerdashboard',
        name: 'readerdashboard',
        component: ReaderDashboard,
    }, 
];

const auth = ['admin', 'author', 'reader'];

export default routes.map((route, index) => 
    {
        const meta = 
        {
            autherize: [auth[index]]
        }
    
        return { ...route, meta }
    });