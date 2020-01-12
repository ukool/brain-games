export const state = () => ({
  fullScreenMode: false,
});

export const mutations = {
  setFullScreenMode(state, payload) {
    state.fullScreenMode = payload;
  },
};

export const getters = {
  getFullScreenModeStatus: state => state.fullScreenMode,
};
