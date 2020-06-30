import Index from '../views/category/Index.vue'
import Create from '../views/category/Create.vue'
import Read from '../views/category/Read.vue'

export default [
    {
        path: '/categories',
        component: Index,
        meta: { requiresAuth: true, scopes: ['author_access'] },
        children: [
            {
                path: 'create',
                name: 'createcategory',
                component: Create,

            },
            // {
            //     path: '/categories',
            //     name: 'categories',
            //     component: Index,
            //     meta: { requiresAuth: true, scopes: ['author_access'] }
            // }
        ]
    }
]
