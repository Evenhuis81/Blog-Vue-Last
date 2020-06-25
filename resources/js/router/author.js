import AuthorDashboard from '../views/author/Dashboard.vue'
import AuthorProfile from '../views/author/Profile.vue'
import AuthorBlogs from '../views/author/Blogs.vue'
import ReadBlog from '../views/author/ReadBlog.vue'
import CreateBlog from '../views/author/CreateBlog.vue'
import EditBlog from '../views/author/EditBlog.vue'
import DeleteBlog from '../views/author/DeleteBlog.vue'
import store from '../store'

export default [
    {
        path: '/author/:id/',
        name: 'authordashboard',
        component: AuthorDashboard,
        props: true,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                // store.dispatch('layoutelements/setNavigationDrawer', true)
                // store.dispatch('layoutelements/setAppBarNavIcon', true)
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        },
        children: [
            {
                path: 'profile',
                component: AuthorProfile,
                meta: { scopes: ['author_access'] }
            },
            // {
            //     path: '404',
            //     alias: '*',
            //     component: { template: "<div>Page(2) Not Found => " + window.location.pathname.substr(1) + "</div>" },
            //     meta: { scopes: ['author_access'] }
            // }
        ]
    },
    {
        path: '/author/:id/index',
        name: 'authorindex',
        component: AuthorBlogs,
        props: true,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },
    {
        path: '/author/:id/createblog',
        name: 'createblog',
        component: CreateBlog,
        props: true,
        meta: { scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },
    {
        path: '/author/:id/readblog',
        name: 'readblogindex',
        component: ReadBlog,
        props: true,
        meta: { scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },

    {
        path: '/author/:id/editblog',
        name: 'editblogindex',
        component: EditBlog,
        props: true,
        meta: { scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },
    {
        path: '/author/:id/deleteblog',
        name: 'deleteblogindex',
        component: DeleteBlog,
        props: true,
        meta: { scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            if (to.params.id == store.getters['auth/userId']) {
                store.dispatch('layoutelements/setNavigationDrawer', true)
                store.dispatch('layoutelements/setAppBarNavIcon', true)
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },
]
