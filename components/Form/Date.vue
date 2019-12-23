<script>
    /* global M, uniqid */
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
            value: { // eslint-disable-line vue/require-default-prop
                type: String,
                validator(value) {
                    return /^\d{2}\/\d{2}\/\d{4}$/.test(value)
                },
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
            disabled() {
                this.$emit('change', this.$refs.input.value)
            },
        },
        mounted() {
            this.$nextTick(function nextTick() {
                const datePicker = M.Datepicker.init(this.$refs.input, {
                    autoClose: true,
                    format: 'dd/mm/yyyy',
                    firstDay: 1,
                    i18n: {
                        cancel: 'Annuler',
                        months: [
                            'Janvier', 'Février', 'Mars', 'Avril', 'Mai',
                            'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre',
                            'Novembre', 'Décembre',
                        ],
                        monthsShort: [
                            'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin',
                            'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
                        ],
                        weekdays: [
                            'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
                            'Jeudi', 'Vendredi', 'Samedi',
                        ],
                        weekdaysShort: [
                            'Dim', 'Lun', 'Mar', 'Mer',
                            'Jeu', 'Ven', 'Sam',
                        ],
                        weekdaysAbbrev: [
                            'D', 'L', 'Ma', 'Me',
                            'J', 'V', 'S',
                        ],
                    },
                })
                this.$once('hook:beforeDestroy', () => datePicker.destroy())
            })
        },
    }
</script>

<template>
    <div class="Form--Date input-field">
        <input
            :id="id"
            ref="input"
            :class="`
                Form--Date--Input
                datepicker
                ${validate ? 'validate' : ''}
                ${required && !value ? 'invalid' : ''}
            `"
            :name="name"
            :value="value"
            type="text"
            :disabled="disabled"
            :required="required"
            @input="$emit('change', $event.target.value)"
        >
        <label
            class="Form--Date--Label"
            :for="id"
        >
            {{ label }}
        </label>
    </div>
</template>

<style lang="sass" scoped>
    .Form--Date
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

    .Section .Section .Form--Date
        &::before
            left: -2.5em
            width: 0.7em
            height: 0.7em
</style>

<style lang="sass">
    .datepicker-date-display
        background-color: #4caf50

    .confirmation-btns button
        color: #388e3c;
</style>
