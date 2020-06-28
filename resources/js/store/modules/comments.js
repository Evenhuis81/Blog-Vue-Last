export default {
    namespaced: true,
    state: {
        comments: [],
    },
    mutations: {
        // get_categories(state, categories) {
        //     return state.categories = categories
        // }
    },
    actions: {
        createComment({ dispatch }, comment) {
            return this._vm.$http.post('/api/comments', comment)
                .then(res => {
                    dispatch('blogs/getBlogs', {}, {root: true})
                    return
                }).catch(err => {
                    throw err
                })
        },
    },
    getters: {
        // categoryNames: state => {
        //     return state.categories.map(cat => cat.name);
        // },
    }
}
