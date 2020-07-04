import Index from '../views/main/Index.vue'
import Show from '../views/main/Show.vue'
import Comments from '../components/Comments.vue'
import Redirect from '../views/main/Redirect.vue'
// import SnackButton from '../components/SnackButton.vue'
const PageNotFound = { template: "<div>Page Not Found => " + window.location.pathname.substr(1) + "</div>" }
import store from '../store'

export default [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/blogs/:id/show',
        component: Show,
        props: true,
        beforeEnter: (to, from, next) => {
            if (store.getters['blogs/blogs'].map(x => x.id).includes(parseInt(to.params.id))) {
                next();
            } else {
                next({ name: 'pagenotfound' })
            }
        },
        children: [
            {
                path: '',
                name: 'blog',
                component: Comments
            }
        ]
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Redirect
    },
    // {
    //     path: '/snackbutton',
    //     component: SnackButton
    // },
    {
        path: '/404',
        name: 'pagenotfound',
        alias: "*",
        component: PageNotFound
    }
]
