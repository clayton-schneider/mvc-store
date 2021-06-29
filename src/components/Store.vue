<template>
  <v-container>
    <!-- Owned Products -->
    <h3 v-if="ownedProducts.length" class="my-4">
      Your Streaming Subscriptions:
    </h3>
    <v-row>
      <v-col
        v-for="ownedProduct in ownedProducts"
        :key="ownedProduct.id"
        cols="12"
        md="3"
        class="d-flex justify-center"
      >
        <v-hover v-slot="{ hover }">
          <v-card width="400" @click="openView(ownedProduct)">
            <v-img contain :aspect-ratio="2 / 3" :src="ownedProduct.data.image">
              <v-expand-transition>
                <v-card
                  v-if="hover"
                  style="height:100%; width:100%; opacity:0.9"
                  class="transition-fast-in-fast-out v-card--reveal "
                >
                  <div
                    style="height:30%; width:100%;"
                    class="orange darken-2"
                  ></div>
                  <v-card-text>
                    <h3 class="font-weight-medium">
                      {{ ownedProduct.data.name }}
                    </h3>
                    <p class="pt-4">
                      {{ shorten(ownedProduct.data.description) }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Products For Purchase -->
    <h3 v-if="productsForPurchase.length" class="my-4">
      Store:
    </h3>
    <v-row>
      <v-col
        v-for="purchaseProduct in productsForPurchase"
        :key="purchaseProduct.id"
        cols="12"
        md="3"
        class="d-flex justify-center"
      >
        <v-hover v-slot="{ hover }">
          <v-card width="400">
            <v-img
              contain
              :aspect-ratio="2 / 3"
              :src="purchaseProduct.data.image"
            >
              <v-expand-transition>
                <v-card
                  v-if="hover"
                  style="height:100%; width:100%; opacity:0.9"
                  class="transition-fast-in-fast-out v-card--reveal "
                >
                  <div
                    style="height:30%; width:100%;"
                    class="orange darken-2 text-h5 d-flex justify-center align-center white--text"
                  >
                    ${{ purchaseProduct.data.price }}/yr
                  </div>
                  <v-card-text style="position:relative;">
                    <v-btn
                      fab
                      color="orange"
                      absolute
                      top
                      right
                      class="white--text"
                      @click.stop="openCheckout(purchaseProduct)"
                      ><v-icon>mdi-cart</v-icon></v-btn
                    >
                    <h3 class="font-weight-medium">
                      {{ purchaseProduct.data.name }}
                    </h3>
                    <p class="pt-4">
                      {{ shorten(purchaseProduct.data.description) }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <ViewProduct />
    <Checkout />
  </v-container>
</template>

<script>
import Checkout from './store/Checkout.vue';
import ViewProduct from './ViewProduct.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Store',
  components: { ViewProduct, Checkout },
  async mounted() {
    this.fetchProducts();
    this.GET_OWNED_PRODUCTS();
  },
  computed: mapGetters(['ownedProducts', 'productsForPurchase']),
  methods: {
    ...mapActions([
      'fetchProducts',
      'TOGGLE_VIEW_PROD',
      'SET_VIEW_PRODUCT',
      'SET_CHECKOUT_PRODUCT',
      'TOGGLE_CHECKOUT',
      'GET_OWNED_PRODUCTS',
    ]),
    log(id) {
      console.log(id);
    },
    shorten(string) {
      if (string.length > 100) {
        return string.substring(0, 500) + '...';
      } else {
        return string;
      }
    },
    openView(product) {
      this.SET_VIEW_PRODUCT(product);
      this.TOGGLE_VIEW_PROD();
    },
    openCheckout(product) {
      this.SET_CHECKOUT_PRODUCT(product);
      this.TOGGLE_CHECKOUT();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  position: absolute;
}
</style>
