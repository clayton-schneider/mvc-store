<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="3"
        class="d-flex justify-center"
      >
        <v-hover v-slot="{ hover }">
          <v-card width="400">
            <v-img contain :aspect-ratio="2 / 3" :src="product.data.image">
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
                    ${{ product.data.price }}/yr
                  </div>
                  <v-card-text style="position:relative;">
                    <v-btn
                      fab
                      color="orange"
                      absolute
                      top
                      right
                      class="white--text"
                      ><v-icon>mdi-cart</v-icon></v-btn
                    >
                    <h3 class="font-weight-medium">{{ product.data.name }}</h3>
                    <p class="pt-4">{{ shorten(product.data.description) }}</p>
                  </v-card-text>
                </v-card>

                <!-- <div></div> -->
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { projectFirestore } from '../firebase/config';
export default {
  name: 'Store',
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    const products = await projectFirestore.collection('products').get();
    this.products = products.docs.map(doc => {
      const reform = { id: doc.id, data: doc.data() };
      return reform;
    });
  },
  methods: {
    shorten(string) {
      if (string.length > 100) {
        return string.substring(0, 500) + '...';
      } else {
        return string;
      }
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
