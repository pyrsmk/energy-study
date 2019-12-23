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
                messages: []
            }
        },
        methods: {
            openWith(messages) {
                this.messages = messages
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
        class="ErrorMessagesModal"
        title="Champs requis non renseignés"
        important
    >
        <template v-slot:main>
            <div class="ErrorMessagesModal--Details">
                Les champs requis suivants n'ont pas été renseignés :
            </div>
            <ul class="ErrorMessagesModal--Messages">
                <li
                    class="ErrorMessagesModal--Messages--Message"
                    v-for="message in messages"
                    :key="message"
                >
                    {{ message }}
                </li>
            </ul>
        </template>
        <template v-slot:actions>
            <Button
                label="Annuler"
                icon="close"
                @click="
                    $refs.modal.close()
                    $emit('cancel')
                "
            />
            <Button
                label="Continuer"
                icon="check"
                large
                @click="
                    $refs.modal.close()
                    $emit('continue')
                "
            />
        </template>
    </Modal>
</template>

<style lang="sass" scoped>
    .ErrorMessagesModal--Details
        font-size: 1.4em

    .ErrorMessagesModal--Messages
        margin-top: 1em
        padding-left: 2em

    .ErrorMessagesModal--Messages--Message
        font-family: 'Cousine', monospace
        list-style-type: disc
</style>
