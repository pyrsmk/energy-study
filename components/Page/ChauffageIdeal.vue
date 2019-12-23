<script>
    import Page from '~/components/Page.vue'
    import Section from '~/components/Section.vue'
    import Label from '~/components/Form/Label.vue'
    import Input from '~/components/Form/Input.vue'
    import InvalidInputsModal from '~/components/Modal/InvalidInputsModal.vue'
    import SignatureModal from '~/components/Modal/SignatureModal.vue'
    import ValidationModal from '~/components/Modal/ValidationModal.vue'
    import SubmittingDataModal from '~/components/Modal/SubmittingDataModal.vue'
    import SubmitErrorModal from '~/components/Modal/SubmitErrorModal.vue'
    import SubmitSuccessModal from '~/components/Modal/SubmitSuccessModal.vue'

    export default {
        components: {
            Page,
            Section,
            Label,
            Input,
            InvalidInputsModal,
            SignatureModal,
            ValidationModal,
            SubmittingDataModal,
            SubmitErrorModal,
            SubmitSuccessModal,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        methods: {
            verifyInputs() {
                const messages = []
                document.querySelectorAll('.Page').forEach(page => {
                    page.querySelectorAll('.Section').forEach(section => {
                        /* eslint-disable-next-line max-len */
                        section.querySelectorAll('input, select').forEach(node => {
                            if (node.required && !node.value) {
                                messages.push(
                                    this.formatRequiredInputMessage(
                                        page,
                                        section,
                                        node
                                    )
                                )
                            }
                        })
                    })
                })
                if (messages.length > 0) {
                    this.$refs.invalidInputsModal.openWith(messages)
                } else {
                    this.$refs.signatureModal.open()
                }
            },
            async submitData() {
                this.$refs.submittingDataModal.open()
                try {
                    await this.$store.dispatch('form/submit', {
                        vrpId: this.$route.query.vrpId
                    })
                    this.$refs.submittingDataModal.close()
                    this.$refs.submitSuccessModal.open()
                } catch (error) {
                    this.$refs.submittingDataModal.close()
                    this.$refs.submitErrorModal.openWith(error.message)
                }
            },
            formatRequiredInputMessage(page, section, node) {
                const pageTitle = document
                    .querySelector(`a[href='#${page.getAttribute('id')}']`)
                    .textContent
                    .trim()
                const sectionTitle = section
                    .querySelector('.card-title')
                    .textContent
                    .trim()
                const nodeLabel = node
                    .parentNode
                    .querySelector('label')
                    .textContent
                return `${pageTitle} > ${sectionTitle} > ${nodeLabel}`
            },
            returnToProspectPage(prospectId) {
                window.location.href
                    = `${process.env.APPLI_VRP_URL}/prospect/${prospectId}`
            }
        },
    }
</script>

<template>
    <Page
        :id="id"
        previous-button
        :submit-button="!$store.state.form.filled"
        @submit="verifyInputs()"
    >
        <Section title="Caractéristiques de votre chauffage idéal">
            <Label
                text="Si vous deviez inventer votre chauffage idéal, celui de
                      vos rêves où tout est possible, quelles seraient ses
                      principales caractéristiques ?"
            />
            <Input
                label="Caractéristique 1"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.idealHeater1"
                @change="$store.commit('form/idealHeater1', $event)"
            />
            <Input
                label="Caractéristique 2"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.idealHeater2"
                @change="$store.commit('form/idealHeater2', $event)"
            />
            <Input
                label="Caractéristique 3"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.idealHeater3"
                @change="$store.commit('form/idealHeater3', $event)"
            />
            <Input
                label="Caractéristique 4"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.idealHeater4"
                @change="$store.commit('form/idealHeater4', $event)"
            />
            <Input
                label="Caractéristique 5"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.idealHeater5"
                @change="$store.commit('form/idealHeater5', $event)"
            />
        </Section>
        <Section title="Caractéristiques d'un chauffage à proscrire">
            <Label
                text="Et quelles seraient les caractéristiques du chauffage que
                      vous ne voudriez surtout pas ?"
            />
            <Input
                label="Caractéristique 1"
                required
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.heaterToAvoid1"
                @change="$store.commit('form/heaterToAvoid1', $event)"
            />
            <Input
                label="Caractéristique 2"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.heaterToAvoid2"
                @change="$store.commit('form/heaterToAvoid2', $event)"
            />
            <Input
                label="Caractéristique 3"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.heaterToAvoid3"
                @change="$store.commit('form/heaterToAvoid3', $event)"
            />
            <Input
                label="Caractéristique 4"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.heaterToAvoid4"
                @change="$store.commit('form/heaterToAvoid4', $event)"
            />
            <Input
                label="Caractéristique 5"
                :validate="!$store.state.form.filled"
                :disabled="$store.state.form.filled"
                :value="$store.state.form.heaterToAvoid5"
                @change="$store.commit('form/heaterToAvoid5', $event)"
            />
        </Section>
        <InvalidInputsModal
            ref="invalidInputsModal"
            @continue="$refs.signatureModal.open()"
        />
        <SignatureModal
            ref="signatureModal"
            @ok="
                $store.commit('form/signature', $event)
                $refs.validationModal.open()
            "
        />
        <ValidationModal
            ref="validationModal"
            @ok="submitData()"
        />
        <SubmittingDataModal ref="submittingDataModal"/>
        <SubmitErrorModal ref="submitErrorModal"/>
        <SubmitSuccessModal
            ref="submitSuccessModal"
            @ok="returnToProspectPage($route.params.id)"
        />
    </Page>
</template>
