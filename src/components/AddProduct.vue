<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click='emitClose'><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>Add a new product</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click='createProduct'><v-icon>mdi-save</v-icon>Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Product Name" v-model="name" :rules="[rules.required]" required></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="price" label="Price" type="number" step=".01" prefix="$" :rules="[rules.required]" required></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-file-input v-model="file" label="Display Image" :rules="[rules.file]" required></v-file-input>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-textarea label="Product Description" rows="2" auto-grow v-model="description" :rules="[rules.required]" required></v-textarea>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-textarea label="Embed Code" rows="2" auto-grow v-model="code" :rules="[rules.required]" required></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'AddProduct',
    props: ['dialog'],
    data() {
        return {
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
        async createProduct() {
            console.log(this.code, this.description, this.file, this.name, this.price)
        },
        emitClose(event) {
            this.$emit('close', false)
        }
    }
}
</script>