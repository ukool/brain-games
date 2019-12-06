import firebase from 'firebase/app';
import User from '~/helpers/User';

export const state = () => ({
  user: null,
  loading: null,
  error: {
    status: false,
    message: null,
  },
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setError(state, payload) {
    state.error.status = true;

    if (payload === 'The email address is already in use by another account.') {
      state.error.message = 'Email уже занят';
    } else if (payload === 'The email address is badly formatted.') {
      state.error.message = 'Некорректный email';
    } else if (payload === 'The password must be 6 characters long or more.') {
      state.error.message = 'Пароль должен быть не меньше 6-ти символов';
    } else {
      state.error.message = 'Неверный email или пароль';
    }
  },

  clearError(state) {
    state.error.status = false;
    state.error.message = null;
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
  getUser: state => state.user,

  checkUser: state => state.user !== null,

  getError: state => state.error,

  getLoadingStatus: state => state.loading,
};
