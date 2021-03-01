<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="12" sm="10" md="4" lg="4">
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1">
            Who are you?
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-radio-group v-model="type" row class="pl-2">
              <v-radio label="Individual" value="individual"
                >Individual</v-radio
              >
              <v-radio label="Institution" value="institution"
                >Institution</v-radio
              >
            </v-radio-group>
          </v-stepper-content>
          <v-stepper-step :complete="step > 2" step="2">
            Haha
          </v-stepper-step>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { projectAuth } from '../firebase/config';
export default {
  name: 'Setup',
  data() {
    return {
      step: 1,
      type: '',
    };
  },
  mounted() {
    console.log(projectAuth.currentUser);
  },
};
</script>
