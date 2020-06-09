import Index from '../views/Index.vue'
import Show from '../views/Show.vue'
import About from '../views/About.vue'

const PageNotFound = { template: "<div>Page Not Found</div>" };


export default [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/blog/:id',
        name: 'blog',
        component: Show,
        props: true
    },
    {
        path: "/404",
        alias: "*",
        name: "pagenotfound",
        component: PageNotFound
    }
]
