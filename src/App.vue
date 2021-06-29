<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',

  async mounted() {
    this.GET_USER();
  },
  methods: mapActions(['GET_USER']),

  data: () => ({
    //
  }),
};
</script>
