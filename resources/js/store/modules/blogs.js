export default {
    // namespaced: true,
    state: {
        blogs: [],
    },
    mutations: {
        fetch_blogs(state, blogs) {
            return state.blogs = blogs
        }
    },
    actions: {
        // createBlog({ commit }, blog) {
        //     axios.post('/api/blogs', blog)
        //         .then(res => {
        //             commit('CREATE_BLOG', res.data)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // },
        fetchBlogs({ commit }) {
            axios.get('/api/blogs')
                .then(res => {
                    commit('fetch_blogs', res.data)
                }).catch(err => {
                    console.log(err)
                })
        },
        // fetchCategories({ commit }) {
        //     axios.get('api/categories')
        //         .then(res => {
        //             commit('FETCH_CATEGORIES', res.data)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // },
        // deleteBlog({ commit }, blog) {
        //     axios.delete(`/api/blogs/${blog.id}`)
        //         .then(res => {
        //             if (res.data === 'ok')
        //                 commit('DELETE_BLOG', blog)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // }
    },
    getters: {
        blogs: state => {
            return state.blogs
        },
        // categories: state => {
        //     return state.categories
        // }
    }
}
