import store from "../store";

export default async function(to, from, next) {
    if (store.getters['auth/unverifiedToken']) {
      store.commit('setLoading');
      await store.dispatch('auth/verifyToken').then(() => { store.commit('setLoading')
        }).catch(() => {
          store.commit('setLoading');
          next({ name: "index" });
      });
    }
    if (store.getters['auth/authenticated']) {
      if (to.meta.guestRouteOnly)
      next({ name: store.getters['auth/role'] + "dashboard" });
    }
    if (to.meta.guestRouteOnly) {
      //
    }
    next();
};
