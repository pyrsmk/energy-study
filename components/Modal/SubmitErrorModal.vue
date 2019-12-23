<script>
    import Modal from '~/components/Modal.vue'
    import Button from '~/components/Button.vue'

    export default {
        components: {
            Modal,
            Button,
        },
        data() {
            return {
                message: ''
            }
        },
        methods: {
            openWith(message) {
                this.message = message
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
        class="SubmitErrorModal"
        title="Erreur rencontrée"
        important
    >
        <template v-slot:main>
            <div class="SubmitErrorModal--Details">
                Une erreur a été rencontrée durant l'envoi des données :
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="SubmitErrorModal--Error" v-html="message"/>
        </template>
        <template v-slot:actions>
            <Button
                label="Fermer"
                icon="check"
                @click="
                    $refs.modal.close()
                    $emit('close')
                "
            />
        </template>
    </Modal>
</template>

<style lang="sass" scoped>
    .SubmitErrorModal--Details
        font-size: 1.4em

    .SubmitErrorModal--Error
        margin-top: 2em
        font-family: 'Cousine', monospace
</style>
