<script>
    import Vue from 'vue'
    import '~/assets/materialize-1.0.0.min.js'

    window.eventHub = new Vue()
    window.uniqid = () => `_${Math.random().toString(36).substr(2, 9)}`

    export default {}
</script>

<template>
    <div class="DefaultLayout">
        <nuxt/>
    </div>
</template>

<style lang="sass">
    body
        font-family: 'Noto Sans', sans-serif

    ::selection
        background: #c8e6c9
</style>
