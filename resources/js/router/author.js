import AuthorDashboard from '../views/author/Dashboard.vue'
import AuthorBlogs from '../views/author/Blogs.vue'
import CreateBlog from '../views/author/CreateBlog.vue'
import store from '../store'

export default [
    {    
        path: '/author/:id/',
        name: 'authordashboard',
        component: AuthorDashboard,
        props: true,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        beforeEnter: (to, from, next) => {
            console.log('trigger')
            if (to.params.id == store.getters['auth/userId']) {
                console.log(to)
                next()
            } else {
                next({ name: 'pagenotfound' })
            }
        },
        children: [
            {
                path: 'blogs',
                component: AuthorBlogs,
                meta: { scopes: ['author_access'] }
            },
            {
                path: 'createblog',
                component: CreateBlog,
                meta: { scopes: ['author_access'] },
            },
            {
                path: '404',
                alias: '*',
                component: { template: "<div>Page(2) Not Found => " + window.location.pathname.substr(1) + "</div>" },
                meta: { scopes: ['author_access'] }
            }
          ]
    },
]
