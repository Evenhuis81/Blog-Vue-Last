export default {
    namespaced: true,
    state: {
        comments: [],
    },
    mutations: {
        //
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
        deleteComment({ dispatch }, commentId) {
            return this._vm.$http.delete('/api/comments/' + commentId)
                .then(res => {
                    dispatch('blogs/getBlogs', {}, {root: true})
                    return
                }).catch(err => {
                    throw err
                })
        },
    },
    getters: {
        //
    }
}
