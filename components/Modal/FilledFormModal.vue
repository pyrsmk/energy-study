<script>
    import Modal from '~/components/Modal.vue'
    import Button from '~/components/Button.vue'

    export default {
        components: {
            Modal,
            Button,
        },
        props: {
            show: {
                type: Boolean,
                required: true,
            }
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
        class="FilledFormModal"
        title="Formulaire verrouillé"
        :show="show"
    >
        <template v-slot:main>
            <div class="FilledFormModal--Text">
                Cette étude énergétique a déjà été remplie et est dorénavant
                verrouillée.<br>Vous ne pourrez donc éditer aucune information
                client.
            </div>
        </template>
        <template v-slot:actions>
            <Button
                label="Très bien"
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
    .FilledFormModal--Text
        padding: 2em
        font-size: 1.2em
</style>
