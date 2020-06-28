export default {
    namespaced: true,
    state: {
        blogs: [],
        // blog: []
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        },
    },
    actions: {
        createBlog({ dispatch }, blog) {
            return this._vm.$http.post('/api/blogs', blog)
                .then(res => {
                    // dispatch('push_blog', res.data)
                    dispatch('getBlogs')
                    return
                }).catch(err => {
                    throw err
                })
        },
        getBlogs({ commit }) {
            return this._vm.$http.get('/api/blogs')
                .then(res => {
                    commit('set_blogs', res.data)
                }).catch(err => {
                    throw err
                })
        },
        push_blog(state, blog) {
            console.log(blog)
            // await blog.map(b => state.blogs.push(b))
            // state.blog = blog
        }
    },
    getters: {
        blogs: state => {
            return state.blogs
        },
        // comments: state => {
        //     return state.blogs.map(cat => cat.name);
        // },
        blog: (state) => (id) => {
            return state.blogs.find(blog => blog.id == id)
          },
        authorBlogs: (state, getters, rootState, rootGetters) => {
            return state.blogs.filter(blog => blog.owner_id == rootGetters["auth/userId"])
            // console.log(rootGetters['auth/userId'])
        }
    }
}
