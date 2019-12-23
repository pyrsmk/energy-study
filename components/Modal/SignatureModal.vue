<script>
    /* global SignaturePad */

    import Modal from '~/components/Modal.vue'
    import Checkbox from '~/components/Form/Checkbox.vue'
    import Button from '~/components/Button.vue'

    export default {
        components: {
            Modal,
            Checkbox,
            Button,
        },
        data() {
            return {
                signaturePad: null,
                signatureCheckbox: false,
            }
        },
        methods: {
            open() {
                this.signatureCheckbox = false
                this.signaturePad = new SignaturePad(this.$refs.signatureCanvas)
                this.$refs.modal.open()
            },
            close() {
                this.$refs.modal.close()
            },
            opened() {
                return this.$refs.modal.opened()
            },
            clearSignatureModal() {
                this.signaturePad.clear()
                this.signatureCheckbox = false
            },
        },
    }
</script>

<template>
    <Modal
        ref="modal"
        class="SignatureModal"
        title="Exploitation des données"
    >
        <template v-slot:main>
            <p>
                Confiance Energie a besoin de votre autorisation pour utiliser
                vos données anonymisées à des fins analytiques et statistiques.
            </p>
            <canvas
                ref="signatureCanvas"
                width="700"
                height="300"
            />
            <Checkbox
                label="Je comprends et autorise Confiance Energie à utiliser
                       mes données anonymisées"
                name="signatureCheckbox"
                :value="signatureCheckbox"
                @change="signatureCheckbox = $event"
            />
        </template>
        <template v-slot:actions>
            <Button
                label="Effacer"
                icon="clear_all"
                @click="clearSignatureModal()"
            />
            <Button
                label="Annuler"
                icon="close"
                @click="
                    $refs.modal.close()
                    $emit('close')
                "
            />
            <Button
                label="Ok"
                icon="check"
                :disabled="!signatureCheckbox || signaturePad.isEmpty()"
                @click="
                    $refs.modal.close()
                    $emit('ok', signaturePad.toDataURL('image/jpeg'))
                "
            />
        </template>
    </Modal>
</template>

<style lang="sass" scoped>
    canvas
        display: block
        margin: 2em auto
        background-color: #e8f5e9
        border-radius: 3px
</style>
