import store from "../store"

export default async function (to, from, next) {
  // is no user is set, but has token (page refresh)
  if (store.getters['auth/unverifiedToken']) {
    store.commit('setContentLoading')
    try {
      await store.dispatch('auth/verifyToken')
    } catch (e) {
      return next({ name: "index" })
    } finally {
      store.commit('setContentLoading')
    }
  }
  const role = store.getters['auth/role']
  const auth = store.getters['auth/authenticated']
  // wrapper for admin access
  if (role !== 'admin') {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (auth) {
        // const scopes = to.meta.scopes || [];
        const scope = to.meta.scope;
        // make auth/role authscopesarray
        // if (role + '_access' === scopes[0]) {
        if (role + '_access' !== scope) return next({ name: "redirect" })
      } else return next({ name: "redirect" })
    }
    // pages with guestRouteOnly are not available for logged in users (register, login page)
    if (to.meta.guestRouteOnly && auth) return next({ name: "redirect" })
  }
  next()
};
