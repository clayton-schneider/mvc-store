import {
  projectAuth,
  projectFirestore,
  addToArray,
  removeFromArray,
} from '@/firebase/config';

const state = {
  checkoutDialog: false,
  checkoutProduct: {},
};

const getters = {
  isCheckoutOpen: state => state.checkoutDialog,
  checkoutProduct: state => state.checkoutProduct,
};

const actions = {
  TOGGLE_CHECKOUT({ commit }) {
    commit('toggleCheckout');
  },
  SET_CHECKOUT_PRODUCT({ commit }, product) {
    commit('setCheckoutProduct', product);
  },
  CHECKOUT({ commit, dispatch }) {
    //  TBD RUN CHECKOUT

    // AFTER SUCCESS ADD PRODUCT TO USERS DATA
    dispatch('ADD_PRODUCT_TO_USER');
  },
  async ADD_PRODUCT_TO_USER({ commit, dispatch, state }) {
    //   Get user id for update
    const user = await projectAuth.currentUser.uid;
    try {
      const res = await projectFirestore
        .collection('users')
        .doc(user)
        .update({
          purchases: addToArray(state.checkoutProduct.id),
        });
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  toggleCheckout: state => (state.checkoutDialog = !state.checkoutDialog),
  setCheckoutProduct: (state, product) => (state.checkoutProduct = product),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
