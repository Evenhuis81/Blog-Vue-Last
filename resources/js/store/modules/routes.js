export default {
    namespaced: true,
    state: {
        dashboard: {
            title: "Dashboard",
            icon: "mdi-account",
            route: { name: "dashboard" }
            },
        blogActions: [
            {
            title: "My Blogs",
            icon: "mdi-folder-multiple-outline",
            route: { name: "myblogs" }
            },
            {
            title: "Create New Blog",
            icon: "mdi-plus",
            route: { name: "createblog" }
            },
            {
            title: "Manage Categories",
            icon: "mdi-dresser",
            route: { path: "/categories" }
            }
        ]
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    getters: {
        routes: state => {
            return state
        }
    }
}
