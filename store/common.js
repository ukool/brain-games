export const state = () => ({
  loading: false,
  error: null,
});

export const mutations = {
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
  // Show loading
  setLoading({ commit }, payload) {
    commit('setLoading', payload);
  },
  // Show error
  setError({ commit }, payload) {
    commit('setError', payload);
  },
  // Clear error
  clearError({ commit }) {
    commit('clearError');
  },
};
export const getters = {
  // Get load status
  loading(state) {
    return state.loading;
  },
  // Get error message
  error(state) {
    return state.error;
  },
};
