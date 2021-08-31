import { createStore } from 'vuex';
import {
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, addDocument,
} from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  getters: {
    // authModalShow: (state) => return state.authModalShow;
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await createUserWithEmailAndPassword(auth, payload.email, payload.password);

      // userCred.user.displayName = payload.name;
      updateProfile(userCred.user, { displayName: payload.name });

      console.log(userCred);
      await addDocument('users', userCred.user.uid, {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      // commit function
      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async signout({ commit }) {
      await signOut(auth);

      commit('toggleAuth');

      // if (payload.route.meta.requiresAuth) {
      //   payload.router.push({ name: 'home' });
      // }
    },
  },
});
