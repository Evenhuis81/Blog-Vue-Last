import ShowBlog from '../views/ShowBlog.vue'
import store from '../store'

export default [
    {    
        path: '/blog/:id',
        name: 'blog',
        component: ShowBlog,
        props: true,
        beforeEnter: (to, from, next) => {
            if (store.getters['blogs/blogs'].map(x => x.id).includes(parseInt(to.params.id))) {
                next();
            } else {
                next({ name: 'pagenotfound' })
            }
        }
    },
]
