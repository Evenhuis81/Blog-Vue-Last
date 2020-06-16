import Show from '../views/Show.vue'
import CreateBlog from '../views/CreateBlog.vue'
import store from "../store"

export default [
    {    
        path: '/blog/:id',
        name: 'blog',
        props: true,
        component: Show,
        beforeEnter (to, from, next) {
            // let arr = store.getters[]
            console.log(to.params.id);
            next();
        }
    },
    {    
        path: '/blog/create',
        name: 'createblog',
        component: CreateBlog,
        meta: { requiresAuth: true , scope: 'author_access'},
    },
]
