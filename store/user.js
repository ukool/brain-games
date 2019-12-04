import firebase from 'firebase/app';
import User from '~/helpers/User';

export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

export const actions = {
  // Registration page
  async registerUser({ commit }, { email, password }) {
    commit('clearError');
    commit('setLoading', true);
    try {
      // logic
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      commit('setUser', new User(user.user.uid));

      commit('setLoading', false);
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error.message);
      throw error;
    }
  },
  // Login page
  async loginUser({ commit }, { email, password }) {
    commit('clearError');
    commit('setLoading', true);
    try {
      // logic
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      commit('setUser', new User(user.user.uid));

      commit('setLoading', false);
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error.message);
      throw error;
    }
  },
  // Logged
  loggedUser({ commit }, payload) {
    // Send mutation new uid used helped Class
    commit('setUser', new User(payload.uid));
  },
  // Logout
  logoutUser({ commit }) {
    firebase.auth().signOut();
    // Send mutation null
    commit('setUser', null);
  },
};

export const getters = {
  user(state) {
    return state.user;
  },
  checkUser(state) {
    return state.user !== null;
  },
};
