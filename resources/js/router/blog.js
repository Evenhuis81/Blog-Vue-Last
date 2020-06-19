import ShowBlog from '../views/blog/ShowBlog.vue'
import UserDashboard from '../views/user/UserDashboard.vue'
// import UserProfile from '../components/user/Profile.vue'
import UserBlogs from '../components/user/Blogs.vue'
import CreateBlog from '../views/blog/CreateBlog.vue'

import store from "../store"

export default [
    {    
        path: '/show/:id',
        name: 'blog',
        props: true,
        component: ShowBlog,
        
        beforeEnter (to, from, next) {
            console.log(store.getters["blogs/blogs"])
            // let arr = store.getters[]
            console.log(to.params.id);
            next();
        }
    },
    {    
        path: '/user/:id/',
        name: 'user',
        component: UserDashboard,
        meta: { requiresAuth: true },
        children: [
            // {
            //     path: 'profile',
            //     component: UserProfile
            // },
            {
                path: 'blogs',
                component: UserBlogs
            },
            {
                path: 'createblog',
                component: CreateBlog
            }
          ]
    },
]
