import { projectAuth, projectFirestore } from '../../firebase/config';

const state = {
  user: {},
};
const getters = {
  user: state => state.user,
};
const actions = {
  async GET_USER({ commit }) {
    const userId = await projectAuth.currentUser.uid;
    const userData = await projectFirestore
      .collection('users')
      .doc(userId)
      .get();
    commit('setUser', userData.data());
  },
};
const mutations = {
  setUser: (state, userData) => (state.user = userData),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
