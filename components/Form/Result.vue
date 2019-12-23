<script>
    export default {
        props: {
            name: {
                type: String,
                default: null,
            },
            label: {
                type: String,
                default: '%d',
            },
            value: {
                type: Number,
                required: true,
            },
        },
    }
</script>

<template>
    <div class="Form--Result">
        <label
            :for="name"
            class="Form--Result--Label"
        >
            {{ label.replace('%d', value) }}
        </label>
        <input
            :id="name"
            class="Form--Result--Input"
            :value="value"
            :name="name"
            type="hidden"
        >
    </div>
</template>

<style lang="sass" scoped>
    .Form--Result
        padding: 1.2em
        background-color: #424242
        border-radius: 3px

    .Form--Result--Label
        color: #ccc
        font-size: 1.1em
</style>
