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
        },
        updateCategory({ dispatch }, payload) {
            return this._vm.$http.patch('/api/categories/' + payload.id, payload.form)
                .then(res => {
                    dispatch('blogs/getBlogs', {}, { root: true })
                    dispatch("categories/getCategories", {}, { root: true })
                    return
                }).catch(err => {
                    throw err
                })
        },
        deleteCategory({ dispatch }, id) {
            return this._vm.$http.delete('/api/categories/' + id)
                .then(res => {
                    dispatch('blogs/getBlogs', {}, {root: true})
                    dispatch('categories/getCategories', {}, {root: true})
                    return
                }).catch(err => {
                    throw err
                })
        },
    },
    getters: {
        category: (state) => (id) => {
            return state.categories.find(category => category.id == id)
        },
        categoryNames: state => {
            return state.categories.map(cat => cat.name);
        },
        categories: state => {
            return state.categories
        },
        editCategoryData: (state, getters) => (id) => {
            // let blog = getters.blog.state.blogs.find(blog => blog.id == id)
            let category = getters.category(id)
            let formData = {
                'name': category.name,
                'subheader': category.subheader
            }
            return formData
        },
    }
}
