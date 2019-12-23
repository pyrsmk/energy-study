<script>
    import Modal from '~/components/Modal.vue'

    export default {
        components: { Modal },
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
        class="SubmittingDataModal"
        title="Envoi des données en cours"
    >
        <template v-slot:main>
            <div class="SubmittingDataModal--Text">
                Cela prendra quelques instants...
            </div>
            <div class="spinner">
                <div class="bounce1"/>
                <div class="bounce2"/>
                <div class="bounce3"/>
            </div>
        </template>
    </Modal>
</template>

<style lang="sass" scoped>
    .SubmittingDataModal--Text
        font-size: 1.4em
        text-align: center
        margin-top: 2em

    .spinner
        margin: 4em auto
        width: 100px
        text-align: center

    .spinner > div
        width: 24px
        height: 24px
        background-color: #388e3c
        border-radius: 100%
        display: inline-block
        animation: sk-bouncedelay 1.4s infinite ease-in-out both

    .spinner .bounce1
        animation-delay: -0.32s

    .spinner .bounce2
        animation-delay: -0.16s

    @keyframes sk-bouncedelay
        0%, 80%, 100%
            transform: scale(0)
        40%
            transform: scale(1.0)
</style>
