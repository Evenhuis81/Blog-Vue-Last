import Index from '../views/category/Index.vue'
import Create from '../views/category/Create.vue'
import Read from '../views/category/Read.vue'

export default [
    {
        path: '/categories',
        component: Index,
        children: [
            {
                path: 'create',
                name: 'createcategory',
                component: Create,
                meta: { requiresAuth: true, scopes: ['author_access'] }
            },
            {
                path: '/categories',
                name: 'categories',
                component: Read,
                meta: { requiresAuth: true, scopes: ['author_access'] }
            }
        ]
    }
]
