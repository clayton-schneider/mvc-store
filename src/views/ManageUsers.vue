<template>
    <div>
        <AdminNav />
        <UserDirectory @dialogClicked="openDialog" />
        <AddUser @close="closeDialog" :dialog="dialog"/>
    </div>
</template>

<script>
import UserDirectory from '@/components/UserDirectory'
import AdminNav from '@/components/AdminNav'
import AddUser from '@/components/AddUser'

export default {
    components: {
        AdminNav,
        AddUser,
        UserDirectory
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