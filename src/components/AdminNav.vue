<template>
  <v-toolbar v-if="user.profileInfo.type === 'admin'">
    <v-toolbar-title
      ><router-link to="/"
        ><span class="black--text">Media</span> Voices for
        <span class="orange--text text--darken-3">Children</span></router-link
      ></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn :to="{ name: 'ManageProducts' }" class="mr-2" text
        >Manage Products</v-btn
      >
      <v-btn :to="{ name: 'ManageUsers' }" class="mr-2" text
        >Manage Users</v-btn
      >
      <v-btn @click="logout" text>Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { projectAuth } from '../firebase/config';
export default {
  name: 'AdminNav',
  computed: mapGetters(['user']),
  methods: {
    async logout() {
      const res = await projectAuth.signOut();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__title a {
  color: #616161;
  text-decoration: none;
  font-weight: bold;
}
</style>
