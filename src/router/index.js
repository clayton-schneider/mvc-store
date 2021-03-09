import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ProfileSetup.vue'),
  },
  {
    path: '/manage-products',
    name: "ManageProducts",
    component: () => import('../views/ManageProducts.vue')
  },
  {
    path: '/manage-users',
    name: "ManageUsers",
    component: () => import('../views/ManageUsers.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
