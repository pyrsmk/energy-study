<script>
    /* global uniqid */
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
            value: {}, // eslint-disable-line
            type: {
                type: String,
                default: 'text',
            },
            pattern: {
                type: String,
                default: null
            },
            step: {
                type: Number,
                default: 1,
            },
            min: {
                type: Number,
                default: 0,
            },
            validate: {
                type: Boolean,
                default: true,
            },
            disabled: Boolean,
            required: Boolean,
        },
        data() {
            return {
                id: uniqid(),
            }
        },
        watch: {
            disabled(disabled) {
                if (disabled) {
                    this.$refs.input.className = 'validate'
                    this.$refs.label.className = ''
                } else {
                    this.$refs.label.className = 'emphasize'
                }
                this.$emit(
                    'change',
                    this.formatValue(this.$refs.input.value)
                )
            },
        },
        mounted() {
            // Force validation at init
            if (this.validate) {
                const event = document.createEvent('HTMLEvents')
                event.initEvent('blur', false, true)
                this.$refs.input.dispatchEvent(event)
            }
            // Force 'active' class on label when a value is set
            setInterval(() => {
                if (this.$refs.label !== undefined
                    && this.$refs.label.classList.contains('active') === false
                    && this.value
                ) {
                    this.$refs.label.classList.add('active')
                }
            }, 100)
        },
        methods: {
            formatValue(value) {
                if (this.type === 'number') {
                    return Number(value)
                }
                return value
            }
        }
    }
</script>

<template>
    <div class="Form--Input input-field">
        <input
            :id="id"
            ref="input"
            :class="`
                Form--Input--Input
                ${validate ? 'validate' : ''}
            `"
            :value="type === 'number' && value === 0 ? '' : value"
            :name="name"
            :type="type"
            :pattern="pattern"
            :step="type === 'number' ? step : false"
            :min="type === 'number' ? min : false"
            :disabled="disabled"
            :required="required"
            @input="$emit('change', formatValue($event.target.value))"
        >
        <label
            ref="label"
            :for="id"
            class="Form--Input--Label"
        >
            {{ label }}
        </label>
    </div>
</template>

<style lang="sass" scoped>
    .Form--Input
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

    .Section .Section .Form--Input
        &::before
            left: -2.5em
            width: 0.7em
            height: 0.7em

    .Form--Input--Input
        &:focus
            border-bottom-color: #388e3c !important

    .Form--Input--Label
        .Form--Input--Input:focus + &, &.emphasize
            color: #388e3c !important
</style>
