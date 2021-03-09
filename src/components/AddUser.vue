<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click='emitClose'><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>Add a new user</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click='createProduct'><v-icon>mdi-save</v-icon>Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-form ref="userForm">
                    <v-row>
                        <v-col cols="12" sm="6" >
                            <v-text-field label="User Email" v-model="email" :rules="[rules.required]" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" >
                            <v-text-field v-model="password" label="Password" type="password" :rules="[rules.required]" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" >
                            <div>Are they an individual or organization?</div>
                            <v-radio-group v-model="type" row mandatory>

                                <v-radio label="Individual" value="individual">
                                    Individual
                                </v-radio>
                                <v-radio label="Organization" value="organization">
                                    Organization
                                </v-radio>
                            </v-radio-group>
                        </v-col>

                        <template v-if="type === 'individual'">
                            <v-col cols="12" sm="4">
                                <v-text-field label="First Name"  v-model="firstName" :rules="[rules.required]" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field label="Last Name"  v-model="lastName" :rules="[rules.required]" required></v-text-field>
                            </v-col>
                        </template>

                        <v-col v-else cols="12" sm="4">
                            <v-text-field label="Organization Name"  v-model="orgName" :rules="[rules.required]" required></v-text-field>
                        </v-col>

                    </v-row>
                </v-form>

                <LoadingAlert :alert="alert" :state="state" @saveSuccess="saveSuccess" @saveError="closeAlert">
                    <template #loading>We are trying to save user data</template>
                    <template #success>User successfully created</template>
                    <template #error>There was an error trying to save user data. Try again later.</template>
                </LoadingAlert>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import LoadingAlert from '@/components/LoadingAlert'

export default {
    name: 'AddProduct',
    components: {
        LoadingAlert
    },
    props: ['dialog'],
    data() {
        return {
            alert: false,
            state: 'success',
            type: '',
            email: '',
            password: '',
            name: '',
            type: '',
            firstName: '',
            lastName: '',
            orgName: '',

            rules: {
                required: value => !!value || 'Required',
                file: value => value.size === 0 || 'File required'
            }
        }
    },
    methods: {
        createProduct() {
            console.log(this.email, this.password, this.type, this.firstName, this.lastName, this.orgName)
            this.alert = true
        },
        emitClose(event) {
            this.$emit('close', false)
        },
        closeAlert() {
            this.alert = false
        },
        clearData() {
            this.email = ''
            this.password = ''
            this.type = 'individual'
            this.firstName = ''
            this.lastName = ''
            this.orgName = ''
        },
        saveSuccess() {
            this.clearData()
            this.$refs.userForm.resetValidation()
            this.closeAlert()
        }
    }
}
</script>