import Index from '../views/comment/Index.vue'
import Create from '../views/comment/Create.vue'
import Read from '../views/comment/Read.vue'
import Update from '../views/comment/Update.vue'
import Delete from '../views/comment/Delete.vue'

export default [
    {
        path: '/comments',
        name: 'comments',
        component: Index,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access', 'reader_access'] },
    },
    {
        path: '/comments/create',
        name: 'createcomment',
        component: Create,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access', 'reader_access'] },
    },
    {
        path: '/comments/:id',
        name: 'readcomment',
        component: Read,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access', 'reader_access'] },
    },
    {
        path: '/comments/:id/update',
        name: 'updatecomment',
        component: Update,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access', 'reader_access'] },
    },
    {
        path: '/comments/:id/delete',
        name: 'deletecomment',
        component: Delete,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access', 'reader_access'] },
    },
]
