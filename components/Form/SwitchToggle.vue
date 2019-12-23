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
            offLabel: {
                type: String,
                default: 'Non',
            },
            onLabel: {
                type: String,
                default: 'Oui',
            },
            disabled: Boolean,
        },
        watch: {
            disabled(disabled) {
                if (disabled) {
                    this.$refs.checkbox.checked = false
                }
                this.$emit('change', this.$refs.checkbox.checked)
            },
        },
    }
</script>

<template>
    <div class="Form--SwitchToggle">
        <span class="Form--SwitchToggle--Label">{{ label }}</span>
        <div class="Form--SwitchToggle--Wrapper switch">
            <label class="Form--SwitchToggle--Wrapper2">
                <span class="Form--SwitchToggle--OffLabel">
                    {{ offLabel }}
                </span>
                <input
                    ref="checkbox"
                    class="Form--SwitchToggle--Input"
                    type="checkbox"
                    :name="name"
                    :disabled="disabled"
                    :checked="value"
                    @input="$emit('change', $event.target.checked)"
                >
                <span class="Form--SwitchToggle--Lever lever"/>
                <span class="Form--SwitchToggle--OnLabel">
                    {{ onLabel }}
                </span>
            </label>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    .Form--SwitchToggle--Label
        position: relative

        &::before
            content: ''
            background-color: #81c784
            border-radius: 50%
            width: 0.8em
            height: 0.8em
            position: absolute
            left: -3.2em
            top: 0.3em

    .Section .Section .Form--SwitchToggle--Label
        &::before
            left: -2.5em
            width: 0.7em
            height: 0.7em

    .Form--SwitchToggle--Wrapper2,
    .Form--SwitchToggle--Label
        display: block
        margin: 2em 0 1em 0
        color: #111 !important

    .Form--SwitchToggle--Lever
        .Form--SwitchToggle--Wrapper input[type=checkbox]:checked + &
            background-color: #81c784 !important

            &::after
                background-color: #388e3c !important
</style>
