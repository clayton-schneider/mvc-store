<template>
    <v-container>
        <v-card class="mx-auto" max-width="800px">
            <v-card-title class="orange darken-4 white--text">
                Products
                <v-spacer></v-spacer>
                <v-btn fab small color="primary" dark @click="emitDialogClicked"><v-icon>mdi-plus</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-virtual-scroll :items="products" item-height="50" height="200">
                    <template v-slot:default="{item}">
                        <v-list-item>
                            <!-- <v-list-item-avatar class="d-flex justify-center">
                                <v-avatar color="blue" class="white--text">
                                    <span>{{item.name}}</span>
                                </v-avatar>
                            </v-list-item-avatar> -->

                            <v-list-item-content>
                                <v-list-item-title>{{item.name}}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn depressed small @click="openDialog(item)">
                                    Edit Product
                                    <v-icon color="orange darken-4" right>mdi-open-in-new</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>
            </v-card-text>
        </v-card>
        <EditProduct :dialog="dialog" :product="product" @close="closeDialog" />
    </v-container>
</template>

<script>
import EditProduct from '@/components/EditProduct'

export default {
    name: 'ProductDirectory',
    components: {
        EditProduct
    },
    data() {
        return {
            dialog: false,
            product: {},
            products: [
                { code: '<CODE>', description: 'DESCRIPTION', file: {}, name: 'STOLEN CHILDHOODS', price: '1234'},
                { code: '<CODE>', description: 'DESCRIPTION', file: {}, name: 'BEL ASHRAM', price: '1234'},
                { code: '<CODE>', description: 'DESCRIPTION', file: {}, name: 'THE SAME HEART', price: '1234'},
                { code: '<CODE>', description: 'DESCRIPTION', file: {}, name: 'RESCUING EMMANUEL', price: '1234'},

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
        openDialog(product) {
            this.product = product
            this.dialog = true
        }
    }
}
</script>