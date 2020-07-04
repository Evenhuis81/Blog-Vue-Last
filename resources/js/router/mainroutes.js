import Index from '../views/main/Index.vue'
import Redirect from '../views/main/Redirect.vue'
import SnackButton from '../components/SnackButton.vue'

const PageNotFound = { template: "<div>Page Not Found => " + window.location.pathname.substr(1) + "</div>" }

export default [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Redirect
    },
    {
        path: '/snackbutton',
        component: SnackButton
    },
    {
        path: '/404',
        name: 'pagenotfound',
        alias: "*",
        component: PageNotFound
    }
]
