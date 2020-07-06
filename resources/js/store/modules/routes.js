export default {
    namespaced: true,
    state: {
        main: {
            dashboard: {
                title: "Dashboard",
                icon: "mdi-account",
                route: { name: "dashboard" },
                spacing: "mb-0",
                dividerTop: true,
                dividerBottom: true,
            },
            blogs: {
                title: "Blogs",
                icon: "mdi-folder-multiple-outline",
                route: { name: "blogs" },
                spacing: "mb-0",
                dividerBottom: true,
            },
            categories: {
                title: "Categories",
                icon: "mdi-format-list-bulleted",
                route: { name: "categories" },
                spacing: "mb-0",
                dividerBottom: true,
                auth: 'author'
            },
            comments: {
                title: "Comments",
                icon: "mdi-clipboard-text-outline",
                route: { name: "comments" },
                spacing: "mb-0",
                dividerBottom: true
            }
        },
        action: {
            BlogActions: [
                {
                    title: "Create Blog",
                    actionIcon: "mdi-plus",
                    route: { name: "createblog" }
                },
                // {
                //     title: "Read Blog",
                //     actionIcon: "mdi-folder",
                //     route: { name: "readblog" }
                // },
                // {
                //     title: "Update Blog",
                //     actionIcon: "mdi-update",
                //     route: { name: "updateblog" }
                // },
                // {
                //     title: "Delete Blog",
                //     actionIcon: "mdi-delete",
                //     route: { name: "deleteblog" }
                // }
            ],
            CommentActions: [
                {
                    title: "Create Comment",
                    actionIcon: "mdi-plus",
                    route: { name: "createcomment" }
                },
                // {
                // title: "Read Comment",
                // actionIcon: "mdi-folder",
                // route: { name: "readcomment" }
                // },
                // {
                // title: "Update Comment",
                // actionIcon: "mdi-update",
                // route: { name: "updatecomment" }
                // },
                // {
                // title: "Delete Comment",
                // actionIcon: "mdi-delete",
                // route: { name: "deletecomment" }
                // }
            ],
            CategoryActions: [
                {
                    title: "Create Category",
                    actionIcon: "mdi-plus",
                    route: { name: "createcategory" }
                },
                // {
                // title: "Read Category",
                // actionIcon: "mdi-folder",
                // route: { name: "readcategory" }
                // },
                // {
                // title: "Update Category",
                // actionIcon: "mdi-update",
                // route: { name: "updatecategory" }
                // },
                // {
                // title: "Delete Category",
                // actionIcon: "mdi-delete",
                // route: { name: "deletecategory" }
                // }
            ]
        }
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
