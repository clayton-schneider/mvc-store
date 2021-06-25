import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import diologs from './modules/dialogs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    diologs,
  },
});
