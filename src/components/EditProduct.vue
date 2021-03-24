<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click='emitClose'><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>Edit Product: {{product.name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click='createProduct'><v-icon>mdi-save</v-icon>Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-form ref="productForm">
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Product Name" v-model="product.name" :rules="[rules.required]" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="product.price" label="Price" type="number" step=".01" prefix="$" :rules="[rules.required]" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-file-input v-model="product.file" label="Display Image" :rules="[rules.file]" required></v-file-input>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-textarea label="Product Description" rows="2" auto-grow v-model="product.description" :rules="[rules.required]" required></v-textarea>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-textarea label="Embed Code" rows="2" auto-grow v-model="product.code" :rules="[rules.required]" required></v-textarea>
                        </v-col>

                    </v-row>
                </v-form>

                <LoadingAlert :alert="alert" :state="state" @saveSuccess="saveSuccess" @saveError="closeAlert">
                    <template #loading>We are trying to save user data</template>
                    <template #success>User successfully updated</template>
                    <template #error>There was an error trying to save user data. Try again later.</template>
                </LoadingAlert>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import LoadingAlert from '@/components/LoadingAlert'

export default {
    name: 'EditUser',
    components: {
        LoadingAlert
    },
    props: ['dialog', 'product'],
    data() {
        return {
            alert: false,
            state: 'success',
            code: '',
            description: '',
            file: {},
            name: '',
            price: '',

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
            this.$refs.productForm.resetValidation()
            this.closeAlert()
        }
    }
}
</script>