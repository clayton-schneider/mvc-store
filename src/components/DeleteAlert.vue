<template>
  <v-dialog
    v-model="isDelProdOpen"
    max-width="500px"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card v-if="product">
      <v-container>
        <v-row v-if="state === 'confirm'" align="center" justify="center">
          <v-col cols="12">
            <h3 class="">
              Type <span class="red--text">{{ product.data.name }}</span> in the
              box below to confirm you would like to delete
            </h3>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmText"
              :label="product.data.name"
              outlined
              color="red"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else-if="state === 'loading'" align="center" justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <p>We are trying to delete the product data</p>
          </v-col>
        </v-row>
        <v-row v-else-if="state === 'error'" align="center" justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <v-icon color="error">mdi-close</v-icon>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <p>
              There was an error trying to delete product data. Please try again
            </p>
          </v-col>
        </v-row>
        <v-row v-else-if="state === 'success'">
          <v-col cols="12" class="d-flex justify-center">
            <v-icon color="success">mdi-check</v-icon>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <p>
              Product successfully deleted
            </p>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <template v-if="state === 'confirm'">
          <v-btn text color="primary" @click="TOGGLE_DEL_PROD">Close</v-btn>
          <v-btn
            text
            color="error"
            :disabled="isDeleteEnabled"
            @click="startDelete(product.id)"
            >Delete</v-btn
          >
        </template>
        <template v-else-if="state === 'loading'"></template>
        <template v-else-if="state === 'error'">
          <v-btn text color="primary" @click="emitDeleteError">Close</v-btn>
        </template>

        <template v-else-if="state === 'success'">
          <v-btn text color="primary" @click="deleteSuccess">Close</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'DeleteAlert',
  props: ['product'],
  data() {
    return {
      state: 'confirm',
      confirmText: '',
    };
  },
  computed: {
    ...mapGetters(['isDelProdOpen']),
    isDeleteEnabled() {
      return !(this.confirmText === this.product.data.name);
    },
  },
  methods: {
    ...mapActions(['deleteProduct', 'TOGGLE_DEL_PROD', 'TOGGLE_EDIT_PROD']),
    async startDelete(id) {
      this.state = 'loading';
      const res = await this.deleteProduct(id);
      if (res) {
        this.state = 'error';
        console.log(res);
      } else {
        this.state = 'success';
      }
    },
    deleteSuccess() {
      this.TOGGLE_DEL_PROD();
      this.TOGGLE_EDIT_PROD();
      this.confirmText = '';
      this.state = 'confirm';
    },
    emitDeleteError() {
      this.TOGGLE_DEL_PROD();
      this.state = 'confirm';
    },
  },
};
</script>
