export const state = () => ({
  showPlugStartGame: true,
});


export const mutations = {
  showPlugStartGame(state) {
    state.showPlugStartGame = true;
  },

  hidePlugStartGame(state) {
    state.showPlugStartGame = false;
  },
};
