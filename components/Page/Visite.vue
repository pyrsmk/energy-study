<script>
    /* global eventHub, uniqid */
    import Page from '~/components/Page.vue'
    import Section from '~/components/Section.vue'
    import Input from '~/components/Form/Input.vue'
    import Select from '~/components/Form/Select.vue'
    import SelectOption from '~/components/Form/Select/Option.vue'
    import SwitchToggle from '~/components/Form/SwitchToggle.vue'
    import Result from '~/components/Form/Result.vue'

    export default {
        components: {
            Page,
            Section,
            Input,
            Select,
            SelectOption,
            SwitchToggle,
            Result,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                rooms: this.$store.state.form.rooms || [],
                rooms_cache: [],
            }
        },
        computed: {
            livingRoomsNumber: {
                get() {
                    return this.$store.state.form.livingRoomsNumber
                },
                set(value) {
                    this.$store.commit('form/livingRoomsNumber', value)
                }
            },
        },
        watch: {
            livingRoomsNumber(value) {
                // Cache the old room list
                if (this.rooms.length >= this.rooms_cache.length) {
                    this.rooms_cache = []
                    for (const room of this.rooms) {
                        this.rooms_cache.push(room)
                    }
                }
                // Update the rooms
                this.rooms = []
                for (let i = 0, j = value; i < j; i += 1) {
                    if (this.rooms_cache[i] !== undefined) {
                        this.$set(this.rooms, i, this.rooms_cache[i])
                    } else {
                        this.$set(this.rooms, i, {
                            id: uniqid(),
                            name: '',
                            surface: '',
                        })
                    }
                }
                // Refresh the carousel
                eventHub.$emit('refresh-carousel')
            },
            rooms: {
                handler(rooms) {
                    this.$store.commit(
                        'form/rooms',
                        // Clone the objects to remove Observer interfaces on
                        // them, otherwise it triggers a mutation error in VueX
                        rooms.map(room => ({
                            name: room.name,
                            surface: room.surface,
                        }))
                    )
                },
                deep: true,
            },
        },
    }
</script>

<template>
    <Page
        :id="id"
        previous-button
        next-button
    >
        <Section title="Fondations">
            <Select
                label="La maison est-elle construite sur :"
                :disabled="$store.state.form.filled"
                @change="$store.commit('form/foundations', {
                    id: $event.value,
                    label: $event.label
                })"
            >
                <SelectOption
                    v-for="item in $store.state.form.foundationList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="item.id === $store.state.form.foundations.id"
                />
            </Select>
            <SwitchToggle
                label="Si oui, peut-on y accéder ?"
                :disabled="
                    $store.state.form.filled
                        || $store.state.form.foundations.label === 'Rien'
                "
                :value="$store.state.form.foundationsAccess"
                @change="$store.commit('form/foundationsAccess', $event)"
            />
        </Section>
        <Section title="Superficie des pièces">
            <Input
                label="Nombre de pièces de vie"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="livingRoomsNumber"
                @change="livingRoomsNumber = $event"
            />
            <div v-if="livingRoomsNumber">
                <Section
                    v-for="(room, index) in rooms"
                    :key="room.id"
                    :title="`Pièce ${index + 1}`"
                >
                    <Input
                        label="Nom de la pièce"
                        required
                        :validate="!$store.state.form.filled"
                        :disabled="$store.state.form.filled"
                        :value="room.name"
                        @change="$set(rooms[index], 'name', $event)"
                    />
                    <Input
                        label="Surface de la pièce"
                        type="number"
                        :step="0.01"
                        required
                        :validate="!$store.state.form.filled"
                        :disabled="$store.state.form.filled"
                        :value="room.surface"
                        @change="$set(rooms[index], 'surface', $event)"
                    />
                </Section>
            </div>
            <Result
                label="Superficie totale : %d m²"
                :value="$store.getters['form/totalSurface']"
            />
            <Input
                ref="hauteur"
                label="Hauteur sous plafond (mètres)"
                type="number"
                :step="0.01"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.ceilingHeight"
                @change="$store.commit('form/ceilingHeight', $event)"
            />
            <Result
                label="Cubage : %d m³"
                :value="$store.getters['form/cubing']"
            />
        </Section>
    </Page>
</template>
