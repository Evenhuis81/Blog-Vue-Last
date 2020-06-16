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
    },
    getters: {
        categories: state => {
            return state.categories
        },
        fiveRandomCategories: state => {
            let newArr = [];
            let copyArr = [...state.categories]
            if (!state.categories.length) {
                return newArr;
            }
            for (let i = 0; i < 5; i++) {
                let j = Math.floor((Math.random() * (state.categories.length - i)));
                newArr.push(copyArr[j]);
                copyArr[j] = copyArr[state.categories.length - i - 1]
            }
            return newArr;
        }
    }
}
