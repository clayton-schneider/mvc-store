<template>
  <div class="home">
    <AdminNav />
    <Store />
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav';
import Store from '@/components/Store';
export default {
  name: 'Home',
  components: { AdminNav, Store },
};
</script>
