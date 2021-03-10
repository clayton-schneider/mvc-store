<template>
    <v-container>
        <v-card class="mx-auto" max-width="800px">
            <v-card-title class="orange darken-4 white--text">
                User Directory
                <v-spacer></v-spacer>
                <v-btn fab small color="primary" dark @click="emitDialogClicked"><v-icon>mdi-plus</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-virtual-scroll :items="users" item-height="50" height="200">
                    <template v-slot:default="{item}">
                        <v-list-item>
                            <v-list-item-avatar class="d-flex justify-center">
                                <v-avatar color="blue" class="white--text">
                                    <span>{{item.firstName[0]}}{{item.lastName[0]}}</span>
                                </v-avatar>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{item.email}}</v-list-item-title>
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
import EditUser from '@/components/EditUser'

export default {
    name: 'UserDirectory',
    components: {
        EditUser
    },
    data() {
        return {
            dialog: false,
            user: {},
            users: [
                { firstName: 'Clayton', lastName: 'Schneider', type: 'individual', email: 'clayton@gmail.com', password: '1234'},
                { firstName: 'Billy', lastName: 'Smitth', email: 'billy@gmail.com'},
                { firstName: 'Joe', lastName: 'Mama', email: 'joe@mama.com'},
                { firstName: 'Joe', lastName: 'Mama', email: 'this@that.com'},
                { firstName: 'Joe', lastName: 'Mama', email: 'this@that.com'},
                { firstName: 'Joe', lastName: 'Mama', email: 'this@that.com'},
                { firstName: 'Joe', lastName: 'Mama', email: 'this@that.com'},
            ]
        }
    },
    methods: {
        emitDialogClicked() {
            this.$emit('dialogClicked')
        },
        closeDialog() {
            this.dialog = false
        },
        openDialog(user) {
            this.user = user
            this.dialog = true
        }
    }
}
</script>