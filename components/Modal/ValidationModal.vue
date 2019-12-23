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
        class="ValidationModal"
        title="Confirmation d'envoi des données"
        important
    >
        <template v-slot:main>
            <div class="ValidationModal--Text">
                Attention ! Vous vous apprêtez à envoyer et enregistrer les
                informations client sur les serveurs Confiance Energie.
                Veuillez noter que celles-ci ne seront plus éditables par la
                suite. Etes-vous bien sûr de vouloir envoyer les données ?
            </div>
        </template>
        <template v-slot:actions>
            <Button
                label="Non"
                icon="close"
                @click="
                    $refs.modal.close()
                    $emit('close')
                "
            />
            <Button
                label="Oui"
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
    .ValidationModal--Text
        padding: 2em
        font-size: 1.2em
</style>
