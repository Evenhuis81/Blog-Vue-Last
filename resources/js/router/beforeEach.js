import store from "../store";

export default async function(to, from, next) {
  // is no user is set, but has token (page refresh)
  if (store.getters['auth/unverifiedToken']) {
    store.commit('setLoading');
  
  //   try {
  //     const response = await store.dispatch('auth/verifyToken');
  //     console.log(response);
  //     next();
  //   } catch (error) {
  //     console.error(error);
  //     return next({ name: "index" });
  //   }
  // }
    await store.dispatch('auth/verifyToken').then(() => {}).catch(error => {
      console.error(error);
        return next({ name: "index" });
    });
    // store.commit('setLoading');
    // next();
  } else next();



  if(to.matched.some(record => record.meta.requiresAuth)) {
    // const scopes = to.meta.scopes
    if (store.getters['auth/authenticated']) {
      const scopes = to.meta.scopes || [];
      // make auth/role authscopesarray
      if (store.getters['auth/role'] + '_access' === scopes[0] ) {
        next();
      } else next({ name: "redirect" });
    } else { 
      next({ name: "redirect" });
    }
  } else next();




  // if (store.getters['auth/authenticated']) {
    //
  // } else next();
  
  // const authRequired = to.meta.auth;
  // const role = store.getters['auth/role'];

  // when user is logged in
  // if (authRequired) {
  //   if (store.getters['auth/authenticated']) {
  //     if (to.meta.guestRouteOnly && role !== 'admin') {
  //       next({ name: store.getters['auth/role'] + "dashboard" });
  //     } else next();
  //     if (to.meta.auth && role !== 'admin') {
  //       if (role === !to.meta.role) {
  //         alert('not the right role!');
  //         // do something fancy here
  //         next({ name: "index" });
  //       } else next();
  //     } else next();
  //   } else {
  //     // user not logged in trying to access auth route
  //     alert('not autherized');
  //     next({ name: "no" });
  //   }
  // } else next();
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
