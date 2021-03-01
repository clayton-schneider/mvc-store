<template>
  <Auth :mode="'signup'" />
</template>

<script>
import Auth from '@/components/Auth.vue';
export default {
  name: 'Signup',
  components: {
    Auth,
  },
};
</script>
