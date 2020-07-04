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
                dividerBottom: true
            },
            blogs: {
                title: "Blogs",
                icon: "mdi-folder-multiple-outline",
                route: { name: "blogs" },
                spacing: "mb-0",
                dividerBottom: true
            },
            // comments: {
            //     title: "Comments",
            //     icon: "mdi-clipboard-text-outline",
            //     route: { name: "comments" },
            //     spacing: "mb-0"
            // },
            // categories: {
            //     title: "Categories",
            //     icon: "mdi-format-list-bulleted",
            //     route: { name: "categories" },
            //     spacing: "mb-0"
            // }
        },
        action: {
            blog: [
                {
                title: "Create Blog",
                icon: "mdi-plus",
                route: { name: "createblog" }
                },
                {
                title: "Read Blog",
                icon: "mdi-folder",
                route: { name: "readblog" }
                },
                {
                title: "Update Blog",
                icon: "mdi-update",
                route: { name: "updateblog" }
                },
                {
                title: "Delete Blog",
                icon: "mdi-delete",
                route: { name: "deleteblog" }
                }
            ],
            comment: [
                {
                title: "Create Comment",
                icon: "mdi-plus",
                route: { name: "createcomment" }
                },
                {
                title: "ReadComment",
                icon: "mdi-folder",
                route: { name: "readcomment" }
                },
                {
                title: "UpdateComment",
                icon: "mdi-update",
                route: { name: "updatecomment" }
                },
                {
                title: "DeleteComment",
                icon: "mdi-delete",
                route: { name: "deletecomment" }
                }
            ],
            category: [
                {
                title: "Create Category",
                icon: "mdi-plus",
                route: { name: "createcategory" }
                },
                {
                title: "Read Category",
                icon: "mdi-folder",
                route: { name: "readcategory" }
                },
                {
                title: "Update Category",
                icon: "mdi-update",
                route: { name: "updatecategory" }
                },
                {
                title: "Delete Category",
                icon: "mdi-delete",
                route: { name: "deletecategory" }
                }
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
