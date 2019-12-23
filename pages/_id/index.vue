<script>
    import Navigation from '~/components/Navigation.vue'
    import NavigationItem from '~/components/Navigation/Item.vue'
    import Form from '~/components/Form.vue'
    import PreambulePage from '~/components/Page/Preambule.vue'
    import HabitatPage from '~/components/Page/Habitat.vue'
    import IsolationPage from '~/components/Page/Isolation.vue'
    import VisitePage from '~/components/Page/Visite.vue'
    import TeteATetePage from '~/components/Page/TeteATete.vue'
    import ChauffageIdealPage from '~/components/Page/ChauffageIdeal.vue'

    export default {
        components: {
            Navigation,
            NavigationItem,
            Form,
            PreambulePage,
            HabitatPage,
            IsolationPage,
            VisitePage,
            TeteATetePage,
            ChauffageIdealPage,
        },
        async fetch({ route, store }) {
            await store.dispatch('form/init', {
                prospectId: route.params.id
            })
        },
        head() {
            let title = `${this.$store.state.form.prospect.firstname || ''} `
            title += this.$store.state.form.prospect.lastname
            return { title }
        }
    }
</script>

<template>
    <div class="IndexPage">
        <Navigation>
            <NavigationItem
                label="Préambule"
                anchor="#preambule"
            />
            <NavigationItem
                label="Habitat"
                anchor="#habitat"
            />
            <NavigationItem
                label="Isolation"
                anchor="#isolation"
            />
            <NavigationItem
                label="Visite"
                anchor="#visite"
            />
            <NavigationItem
                label="En tête-à-tête"
                anchor="#teteatete"
            />
            <NavigationItem
                label="Chauffage idéal"
                anchor="#chauffageideal"
            />
        </Navigation>
        <Form>
            <PreambulePage id="preambule"/>
            <HabitatPage id="habitat"/>
            <IsolationPage id="isolation"/>
            <VisitePage id="visite"/>
            <TeteATetePage id="teteatete"/>
            <ChauffageIdealPage id="chauffageideal"/>
        </Form>
    </div>
</template>
