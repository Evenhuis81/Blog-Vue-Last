export default {
    namespaced: true,
    state: {
        blogs: [],
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        },
    },
    actions: {
        // createBlog({ commit }, blog) {
        //     this.$http().post('/api/blogs', blog)
        //         .then(res => {
        //             commit('CREATE_BLOG', res.data)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // },
        getBlogs({ commit }) {
            this._vm.$http.get('/api/blogs')
                .then(res => {

                    commit('set_blogs', res.data)
                }).catch(err => {
                    console.log(err)
                })
        },
        // setBlog({ commit, state }, id) {
        //     // state.blog = state.blogs[id];
        //     console.log(id);
        //     commit('set_blog', id);
        // }
        // fetchCategories({ commit }) {
        //     this.$http().get('api/categories')
        //         .then(res => {
        //             commit('FETCH_CATEGORIES', res.data)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // },
        // deleteBlog({ commit }, blog) {
        //     this.$http().delete(`/api/blogs/${blog.id}`)
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
        // getBlog: state => {
        //     return state.blog;
        // },
    }
}
