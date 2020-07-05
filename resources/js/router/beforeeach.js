import store from "../store"

export default async function (to, from, next) {
  // is no user is set, but has token (page refresh)
  if (store.getters['auth/unverifiedToken']) {
    store.dispatch('setContentLoad', true)
    await store.dispatch('auth/verifyToken')
      .catch((e) => {
        return next({ name: "index" })
      }).finally(() => {
      })
  }
  // get global data (blogs / categories) if not present (on refresh)
  if (!store.getters["blogs/blogs"].length) {
    store.dispatch('setContentLoad', true)
    await store.dispatch("blogs/getBlogs")
    await store.dispatch("categories/getCategories")
  }
  store.dispatch('setContentLoad', false)

  const auth = store.getters['auth/authenticated']
  const role = store.getters['auth/userRole']

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      const scopes = to.meta.scopes || []
      if (scopes.map(x => x).includes(role + '_access')) {
        next()
      } else {
        store.dispatch('snackbar/snackbar', {
          text: "You are not authorized for this route!",
          color: "error"
        })
        return next({ name: "redirect" })
      }
    } else {
      console.log('not authenticated')
      store.dispatch('snackbar/snackbar', {
        text: "You are not authenticated for this route!",
        color: "error"
      })
      return next({ name: "redirect" })
    }
  }
  // pages with guestRouteOnly are not available for logged in users (register, login page)
  if (to.meta.guestRouteOnly && auth) {
    store.dispatch('snackbar/snackbar', {
      text: "You are already registered and logged in!",
      color: "error"
    })
    return next({ name: "redirect" })
  }
  next()
};
