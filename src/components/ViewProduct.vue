<template>
  <v-dialog
    v-model="isViewProdOpen"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="viewProduct.data">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="TOGGLE_VIEW_PROD"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-toolbar-title>{{ viewProduct.data.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text dark @click="TOGGLE_LISCENCE_LOG">Liscence</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <div v-html="viewProduct.data.code"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <LiscenceDialog />
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LiscenceDialog from './LiscenceDialog.vue';

export default {
  name: 'ViewProduct',
  components: { LiscenceDialog },
  data() {
    return {};
  },
  computed: mapGetters(['isViewProdOpen', 'viewProduct']),
  methods: {
    ...mapActions(['TOGGLE_LISCENCE_LOG', 'TOGGLE_VIEW_PROD']),
  },
};
</script>
