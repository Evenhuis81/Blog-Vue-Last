import Index from '../views/category/Index.vue'
import Create from '../views/category/Create.vue'
import Read from '../views/category/Read.vue'
import Update from '../views/category/Update.vue'
import Delete from '../views/category/Delete.vue'

export default [
    {
        path: '/categories',
        name: 'categories',
        component: Index,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    },
    {
        path: '/categories/create',
        name: 'createcategory',
        component: Create,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    },
    {
        path: '/categories/:id',
        name: 'readcategory',
        component: Read,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    },
    {
        path: '/categories/:id/update',
        name: 'updatecategory',
        component: Update,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    },
    {
        path: '/categories/:id/delete',
        name: 'deletecategory',
        component: Delete,
        meta: { requiresAuth: true, scopes: ['author_access', 'admin_access'] },
    },
]
