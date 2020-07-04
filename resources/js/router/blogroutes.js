import Show from '../views/blog/Show.vue'
import Comments from '../components/Comments.vue'
import CreateBlog from '../views/blog/Create.vue'
import IndexBlogs from '../views/blog/Index.vue'
import EditBlog from '../views/blog/Edit.vue'
import store from '../store'

export default [
    {
        path: '/blog/:id',
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
        path: '/createblog',
        name: 'createblog',
        component: CreateBlog,
        meta: { requiresAuth: true, scopes: ['author_access'] },
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: IndexBlogs,
        meta: { requiresAuth: true, scopes: ['author_access'] },
    },
    {
        path: '/editblog/:id',
        name: 'editblog',
        component: EditBlog,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        props: true,
        beforeEnter: (to, from, next) => {
            if (store.getters['blogs/blogs'].map(x => x.id).includes(parseInt(to.params.id))) {
                if (store.getters['auth/userId'] == store.getters['blogs/blog'](to.params.id).owner_id) {
                    next()
                } else {
                    store.dispatch('snackbar/lunchRoom', {
                        text: "You are not authorized for this route!",
                        color: "error"
                    })
                    return next({ name: "redirect" })
                }
            } else {
                next({ name: 'pagenotfound' })
            }
        },
    },
]
