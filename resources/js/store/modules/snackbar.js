// import { reset } from "browser-sync"

export default {
    namespaced: true,
    state: {
        // default = centered, 3 sec timeout, black, close button
        snackbar: false,
        dismiss: true,
        color: '',
        text: 'Empty Snackbar',
        timeout: 3000,
        absolute: false,
        x: null,
        y: null
    },
    mutations: {
        set_snackbar(state, boolean) {
            state.snackbar = boolean
        },
        set_options(state, options) {
            console.log(options)
            console.log(state)
        },
        set_text(state, text) {
            state.text = text
        },
        set_color(state, color) {
            state.color = color
        },
        set_timeout(state, timeout) {
            state.timeout = timeout
        },
        set_timeout(state, boolean) {
            state.absolute = boolean
        },
        set_x(state, x) {
            state.x = x
        },
        set_y(state, y) {
            state.y = y
        },
        reset(state) {
            state.color = ''
            state.text = 'No Text Set'
            state.timeout = 3000
            state.absolute = false
            state.x = null
            state.y = null
        }
    },
    actions: {
        setSnackbar({ commit }, boolean) {
            commit('set_snackbar', boolean)
        },
        snackbar({ commit }, options) {
            // return new Promise((resolve, reject) => {
            //     console.log(options)
            //     resolve
            // })
            console.log(options)
            return
            commit('reset')
            // requires safetynet, text is not optional , error handling promise?
            options.text ? commit('set_text', options.text) : false
            options.color ? commit('set_color', options.color) : false
            options.timeout ? commit('set_timeout', options.timeout) : false
            // another safetynet needed x needs y and vica versa
            options.x ? commit('set_x', options.x) : false
            options.y ? commit('set_y', options.y) : commit('set_y', null)
            commit('set_snackbar', true)
        }
    },
    getters: {
        getSnackbar: state => { return state.active },
        color(state) { return state.color },
        text(state) { return state.text },
        timeout(state) { return state.timeout },
        absolute(state) { return state.absolute },
        centered: state => { return state.centered },
        x(state) { return state.x },
        y(state) { return state.y }
    }
}