<script>
    import Page from '~/components/Page.vue'
    import Section from '~/components/Section.vue'
    import Input from '~/components/Form/Input.vue'
    import FilledFormModal from '~/components/Modal/FilledFormModal.vue'

    export default {
        components: {
            Page,
            Section,
            Input,
            FilledFormModal,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
    }
</script>

<template>
    <Page
        :id="id"
        return-button
        next-button
    >
        <Section title="Composition du foyer">
            <Input
                label="Profession du premier conjoint"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.jobConjoint1"
                @change="$store.commit('form/jobConjoint1', $event)"
            />
            <Input
                label="Profession du deuxième conjoint"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.jobConjoint2"
                @change="$store.commit('form/jobConjoint2', $event)"
            />
            <Input
                label="Age du premier conjoint"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.ageConjoint1"
                @change="$store.commit('form/ageConjoint1', $event)"
            />
            <Input
                label="Age du deuxième conjoint"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.ageConjoint2"
                @change="$store.commit('form/ageConjoint2', $event)"
            />
            <Input
                label="Nombres de personnes composant le foyer"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.householdComposition"
                @change="$store.commit('form/householdComposition', $event)"
            />
        </Section>
        <Section title="Informations de contact">
            <Input
                label="Numéro de téléphone"
                pattern="0[0-9]{9}"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.phone"
                @change="$store.commit('form/phone', $event)"
            />
            <Input
                label="E-mail"
                type="email"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.email"
                @change="$store.commit('form/email', $event)"
            />
            <Input
                label="Adresse"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.address"
                @change="$store.commit('form/address', $event)"
            />
            <Input
                label="Code postal"
                pattern="[0-9]{5}"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.postalCode"
                @change="$store.commit('form/postalCode', $event)"
            />
            <Input
                label="Ville"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.city"
                @change="$store.commit('form/city', $event)"
            />
        </Section>
        <FilledFormModal :show="$store.state.form.filled"/>
    </Page>
</template>
