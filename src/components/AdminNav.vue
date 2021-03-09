<template>
    <v-toolbar>
        <v-toolbar-title>MVC</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :to="{name: 'ManageProducts'}" class="mr-2">Manage Products</v-btn>
        <v-btn :to="{name: 'ManageUsers'}" class="mr-2">Manage Users</v-btn>
        <v-btn @click="logout">Logout</v-btn>
    </v-toolbar>
</template>

<script>
import {projectAuth} from '../firebase/config'
export default {
    name: 'AdminNav',
    methods: {
        async logout() {
           const res = await projectAuth.signOut()
           this.$router.push({name: 'Login'})
        }
    }
}
</script>