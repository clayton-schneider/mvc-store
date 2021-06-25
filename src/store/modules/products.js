import { projectFirestore, projectStorage } from '@/firebase/config';

const state = {
  products: [],
  editProduct: {},
};

const getters = {
  allProducts: state => state.products,
  editProduct: state => state.editProduct,
};

const actions = {
  async fetchProducts({ commit }) {
    const res = await projectFirestore.collection('products').get();
    const products = res.docs.map(doc => {
      const reform = { id: doc.id, data: doc.data() };
      return reform;
    });
    commit('setProducts', products);
  },
  async deleteProduct({ commit }, id) {
    try {
      await projectFirestore
        .collection('products')
        .doc(id)
        .delete();
      commit('removeProduct', id);
    } catch (err) {
      return err;
    }
  },
  async CREATE_PRODUCT({ commit }, newProduct) {
    try {
      // Submit to Firebase
      let docRef = await projectFirestore.collection('products').add({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        code: newProduct.code,
      });
      const productID = docRef.id;

      // Handle Image
      const filePath = `products/${productID}/${newProduct.imageName}`;
      const storageRef = projectStorage.ref(filePath);
      const res = await storageRef.put(newProduct.image);
      const imageUrl = await res.ref.getDownloadURL();

      // // Update doc to have download url
      docRef.update({ image: imageUrl });

      //   reformat to align with format of products
      newProduct.image = imageUrl;
      const reformat = {};
      reformat.data = newProduct;

      //   Commit mutation to add product to product list
      commit('addProduct', reformat);

      return { success: true, feedback: '' };
    } catch (err) {
      return { success: false, feedback: err };
    }
  },
  async EDIT_PRODUCT({ commit }, editProduct) {
    try {
      // submit to firebase
      let res = await projectFirestore
        .collection('products')
        .doc(editProduct.id)
        .set(editProduct.data);

      // Commit mutation to update product data in product list
      commit('updateProduct', editProduct);

      // return success
      return { success: true, feedback: '' };
    } catch (err) {
      return { success: false, feedback: err };
    }
  },
  SET_EDIT_PRODUCT({ commit }, product) {
    commit('setEditProduct', product);
  },
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  removeProduct: (state, id) => {
    state.products = state.products.filter(product => product.id !== id);
  },
  setEditProduct: (state, product) => (state.editProduct = product),
  addProduct: (state, newProduct) => state.products.unshift(newProduct),
  updateProduct: (state, editProduct) => {
    const index = state.products.findIndex(
      product => product.id === editProduct.id
    );
    state.products[index] = editProduct;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
