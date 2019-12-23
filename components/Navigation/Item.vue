<script>
    export default {
        props: {
            anchor: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
    }
</script>

<template>
    <li class="Navigation--List--Item tab">
        <a
            :href="anchor"
            class="Navigation--List--Item--Link"
        >
            {{ label }}
        </a>
    </li>
</template>

<style lang="sass" scoped>
    .Navigation--List--Item
        flex-grow: 1

    .Navigation--List--Item--Link
        vertical-align: middle
        color: #388e3c !important
        border-bottom-color: transparent !important

        &:focus, &:hover, &.active
            background-color: #e8f5e9 !important
            border-bottom-color: transparent !important

        &::before
            counter-increment: tab
            content: counter(tab)
            width: 1.8em
            height: 1.8em
            line-height: 1.8em
            display: inline-block
            border-radius: 50%
            position: relative
            left: -0.4em
            color: white
            background-color: #4caf50
</style>
