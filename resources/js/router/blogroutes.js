import Index from '../views/blog/Index.vue'
import Create from '../views/blog/Create.vue'
import Read from '../views/blog/Read.vue'
import Update from '../views/blog/Update.vue'
import Delete from '../views/blog/Delete.vue'
import store from '../store'

export default [
    {
        path: '/blogs',
        name: 'blogs',
        component: Index,
        meta: { requiresAuth: true, scopes: ['author_access'] },
    },
    {
        path: '/blogs/create',
        name: 'createblog',
        component: Create,
        meta: { requiresAuth: true, scopes: ['author_access'] },
    },
    {
        path: '/blogs/read',
        name: 'readblog',
        component: Read,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    },
    {
        path: '/blogs/update',
        name: 'updateblog',
        component: Update,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        // props: true,
        // beforeEnter: (to, from, next) => {
            // if (store.getters['blogs/blogs'].map(x => x.id).includes(parseInt(to.params.id))) {
            //     if (store.getters['auth/userId'] == store.getters['blogs/blog'](to.params.id).owner_id) {
            //         next()
            //     } else {
            //         store.dispatch('snackbar/snackbar', {
            //             text: "You are not authorized for this route!",
            //             color: "error"
            //         })
            //         return next({ name: "redirect" })
            //     }
            // } else {
            //     next({ name: 'pagenotfound' })
            // }
        // },
    },
    {
        path: '/blogs/delete',
        name: 'deleteblog',
        component: Delete,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    }
]
