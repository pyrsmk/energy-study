<script>
    /* global eventHub */
    import Button from '~/components/Button.vue'

    export default {
        components: {
            Button,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
            returnButton: {
                type: Boolean,
                default: false,
            },
            previousButton: {
                type: Boolean,
                default: false,
            },
            submitButton: {
                type: Boolean,
                default: false,
            },
            nextButton: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            returnToProspectPage() {
                this.$router.push(`/prospect/${this.$route.params.id}`)
            },
            previousTab() {
                eventHub.$emit('previous-tab')
            },
            nextTab() {
                eventHub.$emit('next-tab')
            },
        },
    }
</script>

<template>
    <div
        class="Page"
        :id="id"
    >
        <div class="Page--Wrapper container">
            <div class="Page--Main">
                <slot/>
            </div>
            <div class="Page--Actions">
                <Button
                    v-if="returnButton"
                    label="Retour"
                    icon="arrow_backward"
                    :large="true"
                    @click="returnToProspectPage()"
                />
                <Button
                    v-if="!returnButton"
                    label="Précédent"
                    icon="arrow_backward"
                    :large="true"
                    :disabled="!previousButton"
                    @click="previousTab()"
                />
                <Button
                    label="Envoyer"
                    icon="send"
                    :icon-last="true"
                    :large="true"
                    :disabled="!submitButton"
                    @click="$emit('submit')"
                />
                <Button
                    label="Suivant"
                    icon="arrow_forward"
                    :icon-last="true"
                    :large="true"
                    :disabled="!nextButton"
                    @click="nextTab()"
                />
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    @import '~/assets/mixins.sass'

    .Page--Wrapper
        padding-bottom: 5px
        @include clearfix

    .Page--Actions
        margin-top: 4em
        margin-bottom: 1em
        display: flex
        justify-content: space-between
</style>
