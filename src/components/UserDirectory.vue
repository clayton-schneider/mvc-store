<template>
  <v-container>
    <v-card class="mx-auto" max-width="800px">
      <v-card-title class="orange darken-4 white--text">
        User Directory
        <v-spacer></v-spacer>
        <v-btn fab small color="primary" dark @click="emitDialogClicked"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-virtual-scroll :items="users" item-height="50" height="200">
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-avatar class="d-flex justify-center">
                <!-- <v-avatar color="blue" class="white--text">
                  <span
                    >{{ item.data.profileInfo.firstName
                    }}{{ item.data.profileInfo.lastName }}</span
                  >
                </v-avatar> -->
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  item.data.profileInfo.email
                }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn depressed small @click="openDialog(item)">
                  Manage User
                  <v-icon color="orange darken-4" right>mdi-open-in-new</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card-text>
    </v-card>
    <EditUser :dialog="dialog" :user="user" @close="closeDialog" />
  </v-container>
</template>

<script>
import { projectFirestore } from '../firebase/config';
import EditUser from '@/components/EditUser';

export default {
  name: 'UserDirectory',
  components: {
    EditUser,
  },
  data() {
    return {
      dialog: false,
      user: {},
      users: [],
    };
  },
  async mounted() {
    const users = await projectFirestore.collection('users').get();
    this.users = users.docs.map(doc => {
      const reform = { id: doc.id, data: doc.data() };
      return reform;
    });
  },
  methods: {
    emitDialogClicked() {
      this.$emit('dialogClicked');
    },
    closeDialog() {
      this.dialog = false;
    },
    openDialog(user) {
      this.user = user;
      this.dialog = true;
    },
  },
};
</script>
