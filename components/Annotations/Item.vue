<script>
    export default {
        props: {
            id: {
                type: Number,
                required: true,
            },
        },
    }
</script>

<template>
    <li class="Annotations--Item">
        <span class="Annotations--Item--Id">{{ id }}</span>
        <span class="Annotations--Item--Text"><slot/></span>
    </li>
</template>

<style lang="sass" scoped>
    .Annotations--Item
        color: #777
        font-size: 0.8em
        line-height: 1.2em

    .Annotations--Item--Id
        font-weight: bold
        &::after
            content: '.'
</style>
