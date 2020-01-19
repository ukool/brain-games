import firebase from 'firebase/app';

export const state = () => ({
  simulatorsList: null,
});

export const mutations = {
  setSimulatorsList(state, payload) {
    state.simulatorsList = payload;
  },
};

export const getters = {
  getSimulatorsList: state => state.simulatorsList,

  checkUser: state => state.user !== null,
};

export const actions = {
  async loadSimulatorsList({ commit }) {
    const simulatorsList = await firebase.database()
      .ref('simulatorsList')
      .once('value', snap => snap.val());
    commit('setSimulatorsList', simulatorsList);
  },
};
//
