<template>
  <v-dialog
    v-model="isAddProdOpen"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="TOGGLE_ADD_PROD"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-toolbar-title>Add a new product</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="createProduct"
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
                v-model="name"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="price"
                label="Price"
                type="number"
                step=".01"
                prefix="$"
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-btn depressed color="blue-grey lighten-5" @click="onPickFile"
                >Upload Product Image <v-icon>mdi-upload</v-icon></v-btn
              >
              <input
                type="file"
                class="d-none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
              <!-- <v-file-input v-model="file" label="Display Image" required></v-file-input> -->
            </v-col>

            <v-col cols="12" sm="6">
              <v-textarea
                label="Product Description"
                rows="2"
                auto-grow
                v-model="description"
                :rules="[rules.required]"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12" sm="6">
              <v-textarea
                label="Embed Code"
                rows="2"
                auto-grow
                v-model="code"
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
          <template #loading>We are trying to save product data</template>
          <template #success>Product successfully created</template>
          <template #feedback>{{ feedback }}</template>
          <template #error
            >There was an error trying to save product data. Try again
            later.</template
          >
        </LoadingAlert>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import LoadingAlert from '@/components/LoadingAlert';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AddProduct',
  props: ['dialog'],
  components: {
    LoadingAlert,
  },
  data() {
    return {
      code: '',
      description: '',
      image: null,
      imageUrl: null,
      imageName: null,
      name: '',
      price: '',

      alert: false,
      state: 'loading',
      feedback: '',

      rules: {
        required: value => !!value || 'Required',
        file: value => value.size < 1 || 'File required',
      },
    };
  },
  computed: mapGetters(['isAddProdOpen']),
  methods: {
    ...mapActions(['TOGGLE_ADD_PROD', 'CREATE_PRODUCT']),
    async createProduct() {
      this.state = 'loading';
      this.alert = true;

      // Check inputs
      if (!this.name) {
        this.feedback = 'Please enter a product name';
        this.state = 'feedback';
        return;
      }

      if (!this.price) {
        this.feedback = 'Please enter a product price';
        this.state = 'feedback';
        return;
      }

      if (!this.image) {
        this.feedback = 'Please enter a product image';
        this.state = 'feedback';
        return;
      }
      if (!this.description) {
        this.feedback = 'Please enter a product description';
        this.state = 'feedback';
        return;
      }
      if (!this.code) {
        this.feedback = 'Please enter the product embed code';
        this.state = 'feedback';
        return;
      }

      const newProduct = {
        name: this.name,
        description: this.description,
        price: this.price,
        code: this.code,
        image: this.image,
        imageUrl: this.imageUrl,
        imageName: this.imageName,
      };

      const response = await this.CREATE_PRODUCT(newProduct);

      this.feedback = response.feedback;
      this.state = response.success ? 'success' : 'error';
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      let filename = files[0].name;
      this.imageName = filename;
      if (filename.lastIndexOf('.') <= 0) {
        // Message to add a valid file
      }
      // this if for previewing
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    emitClose(event) {
      this.$emit('close', false);
    },
    saveSuccess() {
      this.clearData();
      this.$refs.productForm.resetValidation();
      this.closeAlert();
    },
    closeAlert() {
      this.alert = false;
    },
    clearData() {
      this.code = '';
      this.description = '';
      this.image = '';
      this.name = '';
      this.price = '';
    },
  },
};
</script>
