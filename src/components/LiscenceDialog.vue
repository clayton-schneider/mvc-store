<template>
  <v-dialog
    v-model="isLiscenceLogOpen"
    max-width="500px"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title>Liscence Agreement</v-card-title>
      <v-card-text>{{ liscence }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="TOGGLE_LISCENCE_LOG">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LiscenceDialog',
  computed: mapGetters(['isLiscenceLogOpen', 'liscence']),
  methods: mapActions(['TOGGLE_LISCENCE_LOG']),
};
</script>
