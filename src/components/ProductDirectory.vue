<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="orange darken-4 white--text">
        Products
        <v-spacer></v-spacer>
        <v-btn fab small color="primary" dark @click="emitDialogClicked"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-virtual-scroll
          v-if="products.length"
          :items="products"
          item-height="50"
          height="200"
        >
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-avatar class="d-flex justify-center">
                <v-avatar>
                  <img :src="item.data.image" />
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.data.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn depressed small @click="openDialog(item)">
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
      :dialog="dialog"
      :product="product"
      @close="closeDialog"
      @productDeleted="productDeleted"
    />
  </v-container>
</template>

<script>
import { projectFirestore } from '../firebase/config';
import EditProduct from '@/components/EditProduct';

export default {
  name: 'ProductDirectory',
  components: {
    EditProduct,
  },
  data() {
    return {
      dialog: false,
      product: {},
      products: [],
    };
  },
  async mounted() {
    await this.updateProducts();
  },
  methods: {
    emitDialogClicked() {
      this.$emit('dialogClicked');
    },
    closeDialog() {
      this.dialog = false;
    },
    openDialog(product) {
      console.log(product);
      this.product = product;
      this.dialog = true;
    },
    async updateProducts() {
      const products = await projectFirestore.collection('products').get();
      this.products = products.docs.map(doc => {
        const reform = { id: doc.id, data: doc.data() };
        return reform;
      });
    },
    async productDeleted() {
      console.log('time to close edit card');
      this.closeDialog();
      await this.updateProducts();
    },
  },
};
</script>
