// import { reset } from "browser-sync"

export default {
    namespaced: true,
    state: {
        // default: top, 3 sec timeout, black, dismissable
        active: false,
        dismiss: true,
        color: "red",
        text: "Empty Snackbar",
        timeout: 3000,
        absolute: false,
        x: null,
        y: "top",
        centered: false
    },
    mutations: {
        set_snackbar(state, boolean) {
            state.active = boolean
        },
        set_options(state, options) {
            console.log(options)
            console.log(state)
        },
        set_dismiss(state) {
            state.dismiss = false
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
        set_x(state, x) {
            state.x = x
        },
        set_y(state, y) {
            state.y = y
        },
        set_centered(state) {
            state.centered = true
        },
        reset(state) {
            state.dismiss = true
            state.color = ""
            state.text = "Empty Snackbar"
            state.timeout = 3000
            state.absolute = false
            state.x = null
            state.y = "top"
            state.centered = false
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
            // console.log(options)
            // return
            commit('reset')
            // requires safetynet, text is not optional , error handling promise?
            // map options and only set options available
            // options.dismiss ? commit('set_dismiss') : false
            options.text ? commit('set_text', options.text) : false
            options.color ? commit('set_color', options.color) : false
            options.timeout ? commit('set_timeout', options.timeout) : false
            // another safetynet needed x needs y and vica versa
            if (options.centered) {
                commit("set_centered")
                commit("set_y", null)
            } else {
                options.x ? commit('set_x', options.x) : false
                options.y ? commit('set_y', options.y) : false
            }
            commit('set_snackbar', true)
        }
    },
    getters: {
        getSnackbar: state => { return state.active },
        color(state) { return state.color },
        text(state) { return state.text },
        timeout(state) { return state.timeout },
        absolute(state) { return state.absolute },
        x(state) { return state.x },
        y(state) { return state.y },
        centered(state) { return state.centered }
    }
}