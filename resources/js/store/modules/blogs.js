export default {
    namespaced: true,
    state: {
        blogs: [],
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        },
        create_blog(state, blog) {
            //
        }
    },
    actions: {
        createBlog({ commit }, blog) {
            return this._vm.$http.post('/api/blogs', blog)
                // .then(res => {
                //     console.log(res)
                //     commit('create_blog', res.data)
                // }).catch(err => {
                //     throw err
                // })
        },
        getBlogs({ commit }) {
            return this._vm.$http.get('/api/blogs')
                .then(res => {
                    commit('set_blogs', res.data)
                }).catch(err => {
                    throw err
                })
        },
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
