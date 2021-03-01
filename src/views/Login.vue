<template>
  <Auth :mode="'login'" />
</template>

<script>
import Auth from '@/components/Auth.vue';
export default {
  name: 'Login',
  components: {
    Auth,
  },
};
</script>
