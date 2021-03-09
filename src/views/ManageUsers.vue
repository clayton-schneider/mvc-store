<template>
    <div>
        <AdminNav />
        <v-btn fab color="primary" dark @click.stop="dialog = true"><v-icon>mdi-plus</v-icon></v-btn>
        <AddUser @close="closeDialog" :dialog="dialog"/>
    </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import AddUser from '@/components/AddUser'
export default {
    components: {
        AdminNav,
        AddUser
    },
    data() {
        return {
            dialog: false
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
        }
    }
    
}
</script>