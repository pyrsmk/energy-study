<script>
    /* global M */
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
            disabled: Boolean,
        },
        data() {
            return {
                instance: null,
            }
        },
        watch: {
            disabled(disabled) {
                const value = disabled
                    ? null
                    : this.$refs.select.selectedOptions[0].value
                const label = disabled
                    ? null
                    : this.$refs.select.selectedOptions[0].textContent.trim()
                this.$emit('change', { value, label })
            },
        },
        mounted() {
            this.$nextTick(function nextTick() {
                this.instance = M.FormSelect.init(this.$refs.select)
                this.$once('hook:beforeDestroy', () => {
                    this.instance.destroy()
                    this.instance = null
                })
            })
        },
    }
</script>

<template>
    <div class="Form--Select input-field">
        <select
            ref="select"
            class="Form--Select--Select"
            :name="name"
            :disabled="disabled"
            @change="$emit('change', {
                value: $event.target.selectedOptions[0].value,
                label: $event.target.selectedOptions[0].textContent.trim()
            })"
        >
            <slot/>
        </select>
        <label class="Form--Select--Label">{{ label }}</label>
    </div>
</template>

<style lang="sass" scoped>
    .Form--Select
        margin-top: 2em
        &::before
            content: ''
            background-color: #81c784
            border-radius: 50%
            width: 0.8em
            height: 0.8em
            position: absolute
            left: -3.2em
            top: 1.5em

    .Section .Section .Form--Select
        &::before
            left: -2.5em
            width: 0.7em
            height: 0.7em
</style>

<style lang="sass">
    .select-wrapper input,
    .select-dropdown span
        color: #388e3c !important

    .select-wrapper .select-dropdown:focus
        border-bottom-color: #4caf50 !important
</style>
