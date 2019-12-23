<script>
    import Modal from '~/components/Modal.vue'
    import Button from '~/components/Button.vue'

    export default {
        components: {
            Modal,
            Button,
        },
        methods: {
            open() {
                this.$refs.modal.open()
            },
            close() {
                this.$refs.modal.close()
            },
            opened() {
                return this.$refs.modal.opened()
            }
        },
    }
</script>

<template>
    <Modal
        ref="modal"
        class="SubmitSuccessModal"
        title="Confirmation d'envoi des données"
        success
    >
        <template v-slot:main>
            <div class="SubmitSuccessModal--Text">
                Les données du formulaire d'étude énergétique ont bien été
                enregistrées sur les serveurs Confiance Energie.
            </div>
        </template>
        <template v-slot:actions>
            <Button
                label="Merci"
                icon="check"
                @click="
                    $refs.modal.close()
                    $emit('ok')
                "
            />
        </template>
    </Modal>
</template>

<style lang="sass" scoped>
    .SubmitSuccessModal--Text
        padding: 2em
        font-size: 1.2em
</style>
