import firebase from 'firebase/app';
import User from '~/helpers/User';

export const state = () => ({
  user: null,
  loading: null,
  error: null,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setError(state, payload) {
    state.error = payload;
  },

  clearError(state) {
    state.error = null;
  },
};

export const actions = {
  setLoading({ commit }, payload) {
    commit('setLoading', payload);
  },

  setError({ commit }, payload) {
    commit('setError', payload);
  },

  clearError({ commit }) {
    commit('clearError');
  },

  async registerUser({ commit }, { email, password }) {
    commit('clearError');
    commit('setLoading', true);
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      commit('setUser', new User(user.user.uid));
      commit('setLoading', false);
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error.message);
      throw error;
    }
  },

  async loginUser({ commit }, { email, password }) {
    commit('clearError');
    commit('setLoading', true);
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      commit('setUser', new User(user.user.uid));
      commit('setLoading', false);
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error.message);
      throw error;
    }
  },

  loggedUser({ commit }, payload) {
    commit('setUser', new User(payload.uid));
  },

  logoutUser({ commit }) {
    firebase.auth().signOut();
    commit('setUser', null);
  },
};

export const getters = {
  user: state => state.user,

  checkUser: state => state.user !== null,

  error: state => state.error,

  getLoadingStatus: state => state.loading,
};
