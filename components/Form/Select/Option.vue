<script>
    export default {
        props: {
            value: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            selected: Boolean,
        },
    }
</script>

<template>
    <option
        class="Form--Select--Option"
        :value="value"
        :selected="selected"
    >
        {{ label }}
    </option>
</template>
