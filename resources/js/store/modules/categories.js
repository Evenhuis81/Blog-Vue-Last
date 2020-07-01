export default {
    namespaced: true,
    state: {
        categories: [],
    },
    mutations: {
        get_categories(state, categories) {
            return state.categories = categories
        }
    },
    actions: {
        getCategories({ commit }) {
            this._vm.$http.get('/api/categories')
                .then(res => {
                    commit('get_categories', res.data)
                }).catch(err => {
                    throw err
                })
        },
        createCategory({ dispatch }, category) {
            return this._vm.$http.post('/api/categories', category)
            .then(res => {
                dispatch("categories/getCategories", {}, { root: true })
                return
            }).catch(err => {
                throw err
            })
        }
    },
    getters: {
        categoryNames: state => {
            return state.categories.map(cat => cat.name);
        },
        categories: state => {
            return state.categories
        },
    }
}
