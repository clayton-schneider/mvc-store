<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">
      <v-col cols="12" sm="10" md="4" lg="4">
        <h2 class="text-center mb-4">
          Let's setup your account. Answer these questions so we can create the
          right account.
        </h2>
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1">
            Who are you?
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-radio-group v-model="type" row class="pl-2">
              <v-radio label="Individual" value="individual"
                >Individual</v-radio
              >
              <v-radio label="Organization" value="organization"
                >Organization</v-radio
              >
            </v-radio-group>
            <v-btn @click="step = 2" color="primary">Continue</v-btn>
          </v-stepper-content>

          <!-- If individual -->
          <v-stepper-step
            v-if="type === 'individual'"
            :complete="step > 2"
            step="2"
          >
            What is your name?
          </v-stepper-step>
          <!-- If org -->
          <v-stepper-step v-else step="2">
            What is the name of your orginization?
          </v-stepper-step>

          <!-- If individual -->
          <v-stepper-content v-if="type === 'individual'" step="2">
            <v-text-field label="First Name" v-model="firstName"></v-text-field>
            <v-text-field label="Last Name" v-model="lastName"></v-text-field>

            <v-btn @click="updateUser" color="primary" class="mb-2"
              >Submit</v-btn
            >
            <v-btn @click="step = 1" class="ml-2 mb-2">Back</v-btn>
          </v-stepper-content>

          <!-- If Org -->
          <v-stepper-content v-else step="2">
            <v-text-field
              label="Organization Name"
              v-model="orgName"
            ></v-text-field>
            <v-btn @click="updateUser" class="mb-2" color="primary"
              >Submit</v-btn
            >
            <v-btn @click="step = 1" class="ml-2 mb-2">Back</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { projectAuth, projectFirestore } from '../firebase/config';
export default {
  name: 'Setup',
  data() {
    return {
      step: 1,
      type: 'individual',
      firstName: '',
      lastName: '',
      orgName: '',
    };
  },
  methods: {
    async updateUser() {
      let currentUser = projectAuth.currentUser.uid;
      let userEmail = projectAuth.currentUser.email;
      let profileInfo = {};

      if (this.type === 'individual') {
        profileInfo = {
          type: this.type,
          firstName: this.firstName,
          lastName: this.lastName,
          email: userEmail,
        };
      } else {
        profileInfo = {
          type: this.orgName,
          orgName: this.orgName,
          email: userEmail,
        };
      }

      let ref = await projectFirestore
        .collection('users')
        .doc(currentUser)
        .set({ profileInfo });

      this.$router.push({ name: 'Home' });
    },
  },
  mounted() {
    console.log(projectAuth.currentUser);
  },
};
</script>
