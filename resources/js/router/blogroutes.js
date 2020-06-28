import Show from '../views/blog/Show.vue'
import Comments from '../components/Comments.vue'
import CreateBlog from '../views/blog/Create.vue'
import ReadBlog from '../views/blog/Read.vue'
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
        path: '/readblog',
        name: 'readblog',
        component: ReadBlog,
        meta: { requiresAuth: true, scopes: ['author_access'] },
    },
    {
        path: '/editblog/:id',
        name: 'editblog',
        component: EditBlog,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        props: true,
        beforeEnter: (to, from, next) => {
            next()
        }
    },
]
