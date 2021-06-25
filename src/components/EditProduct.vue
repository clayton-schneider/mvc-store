<template>
  <v-dialog
    v-model="isEditProdOpen"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="editProduct.data">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="TOGGLE_EDIT_PROD"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-toolbar-title
          >Edit Product: {{ editProduct.data.name }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="updateProduct"
            ><v-icon>mdi-save</v-icon>Save</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-form ref="productForm">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Product Name"
                v-model="editProduct.data.name"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="editProduct.data.price"
                label="Price"
                type="number"
                step=".01"
                prefix="$"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-textarea
                label="Product Description"
                rows="2"
                auto-grow
                v-model="editProduct.data.description"
                :rules="[rules.required]"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12" sm="6">
              <v-textarea
                label="Embed Code"
                rows="2"
                auto-grow
                v-model="editProduct.data.code"
                :rules="[rules.required]"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>

        <LoadingAlert
          :alert="alert"
          :state="state"
          @saveSuccess="saveSuccess"
          @saveError="closeAlert"
        >
          <template #loading>We are trying to save product data.</template>
          <template #success>Product successfully updated</template>
          <template #error
            >There was an error trying to save user data. Try again
            later.</template
          >
        </LoadingAlert>

        <DeleteAlert :product="editProduct" @deleteError="TOGGLE_DEL_PROD">
        </DeleteAlert>
      </v-container>
      <v-btn
        color="red"
        fab
        class="white--text btn--delete"
        @click="TOGGLE_DEL_PROD"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-card>
  </v-dialog>
</template>

<script>
import { projectFirestore } from '../firebase/config';
import LoadingAlert from '@/components/LoadingAlert';
import DeleteAlert from '@/components/DeleteAlert';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditProduct',
  components: {
    LoadingAlert,
    DeleteAlert,
  },
  props: ['dialog', 'product'],
  data() {
    return {
      alert: false,
      state: 'success',

      rules: {
        required: value => !!value || 'Required',
        file: value => value.size === 0 || 'File required',
      },
    };
  },
  computed: mapGetters(['isEditProdOpen', 'editProduct']),
  methods: {
    ...mapActions(['TOGGLE_DEL_PROD', 'TOGGLE_EDIT_PROD']),
    async updateProduct() {
      this.alert = true;
      this.state = 'loading';
      try {
        let res = await projectFirestore
          .collection('products')
          .doc(this.product.id)
          .set({
            code: this.product.data.code,
            description: this.product.data.description,
            image: this.product.data.image,
            name: this.product.data.name,
            price: this.product.data.price,
          });
        this.state = 'success';
      } catch (err) {
        console.log(err);
        this.state = 'error';
      }
    },
    closeAlert(type) {
      if (type === 'delete') {
        this.TOGGLE_DEL_PROD();
      } else {
        this.alert = false;
      }
    },
    clearData() {
      this.email = '';
      this.password = '';
      this.type = 'individual';
      this.firstName = '';
      this.lastName = '';
      this.orgName = '';
    },
    saveSuccess() {
      this.clearData();
      this.$refs.productForm.resetValidation();
      this.closeAlert();
    },
    emitProductDeleted() {
      this.clearData();
      this.TOGGLE_DEL_PROD();
      this.$emit('productDeleted');
    },
  },
};
</script>

<style lang="scss" scoped>
.btn--delete {
  position: absolute;
  right: 2%;
  bottom: 5%;
}
</style>
