<script>
    import Page from '~/components/Page.vue'
    import Section from '~/components/Section.vue'
    import Select from '~/components/Form/Select.vue'
    import SelectOption from '~/components/Form/Select/Option.vue'
    import Annotations from '~/components/Annotations.vue'
    import AnnotationItem from '~/components/Annotations/Item.vue'

    export default {
        components: {
            Page,
            Section,
            Select,
            SelectOption,
            Annotations,
            AnnotationItem,
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
        <Section title="Type d'isolation">
            <Select
                label="Isolation des fenêtres"
                :disabled="$store.state.form.filled"
                @change="$store.commit('form/windowsInsulation', {
                    id: $event.value,
                    label: $event.label
                })"
            >
                <SelectOption
                    v-for="item in $store.state.form.windowsInsulationList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="
                        item.id === $store.state.form.windowsInsulation.id
                    "
                />
            </Select>
            <Select
                label="Isolation des murs extérieurs"
                :disabled="$store.state.form.filled"
                @change="$store.commit('form/exteriorWallsInsulation', {
                    id: $event.value,
                    label: $event.label
                })"
            >
                <SelectOption
                    v-for="item in $store.state.form.wallsInsulationList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="
                        item.id === $store.state.form.exteriorWallsInsulation.id
                    "
                />
            </Select>
            <Select
                label="Isolation des combles"
                :disabled="$store.state.form.filled"
                @change="$store.commit('form/atticInsulation', {
                    id: $event.value,
                    label: $event.label
                })"
            >
                <SelectOption
                    v-for="item in $store.state.form.atticInsulationList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="item.id === $store.state.form.atticInsulation.id"
                />
            </Select>
            <Annotations>
                <AnnotationItem :id="1">
                    Murs creux isolés de 5 cm ou murs pleins isolés de 10 cm
                </AnnotationItem>
                <AnnotationItem :id="2">
                    Murs creux non isolés ou murs pleins peu isolés
                </AnnotationItem>
                <AnnotationItem :id="3">
                    Murs pleins non isolés ou murs pleins doublés bois
                </AnnotationItem>
                <AnnotationItem :id="4">
                    Combles aménagés avec laine de roche sous toiture
                </AnnotationItem>
                <AnnotationItem :id="5">
                    Combles non aménagés avec laine de roche sous toiture
                </AnnotationItem>
                <AnnotationItem :id="6">
                    Combles sans isolation
                </AnnotationItem>
            </Annotations>
        </Section>
    </Page>
</template>
