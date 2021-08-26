import { createStore } from 'vuex';
import {
  auth, createUserWithEmailAndPassword, userCollection, addDoc,
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
      await createUserWithEmailAndPassword(auth, payload.email, payload.password);
      await addDoc(userCollection, {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      // commit function
      commit('toggleAuth');
    },
  },
});
