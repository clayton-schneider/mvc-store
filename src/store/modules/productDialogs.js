// Manage state of nested diologs to prevent emiting events

const state = {
  delProdLog: false,
  editProdLog: false,
  addProdLog: false,
  viewProdLog: false,
};

const getters = {
  isDelProdOpen: state => state.delProdLog,
  isEditProdOpen: state => state.editProdLog,
  isAddProdOpen: state => state.addProdLog,
  isViewProdOpen: state => state.viewProdLog,
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
  TOGGLE_VIEW_PROD({ commit }) {
    commit('toggleViewProd');
  },
};

const mutations = {
  toggleDelProd: state => (state.delProdLog = !state.delProdLog),
  toggleEditProd: state => (state.editProdLog = !state.editProdLog),
  toggleAddProd: state => (state.addProdLog = !state.addProdLog),
  toggleViewProd: state => (state.viewProdLog = !state.viewProdLog),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
