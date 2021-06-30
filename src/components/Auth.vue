<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="12" sm="10" md="4" lg="4">
        <v-card>
          <v-row justify="center" align="center">
            <v-col cols="4">
              <v-img src="../../public/MVCLogo.png"></v-img>
            </v-col>
          </v-row>
          <v-card-title v-if="mode === 'signup'" class="headline"
            >Signup</v-card-title
          >
          <v-card-title v-else-if="mode === 'login'" class="headline"
            >Login</v-card-title
          >
          <v-card-text>
            <v-form v-if="mode === 'login'" @submit.prevent="login">
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                v-model="email"
                outlined
              ></v-text-field>
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                v-model="password"
                outlined
              ></v-text-field>
              <p v-if="feedback">{{ feedback }}</p>
              <v-btn type="submit" color="primary" class="my-2">Login</v-btn>
            </v-form>
            <v-form v-else-if="mode === 'signup'" @submit.prevent="signup">
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                v-model="email"
                outlined
              ></v-text-field>
              <v-text-field
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                v-model="password"
                outlined
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                prepend-icon="mdi-lock"
                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirm ? 'text' : 'password'"
                @click:append="showConfirm = !showConfirm"
                v-model="confirm"
                outlined
              ></v-text-field>
              <p v-if="feedback">{{ feedback }}</p>
              <v-btn
                type="submit"
                color="primary"
                class="my-2"
                :disabled="password !== confirm || password === ''"
                >Signup</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { projectAuth, projectFirestore } from '../firebase/config';

export default {
  name: 'Auth',
  props: ['mode'],
  data() {
    return {
      password: '',
      confirm: '',
      email: '',
      feedback: '',
      showPass: false,
      showConfirm: false,
    };
  },
  methods: {
    async signup() {
      this.feedback = '';
      // Check email
      if (!this.email) {
        this.feedback = 'Please enter your email.';
        return;
      }
      // Check password
      if (!this.password) {
        this.feedback = 'Please enter your password';
        return;
      }
      try {
        const res = await projectAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        // Check for error
        if (!res) {
          throw new Error('Could not complete signup');
        }

        let ref = await projectFirestore
          .collection('users')
          .doc(res.user.uid)
          .set({ user_id: res.user.uid });

        this.$router.push({ name: 'Setup' });
      } catch (err) {
        console.log(err);
        this.feedback = err;
      }
    },
    async login() {
      this.feedback = '';
      // Check email
      if (!this.email) {
        this.feedback = 'Please enter your email.';
        return;
      }
      // Check password
      if (!this.password) {
        this.feedback = 'Please enter your password';
        return;
      }
      try {
        const res = await projectAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        if (!res) {
          throw new Error('Could not login');
        }
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.feedback = err;
      }
    },
  },
};
</script>
