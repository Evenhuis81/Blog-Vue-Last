import store from "../store";

export default async function(to, from, next) {
  // is no user is set, but has token (page refresh)
  if (store.getters['auth/unverifiedToken']) {
    store.commit('setLoading');
    await store.dispatch('auth/verifyToken').then(() => {
      store.commit('setLoading');
      }).catch(() => {
        store.commit('setLoading');
        next({ name: "index" });
    });
  } else next();

  // if ()
  if (to.name === 'no') {
    console.log('no');
  } else next();
  const authRequired = to.meta.auth;
  const role = store.getters['auth/role'];

  // when user is logged in
  if (authRequired) {
    console.log('1')
    if (store.getters['auth/authenticated']) {
      console.log('2')
      if (to.meta.guestRouteOnly && role !== 'admin') {
        console.log('3')
        next({ name: store.getters['auth/role'] + "dashboard" });
      } else next();
      if (to.meta.auth && role !== 'admin') {
        if (role === !to.meta.role) {
          alert('not the right role!');
          // do something fancy here
          next({ name: "index" });
        } else next();
      } else next();
    } else {
      // user not logged in trying to access auth route
      alert('not autherized');
      next({ name: "no" });
    }
  } else next();
    
  next();

};

// export default async function(to, from, next) {
//   if (store.getters['auth/unverifiedToken']) {
//     console.log('unverified');
//     store.commit('setLoading');
//     await store.dispatch('auth/verifyToken').then(() => {
//       store.commit('setLoading');
//       console.log('then')
//       }).catch(() => {
//         console.log('catch')
//         store.commit('setLoading');
//         next({ name: "index" });
//     });
//     console.log('hook1');
//   }
//   console.log('hook2');
//   if (store.getters['auth/authenticated']) {
//     if (to.meta.guestRouteOnly)
//     next({ name: store.getters['auth/role'] + "dashboard" });
//   }
//   if (to.meta.guestRouteOnly) {
//     //
//   }
//   next();
// };
