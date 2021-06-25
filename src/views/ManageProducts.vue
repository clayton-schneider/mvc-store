<template>
  <div>
    <AdminNav />
    <ProductDirectory />
    <AddProduct />
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav';
import ProductDirectory from '@/components/ProductDirectory';
import AddProduct from '@/components/AddProduct';
export default {
  components: {
    AdminNav,
    AddProduct,
    ProductDirectory,
  },
};
</script>
