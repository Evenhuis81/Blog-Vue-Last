import Index from '../views/category/Index.vue'
import Create from '../views/category/Create.vue'

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
        ]
    }
]
