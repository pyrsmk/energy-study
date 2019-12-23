<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
        },
    }
</script>

<template>
    <div class="Form--Label">
        {{ text }}
    </div>
</template>

<style lang="sass" scoped>
    .Form--Label
        margin: 2em 0 1em 0
</style>
