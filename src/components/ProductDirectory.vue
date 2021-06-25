<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="orange darken-4 white--text">
        Products
        <v-spacer></v-spacer>
        <v-btn fab small color="primary" dark @click="TOGGLE_ADD_PROD"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-virtual-scroll
          v-if="allProducts.length"
          :items="allProducts"
          item-height="50"
          height="200"
        >
          <template v-slot:default="{ item }">
            <v-list-item v-if="item.data.image">
              <v-list-item-avatar class="d-flex justify-center">
                <v-avatar>
                  <img :src="item.data.image" />
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.data.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn depressed small @click="openEdit(item)">
                  Edit Product
                  <v-icon color="orange darken-4" right>mdi-open-in-new</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
    <EditProduct
      :dialog="isEditProdOpen"
      :product="product"
      @close="closeDialog"
      @productDeleted="productDeleted"
    />
  </v-container>
</template>

<script>
import EditProduct from '@/components/EditProduct';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductDirectory',
  components: {
    EditProduct,
  },
  data() {
    return {
      dialog: false,
      product: {},
    };
  },
  computed: mapGetters(['allProducts', 'isEditProdOpen']),
  async mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions([
      'fetchProducts',
      'TOGGLE_EDIT_PROD',
      'TOGGLE_ADD_PROD',
      'SET_EDIT_PRODUCT',
    ]),
    closeDialog() {
      this.dialog = false;
    },
    openEdit(product) {
      this.SET_EDIT_PRODUCT(product);
      this.TOGGLE_EDIT_PROD();
    },
    productDeleted() {
      this.closeDialog();
    },
  },
};
</script>
