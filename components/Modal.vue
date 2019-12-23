<script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
            important: {
                type: Boolean,
                default: false,
            },
            success: {
                type: Boolean,
                default: false,
            },
            show: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                visible: this.show || false,
            }
        },
        mounted() {
            // Move modal into body
            document.body.appendChild(
                this.$refs.modal.parentNode.removeChild(
                    this.$refs.modal
                )
            )
        },
        methods: {
            open() {
                // Show modal
                this.visible = true
                // Remove body's scrollbar
                document.body.style.overflow = 'hidden'
                // Adapt layout
                if (this.$refs.modal.scrollHeight > window.innerHeight) {
                    this.$refs.modal.style.minHeight = '100%'
                    this.$refs.modal.style.borderRadius = 'initial'
                }
            },
            close() {
                // Hide modal
                this.visible = false
                // Restore body's scrollbar
                document.body.style.overflow = 'auto'
            },
            opened() {
                return this.visible
            }
        },
    }
</script>

<template>
    <div
        ref="modal"
        :class="`
            Modal
            ${visible ? 'show' : ''}
            ${important ? 'important' : ''}
            ${success ? 'success' : ''}
        `"
    >
        <div class="Modal--Wrapper">
            <h2 class="Modal--Title">
                {{ title }}
            </h2>
            <div class="Modal--Main">
                <slot name="main"/>
            </div>
            <div class="Modal--Actions">
                <slot name="actions"/>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    .Modal
        z-index: 9999
        position: fixed
        top: -100%
        left: 0
        width: 100vw
        height: 100vh
        background: rgba(0, 0, 0, 0.7)
        opacity: 0
        overflow-x: auto
        &.show
            top: 0
            opacity: 1
        &.important, &.success
            & *
                color: white !important
            & .Button
                background-color: white
                color: #111 !important
        &.important
            & .Modal--Wrapper
                background: #e53935
            & .Button
                &:hover, &:focus
                    background-color: #ffcdd2
        &.success
            & .Modal--Wrapper
                background: #4caf50
            & .Button
                &:hover, &:focus
                    background-color: #c8e6c9

    .Modal--Wrapper
        display: flex
        flex-direction: column
        position: relative
        width: 100%
        max-width: 1024px
        margin: 0 auto
        min-height: 100%
        background: white
        padding: 2em
        overflow: hidden
        @media (min-width: 1280px)
            min-height: auto
            margin: 2em auto
            top: -100%
            border-radius: 3px
            .Modal.show &
                top: 0
                transition: top 750ms

    .Modal--Title
        color: #388e3c !important
        font-size: 2.4em !important
        margin-top: 0
        margin-bottom: 1em;
        font-family: 'Oswald', sans-serif

    .Modal--Main
        flex-grow: 1

    .Modal--Actions
        margin-top: 2em
        text-align: right
        & > *
            margin-left: 2em
</style>
