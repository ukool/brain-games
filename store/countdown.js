export const state = () => ({
  startCountdown: false,
  showCountdown: false,
});

export const mutations = {
  showCountdown(state) {
    state.showCountdown = true;
  },

  hideCountdown(state) {
    state.showCountdown = false;
  },

  playCountdown(state) {
    state.startCountdown = true;
  },

  stopCountdown(state) {
    state.startCountdown = false;
  },
};
