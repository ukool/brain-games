export const state = () => ({
  resetGame: false,
});

export const mutations = {
  resetGame(state) {
    state.resetGame = true;
  },

  startGame(state) {
    state.resetGame = false;
  },
};
