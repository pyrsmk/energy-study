<script>
    import Page from '~/components/Page.vue'
    import Section from '~/components/Section.vue'
    import Input from '~/components/Form/Input.vue'
    import Select from '~/components/Form/Select.vue'
    import SelectOption from '~/components/Form/Select/Option.vue'

    export default {
        components: {
            Page,
            Section,
            Input,
            Select,
            SelectOption,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        }
    }
</script>

<template>
    <Page
        :id="id"
        previous-button
        next-button
    >
        <Section title="Type d'habitation">
            <Select
                label="Type"
                :disabled="$store.state.form.filled"
                @change="$store.commit('form/housingType', {
                    id: $event.value,
                    label: $event.label
                })"
            >
                <SelectOption
                    v-for="item in $store.state.form.habitationTypeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="item.id === $store.state.form.housingType.id"
                />
            </Select>
        </Section>
        <Section title="Détails">
            <Input
                label="Année de construction"
                type="number"
                pattern="1[0-9]{3}"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.constructionYear"
                @change="$store.commit('form/constructionYear', $event)"
            />
            <Input
                label="Année d'emménagement"
                type="number"
                pattern="1[0-9]{3}"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.moveInDate"
                @change="$store.commit('form/moveInDate', $event)"
            />
            <Input
                label="Surface habitable (m²)"
                type="number"
                :step="0.01"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.livingArea"
                @change="$store.commit('form/livingArea', $event)"
            />
        </Section>
    </Page>
</template>
