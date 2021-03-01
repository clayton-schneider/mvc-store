import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import { projectAuth } from './firebase/config';

Vue.config.productionTip = false;

let app = null;

// Wait for firebase auth to init before creating app
projectAuth.onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});
