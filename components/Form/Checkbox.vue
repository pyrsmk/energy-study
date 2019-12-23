<script>
    export default {
        props: {
            name: {
                type: String,
                default: null,
            },
            label: {
                type: String,
                required: true,
            },
            value: Boolean,
            type: {
                type: String,
                default: 'text',
            },
            disabled: Boolean,
        },
        watch: {
            disabled() {
                this.$emit('change', this.$refs.checkbox.checked)
            },
        },
    }
</script>

<template>
    <label class="Form--Checkbox">
        <input
            ref="checkbox"
            type="checkbox"
            class="Form--Checkbox--Input filled-in"
            :name="name"
            :disabled="disabled"
            :checked="value"
            @input="$emit('change', $event.target.checked)"
        >
        <span class="Form--Checkbox--Label">{{ label }}</span>
    </label>
</template>

<style lang="sass" scoped>
    .Form--Checkbox
        display: block
        margin: 0.5em 0
        color: #111 !important
        position: relative

        &::before
            font-size: 1.3em
            content: ''
            background-color: #81c784
            border-radius: 50%
            width: 0.8em
            height: 0.8em
            position: absolute
            left: -3.2em
            top: 0.5em

    .Form--Checkbox--Label
        padding-left: 2em !important

        &::after
            top: 2px !important
            border-color: #757575 !important

        .Form--Checkbox--Input:checked + &:after
            background-color: #43a047 !important
            border-color: #43a047 !important
</style>
