import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import productDiologs from './modules/productDialogs';
import liscenceDialogs from './modules/liscenceDialog';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    productDiologs,
    liscenceDialogs,
  },
});
