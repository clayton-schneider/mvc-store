<template>
  <v-dialog
    v-model="isCheckoutOpen"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="checkoutProduct.data">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="TOGGLE_CHECKOUT"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-toolbar-title
          >Checkout for: {{ checkoutProduct.data.name }}</v-toolbar-title
        >
      </v-toolbar>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-stepper v-model="step">
              <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1"
                  >Streaming Liscence Agreement</v-stepper-step
                >
                <v-stepper-step :complete="step > 2" step="2"
                  >Checkout</v-stepper-step
                >
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <p>{{ liscence }}</p>
                  <v-checkbox
                    v-model="checkbox"
                    label="By checking this box you agree to adhere to the above terms"
                    class="pl-3 mb-6"
                  ></v-checkbox>
                  <v-btn color="primary" :disabled="!checkbox" @click="step = 2"
                    >Next</v-btn
                  >
                </v-stepper-content>

                <v-stepper-content step="2">
                  <h2 class="mb-6">
                    You are subscribing to {{ checkoutProduct.data.name }} for
                    ${{ checkoutProduct.data.price }}/yr
                  </h2>
                  <v-btn color="primary" @click="CHECKOUT">Checkout</v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Checkout',
  computed: mapGetters(['isCheckoutOpen', 'checkoutProduct', 'liscence']),
  methods: mapActions(['TOGGLE_CHECKOUT', 'CHECKOUT']),
  data() {
    return {
      step: 1,
      checkbox: false,
    };
  },
};
</script>
