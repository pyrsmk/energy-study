<script>
    /* global M, eventHub */
    export default {
        data() {
            return {
                instance: null,
            }
        },
        mounted() {
            this.$nextTick(function nextTick() {
                this.instance = M.Tabs.init(this.$refs.tabs, {
                    swipeable: true,
                    onShow: () => {
                        if (this.instance !== null) {
                            this.initTab(this.instance.index)
                        }
                    },
                })
                this.$once('hook:beforeDestroy', () => {
                    this.instance.destroy()
                    this.instance = null
                })
                this.plugEvents()
                this.initCarousel()
                setTimeout(() => this.instance.updateTabIndicator(), 1000)
            })
        },
        methods: {
            plugEvents() {
                eventHub.$on('next-tab', () => {
                    const next = this.instance.index + 1
                    const end = this.instance.$tabLinks.length - 1
                    if (this.instance.index < end) {
                        this.instance.select(
                            this.instance.$tabLinks[next].hash.substr(1)
                        )
                    }
                })
                eventHub.$on('previous-tab', () => {
                    const prev = this.instance.index - 1
                    if (this.instance.index > 0) {
                        this.instance.select(
                            this.instance.$tabLinks[prev].hash.substr(1)
                        )
                    }
                })
                eventHub.$on('to-tab', id => {
                    this.instance.select(id)
                })
                eventHub.$on('refresh-carousel', () => {
                    setTimeout(() => {
                        this.resizeCarousel(
                            this.heightFromTab(this.instance.index)
                        )
                    }, 100)
                })
            },
            initTab(index) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
                this.resizeCarousel(
                    this.heightFromTab(index)
                )
                this.instance.updateTabIndicator()
            },
            initCarousel() {
                const interval = setInterval(() => {
                    if (document.querySelector('.tabs-content') !== null) {
                        clearInterval(interval)
                        setTimeout(() => {
                            this.resizeCarousel(
                                this.heightFromTab(0)
                            )
                        }, 100)
                    }
                }, 50)
            },
            heightFromTab(index) {
                return document
                    .querySelectorAll('.tabs-content .container')[index]
                    .offsetHeight
            },
            resizeCarousel(height) {
                const carousel = document.querySelector('.tabs-content')
                carousel.style.height = `calc(${height}px + 4em)`
            },
        },
    }
</script>

<template>
    <div class="Navigation row">
        <ul
            ref="tabs"
            class="Navigation--List tabs"
        >
            <slot/>
        </ul>
    </div>
</template>

<style lang="sass" scoped>
    .Navigation--List
        list-style-type: none
        counter-reset: tab
        display: flex
        flex-direction: row
</style>

<style lang="sass">
    .indicator
        background-color: #81c784 !important
</style>
