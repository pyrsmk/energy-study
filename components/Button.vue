<script>
    export default {
        props: {
            label: {
                type: String,
                required: true,
            },
            icon: {
                type: String,
                default: '',
            },
            iconLast: Boolean,
            disabled: Boolean,
            large: Boolean,
        },
    }
</script>

<template>
    <a
        :class="`
            Button
            ${large ? 'large' : ''}
            waves-effect
            waves-light
            btn-large
            ${disabled ? 'disabled' : ''}
        `"
        @click="$emit('click')"
    >
        <i
            v-if="icon"
            :class="`
                Button--Icon
                material-icons
                ${iconLast ? 'right' : 'left'}
            `"
        >
            {{ icon }}
        </i>
        {{ label }}
    </a>
</template>

<style lang="sass" scoped>
    .Button
        display: inline-block
        width: 180px
        background-color: #388e3c

        &:hover, &:focus
            color: white !important
            background-color: #4caf50

        &.large
            width: 215px

    .Button--Icon
        width: 24px
</style>
