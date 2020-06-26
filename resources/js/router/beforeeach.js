import store from "../store"

export default async function (to, from, next) {
  // is no user is set, but has token (page refresh)
  if (store.getters['auth/unverifiedToken']) {
    store.dispatch('setContentLoading', true)
    await store.dispatch('auth/verifyToken')
    .catch((e) => {
      return next({ name: "index" })
    }).finally(() => {
    })
  }
  // get global data (blogs / categories) if not present (on refresh)
  if (!store.getters["blogs/blogs"].length) {
    store.dispatch('setContentLoading', true)
    await store.dispatch("blogs/getBlogs")
    await store.dispatch("categories/getCategories")
  }
  store.dispatch('setContentLoading', false)

  const role = store.getters['auth/role']
  const auth = store.getters['auth/authenticated']

  // wrapper for admin access
  // if (role !== 'admin') {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (auth) {
        const scopes = to.meta.scopes || []
        if (scopes.map(x => x).includes(role + '_access')) {
          next()
        } else {
          store.dispatch('snackbar/setSnackbar','You are not authorized for this route!')
          return next({ name: "redirect" })
        }
      } else {
        store.dispatch('snackbar/setSnackbar','You are not authenticated for this route!')
        return next({ name: "redirect" })
      }
    }
    // pages with guestRouteOnly are not available for logged in users (register, login page)
    if (to.meta.guestRouteOnly && auth) {
      store.dispatch('snackbar/setSnackbar','You are already registered and logged in!')
      return next({ name: "redirect" })
    }
  // }
  next()
};
