// Manage state of nested diologs to prevent emiting events

const state = {
  delProdLog: false,
  editProdLog: false,
  addProdLog: false,
};

const getters = {
  isDelProdOpen: state => state.delProdLog,
  isEditProdOpen: state => state.editProdLog,
  isAddProdOpen: state => state.addProdLog,
};

const actions = {
  TOGGLE_DEL_PROD({ commit }) {
    commit('toggleDelProd');
  },
  TOGGLE_EDIT_PROD({ commit }) {
    commit('toggleEditProd');
  },
  TOGGLE_ADD_PROD({ commit }) {
    commit('toggleAddProd');
  },
};

const mutations = {
  toggleDelProd: state => (state.delProdLog = !state.delProdLog),
  toggleEditProd: state => (state.editProdLog = !state.editProdLog),
  toggleAddProd: state => (state.addProdLog = !state.addProdLog),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
