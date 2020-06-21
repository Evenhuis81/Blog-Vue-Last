import ReaderDashboard from '../views/reader/Dashboard.vue'
import store from '../store'

export default [
    {    
        path: '/reader/:id/',
        name: 'readerdashboard',
        component: ReaderDashboard,
        props: true,
        meta: { requiresAuth: true, scopes: ['reader_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                next();
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },
]
