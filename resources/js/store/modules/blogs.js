export default {
    namespaced: true,
    state: {
        blogs: [],
        blog: []
    },
    mutations: {
        set_blogs(state, blogs) {
            state.blogs = blogs;
        },
        push_blog(state, blog) {
            // console.log(blog)
            // blog.map(b => state.blogs.push(b))
            state.blog = blog
        }
    },
    actions: {
        createBlog({ commit }, blog) {
            return this._vm.$http.post('/api/blogs', blog)
                .then(res => {
                    console.log('a')
                    commit('push_blog', res.data)
                    
                    return res.data
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
