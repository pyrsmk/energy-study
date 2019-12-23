<script>
    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
        },
    }
</script>

<template>
    <div class="Section section card">
        <div class="Section--Wrapper card-content">
            <h2 class="Section--Title card-title">
                {{ title }}
            </h2>
            <div class="Section--Content">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    .Section
        margin: 2em 0

    .Section--Title
        color: #388e3c !important
        margin: 0 !important
        font-size: 2.4em !important
        font-weight: 400 !important
        font-family: 'Oswald', sans-serif
</style>
