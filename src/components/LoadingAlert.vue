<template>
    <v-dialog v-model="alert" max-width="500px" persistent transition="dialog-bottom-transition">
        <v-card>
                <v-container>
                    <v-row align="center" justify="center">
                        <v-col cols="12" class="d-flex justify-center">
                            <v-progress-circular v-if="state === 'loading'" indeterminate color="primary"></v-progress-circular>
                            <v-icon v-else-if="state === 'success'" color="success" large>mdi-check</v-icon>
                            <v-icon v-else-if="state === 'error' || 'feedback'" color="error" large>mdi-close</v-icon>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <p>
                                <slot v-if="state === 'loading'" name="loading"></slot>
                                <slot v-else-if="state === 'success'" name="success"></slot>
                                <slot v-else-if="state === 'error'" name="error"></slot>
                                <slot v-else-if="state === 'feedback'" name="feedback"></slot>
                            </p>
                        </v-col>
                    </v-row>
                </v-container>

                <v-card-actions v-if="state === 'loading'">

                </v-card-actions>
                <v-card-actions v-else-if="state === 'success' || 'error' || 'feedback'">
                    <v-spacer></v-spacer>
                    <v-btn v-if="state === 'success'" text color="primary" @click='emitSaveSuccess'>Close</v-btn>
                    <v-btn v-else-if="state === 'error' || 'feedback'" text color="primary" @click='emitSaveError'>Close</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'LoadingAlert',
    props: ['alert', 'state'],
    methods: {
        emitSaveSuccess() {
            this.$emit('saveSuccess')
        },
        emitSaveError() {
            this.$emit('saveError')
        }
    }

}
</script>