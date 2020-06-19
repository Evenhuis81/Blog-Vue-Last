import Dashboard from '../views/user/Dashboard.vue'
import UserBlogs from '../views/blog/Blogs.vue'
import CreateBlog from '../views/blog/CreateBlog.vue'

export default [
    {    
        path: '/user/:id/',
        name: 'user',
        component: Dashboard,
        meta: { requiresAuth: true, scopes: ['reader_access', 'author_access'] },
        children: [
            {
                path: 'blogs',
                component: UserBlogs,
                meta: { scopes: ['author_access'] },
            },
            {
                path: 'createblog',
                component: CreateBlog,
                meta: { scopes: ['author_access'] },
            }
          ]
    },
]
