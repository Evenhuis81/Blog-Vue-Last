import Show from '../views/blog/Show.vue'
import CreateBlog from '../views/blog/Create.vue'
import Comments from '../components/Comments.vue'
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
]
