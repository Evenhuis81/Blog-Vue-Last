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
            // let origArr = state.categories
            let copyArr = [...state.categories]
            if (!state.categories.length) {
                return newArr;
            }
            //     let catCopy = [...state.categories];
            //     console.log(catCopy);
            for (let i = 0; i < 5; i++) {
                // console.log(copyArr);
                let j = Math.floor((Math.random() * (state.categories.length - i)));
                newArr.push(copyArr[j]);
                copyArr[j] = copyArr[state.categories.length - i - 1]
            }
            return newArr;
        }
    }
}
