export default {
    namespaced: true,
    state: {
        blogs: [],
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        },
        // set_blog(state, id) {
        //     state.blog = state.blogs[id];
        // }
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
        getBlogs({ commit }) {
            axios.get('/api/blogs')
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
        // getBlog: state => {
        //     return state.blog;
        // },
        // getParams: (state, getters, rootState) => {
        //     return rootState.route.params;
        // }
        // gett(state) {
        //     return state.blogs.find(blog => blog.id === 25)
        // return state.blogs.find(blog => blog.id === id);
        // }
        // categories: state => {
        //     return state.categories
        // }
        // categories: state => {
        //     return state.categories
        // }
    }
}
