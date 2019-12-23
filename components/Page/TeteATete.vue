<script>
    /* global eventHub */
    /* eslint max-len: ['off'] */
    import Page from '~/components/Page.vue'
    import Section from '~/components/Section.vue'
    import Label from '~/components/Form/Label.vue'
    import SwitchToggle from '~/components/Form/SwitchToggle.vue'
    import Input from '~/components/Form/Input.vue'
    import Select from '~/components/Form/Select.vue'
    import SelectOption from '~/components/Form/Select/Option.vue'
    import Checkbox from '~/components/Form/Checkbox.vue'
    import Result from '~/components/Form/Result.vue'
    import Annotations from '~/components/Annotations.vue'
    import AnnotationItem from '~/components/Annotations/Item.vue'

    export default {
        components: {
            Page,
            Section,
            Label,
            SwitchToggle,
            Input,
            Select,
            SelectOption,
            Checkbox,
            Result,
            Annotations,
            AnnotationItem,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        data() {
            return { eventHub }
        },
    }
</script>

<template>
    <Page
        :id="id"
        previous-button
        next-button
    >
        <Section title="VMC">
            <SwitchToggle
                label="Avez-vous une VMC afin d'éviter les risques d'humidité
                       et de prolifération bactériologique ?"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.haveVmc"
                @change="$store.commit('form/haveVmc', $event)"
            />
        </Section>
        <Section title="Economies d'énergie">
            <SwitchToggle
                label="Pratiquez-vous des économies d'énergie
                       quelqu'elles soient ?"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.energySavings"
                @change="$store.commit('form/energySavings', $event)"
            />
            <Input
                label="Si oui, lesquelles ?"
                :validate="!$store.state.form.filled"
                :disabled="
                    $store.state.form.filled
                        || !$store.state.form.energySavings
                "
                :required="$store.state.form.energySavings"
                :value="$store.state.form.energySavingsWhich"
                @change="$store.commit('form/energySavingsWhich', $event)"
            />
        </Section>
        <Section title="Abonnement particulier">
            <SwitchToggle
                label="Avez-vous un abonnement particulier ?
                       (tempo, EJP, heures creuses / heures pleines)"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.specialEnergySubscription"
                @change="
                    $store.commit('form/specialEnergySubscription', $event)
                "
            />
            <Input
                label="Si oui, lequel ?"
                :validate="!$store.state.form.filled"
                :disabled="
                    $store.state.form.filled
                        || !$store.state.form.specialEnergySubscription
                "
                :required="$store.state.form.specialEnergySubscription"
                :value="$store.state.form.specialEnergySubscriptionWhich"
                @change="
                    $store.commit('form/specialEnergySubscriptionWhich', $event)
                "
            />
        </Section>
        <Section title="Durant la saison hivernale">
            <Label
                text="En plein hiver, si la température extérieure est de
                     -5°, et que vous placez un thermomètre dans votre
                     maison, quelle température ambiante avez-vous ?"
            />
            <Input
                label="Dans les pièces de vie"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.winterLivingRoomsTemp"
                @change="$store.commit('form/winterLivingRoomsTemp', $event)"
            />
            <Input
                label="Dans les pièces de nuit"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.winterNightRoomsTemp"
                @change="$store.commit('form/winterNightRoomsTemp', $event)"
            />
            <Label
                text="Lorsque vous partez en hiver et que vous programmez votre
                      chauffage en mode hors gel (10-12°), à votre retour,
                      combien de temps faut-il pour réchauffer votre maison
                      pour atteindre une température de confort (20-21°) ?"
            />
            <Select
                label="Délai"
                :disabled="$store.state.form.filled"
                @change="$store.commit('form/winterHouseHeatingTime', {
                    id: $event.value,
                    label: $event.label
                })"
            >
                <SelectOption
                    v-for="item in $store.state.form.winterDelayTimeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="
                        item.id === $store.state.form.winterHouseHeatingTime.id
                    "
                />
            </Select>
            <SwitchToggle
                label="En hiver, si la température extérieure est de -5° et que
                       l'on place 6 thermomètres dans la maison (entrée,
                       cuisine, salon, chambre, escalier, salle de bains),
                       pensez-vous obtenir la même température sur chacun des
                       thermomètres ?"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.winterRoomsSameTemp"
                @change="$store.commit('form/winterRoomsSameTemp', $event)"
            />
        </Section>
        <Section title="Chauffage d'appoint">
            <SwitchToggle
                label="Utilisez-vous un chauffage d'appoint ?"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.auxiliaryHeating"
                @change="$store.commit('form/auxiliaryHeating', $event)"
            />
            <Input
                label="Si oui, lequel ?"
                :validate="!$store.state.form.filled"
                :disabled="
                    $store.state.form.filled
                        || !$store.state.form.auxiliaryHeating
                "
                :required="$store.state.form.auxiliaryHeating"
                :value="$store.state.form.auxiliaryHeatingWhich"
                @change="$store.commit('form/auxiliaryHeatingWhich', $event)"
            />
            <Input
                label="Motif et fréquence d'utilisation"
                :validate="!$store.state.form.filled"
                :disabled="
                    $store.state.form.filled
                        || !$store.state.form.auxiliaryHeating
                "
                :required="$store.state.form.auxiliaryHeating"
                :value="$store.state.form.auxiliaryHeatingDetails"
                @change="$store.commit('form/auxiliaryHeatingDetails', $event)"
            />
        </Section>
        <Section title="Votre chauffage actuel">
            <Input
                label="Quels sont les critères et les motifs qui vous ont fait
                       opter pour votre type de chauffage, plutôt qu'un autre ?"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.currentHeatingReasons"
                @change="$store.commit('form/currentHeatingReasons', $event)"
            />
            <Label
                text="Si aujourd'hui, vous deviez attribuer une note sur 20
                      à votre chauffage actuel, en prenant en considération son
                      ancienneté, ses avantages et ses contraintes, à combien
                      l'évalueriez-vous ?"
            />
            <Input
                label="Note /20"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.currentHeatingNote"
                @change="$store.commit('form/currentHeatingNote', $event)"
            />
        </Section>
        <Section title="Votre foyer">
            <Label text="Y a-t-il des problèmes d'allergie dans votre foyer ?"/>
            <Checkbox
                label="Asthme"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.allergyAsthma"
                @change="$store.commit('form/allergyAsthma', $event)"
            />
            <Checkbox
                label="Poils d'animaux"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.allergyAnimal"
                @change="$store.commit('form/allergyAnimal', $event)"
            />
            <Checkbox
                label="Pollen"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.allergyPollen"
                @change="$store.commit('form/allergyPollen', $event)"
            />
            <Checkbox
                label="Poussière"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.allergyDust"
                @change="$store.commit('form/allergyDust', $event)"
            />
            <Checkbox
                label="Autre"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.allergyOther"
                @change="
                    $store.commit('form/allergyOther', $event);
                    eventHub.$emit('refresh-carousel')
                "
            />
            <Input
                v-if="$store.state.form.allergyOther"
                label="Autres allergies"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :required="$store.state.form.allergyOther"
                :value="$store.state.form.allergyOtherWhich"
                @change="$store.commit('form/allergyOtherWhich', $event)"
            />
            <Input
                label="Qui supporte le mieux les températures extrêmes ?"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.extremeTempsWho"
                @change="$store.commit('form/extremeTempsWho', $event)"
            />
            <Input
                label="Comment gérez-vous cela ?"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.extremeTempsHow"
                @change="$store.commit('form/extremeTempsHow', $event)"
            />
            <Input
                label="Comment gérez-vous l'intersaison ?"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.offSeasonHow"
                @change="$store.commit('form/offSeasonHow', $event)"
            />
            <SwitchToggle
                label="A l'intersaison, ou lorsqu'il pleut, ressentez-vous de
                       l'humidité dans la maison ?"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.houseHumidity"
                @change="$store.commit('form/houseHumidity', $event)"
            />
            <SwitchToggle
                label="Si oui, cela a-t-il provoqué des déteriorations ?"
                :disabled="
                    $store.state.form.filled
                        || !$store.state.form.houseHumidity
                "
                :value="$store.state.form.houseHumidityDeteriorations"
                @change="$store.commit(
                    'form/houseHumidityDeteriorations',
                    $event
                )"
            />
            <Input
                label="Si oui, lesquelles ?"
                :validate="!$store.state.form.filled"
                :disabled="
                    $store.state.form.filled
                        || !$store.state.form.houseHumidityDeteriorations
                "
                :required="$store.state.form.houseHumidityDeteriorations"
                :value="$store.state.form.houseHumidityDeteriorationsWhich"
                @change="$store.commit(
                    'form/houseHumidityDeteriorationsWhich',
                    $event
                )"
            />
        </Section>
        <Section title="Coût énergétique">
            <Input
                label="Combien de mois par an chauffez-vous votre intérieur ?"
                type="number"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.heatingMonths"
                @change="$store.commit('form/heatingMonths', $event)"
            />
            <Select
                label="Energie principale utilisée"
                :disabled="$store.state.form.filled"
                @change="
                    $store.commit('form/energyUsed', {
                        id: $event.value,
                        label: $event.label
                    });
                    eventHub.$emit('refresh-carousel')
                "
            >
                <SelectOption
                    v-for="item in $store.state.form.energyUsedList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.label"
                    :selected="item.id === $store.state.form.energyUsed.id"
                />
            </Select>
            <Input
                v-if="$store.state.form.energyUsed.label === 'Autre'"
                label="Energie principale utilisée (autre)"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :required="$store.state.form.energyUsed.label === 'Autre'"
                :value="$store.state.form.energyUsedOther"
                @change="$store.commit('form/energyUsedOther', $event)"
            />
            <Input
                label="Energie secondaire utilisée"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.secondaryEnergyUsed"
                @change="$store.commit('form/secondaryEnergyUsed', $event)"
            />
            <SwitchToggle
                label="Est-ce que cette énergie contribue à produire
                       votre eau chaude ?"
                :disabled="
                    $store.state.form.filled || (
                        $store.state.form.energyUsed.label !== 'Gaz de ville'
                        && $store.state.form.energyUsed.label !== 'Gaz propane/butane'
                        && $store.state.form.energyUsed.label !== 'Fioul'
                    )
                "
                :value="$store.state.form.energyUsedHotWater"
                @change="$store.commit('form/energyUsedHotWater', $event)"
            />
            <Input
                label="Montant annuel (en euros)"
                type="number"
                :step="0.01"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.annualAmount"
                @change="$store.commit('form/annualAmount', $event)"
            />
            <div v-if="$store.state.form.energyUsed.label === 'Gaz de ville'">
                <Input
                    label="Coût (80% si production d'eau chaude)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.getters['form/cityGasCost']"
                />
                <Input
                    label="Electricité de la chaudière (1)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.state.form.cityGasBoiler"
                    :validate="false"
                />
                <Input
                    label="Contrat de maintenance"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.cityGasMaintenance"
                    @change="$store.commit('form/cityGasMaintenance', $event)"
                />
                <Input
                    label="Achat du bois (si cheminée)"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.cityGasWood"
                    @change="$store.commit('form/cityGasWood', $event)"
                />
                <Input
                    label="Ramonage de la cheminée"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.cityGasSweeping"
                    @change="$store.commit('form/cityGasSweeping', $event)"
                />
            </div>
            <div v-if="$store.state.form.energyUsed.label === 'Gaz propane/butane'">
                <Input
                    label="Coût (80% si production d'eau chaude)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.getters['form/propaneGasCost']"
                    :validate="false"
                />
                <Input
                    label="Electricité de la chaudière (1)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.state.form.propaneGasBoiler"
                    :validate="false"
                />
                <Input
                    label="Contrat de maintenance"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.propaneGasMaintenance"
                    @change="$store.commit(
                        'form/propaneGasMaintenance',
                        $event
                    )"
                />
                <Input
                    label="Achat du bois (si cheminée)"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.propaneGasWood"
                    @change="$store.commit('form/propaneGasWood', $event)"
                />
                <Input
                    label="Ramonage de la cheminée"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.propaneGasSweeping"
                    @change="$store.commit('form/propaneGasSweeping', $event)"
                />
                <Input
                    label="Location de la cuve"
                    type="number"
                    :step="0.01"
                    required
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.propaneGasTankRental"
                    @change="$store.commit('form/propaneGasTankRental', $event)"
                />
            </div>
            <div v-if="$store.state.form.energyUsed.label === 'Fioul'">
                <Input
                    label="Consommation (en litres/an)"
                    type="number"
                    required
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.fuelConsumption"
                    @change="$store.commit('form/fuelConsumption', $event)"
                />
                <Input
                    label="Prix actuel du litre (€)"
                    type="number"
                    :step="0.001"
                    disabled
                    :value="$store.state.form.fuelPrice"
                    :validate="false"
                />
                <Input
                    label="Coût (80% si production d'eau chaude)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.getters['form/fuelCost']"
                    :validate="false"
                />
                <Input
                    label="Electricité de la chaudière (1)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.state.form.fuelBoiler"
                    :validate="false"
                />
                <Input
                    label="Contrat de maintenance"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.fuelMaintenance"
                    @change="$store.commit('form/fuelMaintenance', $event)"
                />
                <Input
                    label="Achat du bois (si cheminée)"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.fuelWood"
                    @change="$store.commit('form/fuelWood', $event)"
                />
                <Input
                    label="Ramonage de la cheminée"
                    type="number"
                    :step="0.01"
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.fuelSweeping"
                    @change="$store.commit('form/fuelSweeping', $event)"
                />
                <Input
                    label="Location de la cuve"
                    type="number"
                    :step="0.01"
                    required
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.fuelTankRental"
                    @change="$store.commit('form/fuelTankRental', $event)"
                />
            </div>
            <div v-if="$store.state.form.energyUsed.label === 'Electricité'">
                <Select
                    label="Type du radiateur"
                    :disabled="$store.state.form.filled"
                    @change="$store.commit('form/electricityHeaterType', {
                        id: $event.value,
                        label: $event.label
                    })"
                >
                    <SelectOption
                        v-for="item in $store.state.form.electricityHeaterTypeList"
                        :key="item.id"
                        :value="item.id"
                        :label="item.label"
                        :selected="item.id === $store.state.form.electricityHeaterType.id"
                    />
                </Select>
                <Input
                    label="Coût (70% du total énergétique)"
                    type="number"
                    :step="0.01"
                    disabled
                    :value="$store.getters['form/electricityCost']"
                    :validate="false"
                />
                <Input
                    label="Quelle est la puissance au compteur (en Kw)"
                    type="number"
                    required
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.electricityPower"
                    @change="$store.commit('form/electricityPower', $event)"
                />
                <Input
                    label="Prix de l'abonnement"
                    type="number"
                    :step="0.01"
                    required
                    :validate="!$store.state.form.filled"
                    :disabled="$store.state.form.filled"
                    :value="$store.state.form.electricitySubscription"
                    @change="$store.commit('form/electricitySubscription', $event)"
                />
            </div>
            <Result
                label="Coût total du chauffage : %d €"
                :value="$store.getters['form/heatingTotalCost']"
            />
            <Annotations>
                <AnnotationItem :id="1">
                    Consommation moyenne constatée pour une chaudière de 20Kw
                    avec un coût de 0,15€ par Kw/h
                </AnnotationItem>
            </Annotations>
        </Section>
    </Page>
</template>
