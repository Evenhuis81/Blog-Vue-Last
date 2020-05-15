export default {
    // namespaced: true,
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
            axios.get('/api/categories')
                .then(res => {

                    commit('get_categories', res.data)
                }).catch(err => {
                    console.log(err)
                })
        },
    },
    getters: {
        categories: state => {
            return state.categories
        },
        fiveRandomCategories: state => {
            let newArr = [];
            let origArr = state.categories
            //     let catCopy = [...state.categories];
            //     console.log(catCopy);
            for (let i = 0; i < 5; i++) {
                let j = Math.floor((Math.random() * (origArr.length - i)));
                newArr.push(origArr[j]);
                origArr[j] = origArr[origArr.length - i]
            }
            return newArr;
        }
    }
}
