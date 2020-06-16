import Show from '../views/Show.vue'
import CreateBlog from '../views/CreateBlog.vue'

export default [
    {    
        path: '/blog/:id',
        name: 'blog',
        props: true,
        component: Show,
    },
    {    
        path: '/blog/create',
        name: 'createblog',
        component: CreateBlog,
        meta: { requiresAuth: true , scope: 'author_access'}
    },
]
