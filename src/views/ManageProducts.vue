<template>
    <div>
        <AdminNav />
        <ProductDirectory @dialogClicked="openDialog" />
        <AddProduct @close="closeDialog" :dialog="dialog" />
    </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import ProductDirectory from '@/components/ProductDirectory'
import AddProduct from '@/components/AddProduct'
export default {
    components: {
        AdminNav,
        AddProduct,
        ProductDirectory
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
        },
        openDialog() {
            this.dialog = true
        }
    }
    
}
</script>