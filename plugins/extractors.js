/* eslint object-curly-newline: ['off'] */
/* eslint function-paren-newline: ['off'] */
let $api

/**
 * Extract value from Squidex entity
 * @param {Object} data
 * @param {String} key
 * @param {Function} transform
 */
function extract(data, key, transform) {
    transform = transform || (async value => value)
    return new Promise(resolve => {
        if (key in data) {
            const { iv } = data[key]
            if (!Array.isArray(iv) || iv.length > 0) {
                resolve(transform(iv))
            }
        }
        resolve(null)
    })
}

// Define extractors
const extractors = {
    atticInsulation: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
        note: data.note.iv,
    }),
    electricityHeaterType: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
    }),
    energyUsed: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
    }),
    energyStudy: async ({ id, created, lastModified, data }) => {
        const [
            vrp,
            prospect,
            housingType,
            windowsInsulation,
            exteriorWallsInsulation,
            atticInsulation,
            foundations,
            winterHouseHeatingTime,
            energyUsed,
            electricityHeaterType,
        ] = await Promise.all([
            extract(data, 'vrp', async item => (
                extractors.vrp(
                    await $api.get(`/vrp/${item[0]}`)
                )
            )),
            extract(data, 'prospect', async item => (
                extractors.prospect(
                    await $api.get(`/prospect/${item[0]}`)
                )
            )),
            extract(data, 'housingType', async item => (
                extractors.habitationType(
                    await $api.get(`/habitation-type/${item[0]}`)
                )
            )),
            extract(data, 'windowsInsulation', async item => (
                extractors.windowsInsulation(
                    await $api.get(`/windows-insulation/${item[0]}`)
                )
            )),
            extract(data, 'exteriorWallsInsulation', async item => (
                extractors.wallsInsulation(
                    await $api.get(`/walls-insulation/${item[0]}`)
                )
            )),
            extract(data, 'atticInsulation', async item => (
                extractors.atticInsulation(
                    await $api.get(`/attic-insulation/${item[0]}`)
                )
            )),
            extract(data, 'foundations', async item => (
                extractors.foundations(
                    await $api.get(`/foundations/${item[0]}`)
                )
            )),
            extract(data, 'winterHouseHeatingTime', async item => (
                extractors.winterDelayTime(
                    await $api.get(`/winter-delay-time/${item[0]}`)
                )
            )),
            extract(data, 'energyUsed', async item => (
                extractors.energyUsed(
                    await $api.get(`/energy-used/${item[0]}`)
                )
            )),
            extract(data, 'electricityHeaterType', async item => (
                extractors.electricityHeaterType(
                    await $api.get(`/electricity-heater-type/${item[0]}`)
                )
            )),
        ])
        return {
            id,
            created,
            lastModified,
            vrp,
            prospect,
            filled: data.filled.iv,
            jobConjoint1: await extract(data, 'jobConjoint1'),
            jobConjoint2: await extract(data, 'jobConjoint2'),
            ageConjoint1: await extract(data, 'ageConjoint1'),
            ageConjoint2: await extract(data, 'ageConjoint2'),
            householdComposition: await extract(data, 'householdComposition'),
            housingType,
            constructionYear: await extract(data, 'constructionYear'),
            moveInDate: await extract(data, 'moveInDate'),
            livingArea: await extract(data, 'livingArea'),
            windowsInsulation,
            exteriorWallsInsulation,
            atticInsulation,
            foundations,
            foundationsAccess: await extract(data, 'foundationsAccess'),
            livingRoomsNumber: await extract(data, 'livingRoomsNumber'),
            rooms: await extract(data, 'rooms'),
            totalSurface: await extract(data, 'totalSurface'),
            ceilingHeight: await extract(data, 'ceilingHeight'),
            cubing: await extract(data, 'cubing'),
            haveVmc: await extract(data, 'haveVmc'),
            energySavings: await extract(data, 'energySavings'),
            energySavingsWhich: await extract(data, 'energySavingsWhich'),
            specialEnergySubscription: await extract(
                data,
                'specialEnergySubscription'
            ),
            specialEnergySubscriptionWhich: await extract(
                data,
                'specialEnergySubscriptionWhich'
            ),
            winterLivingRoomsTemp: await extract(data, 'winterLivingRoomsTemp'),
            winterNightRoomsTemp: await extract(data, 'winterNightRoomsTemp'),
            winterHouseHeatingTime,
            winterRoomsSameTemp: await extract(data, 'winterRoomsSameTemp'),
            auxiliaryHeating: await extract(data, 'auxiliaryHeating'),
            auxiliaryHeatingWhich: await extract(data, 'auxiliaryHeatingWhich'),
            auxiliaryHeatingDetails: await extract(
                data,
                'auxiliaryHeatingDetails'
            ),
            currentHeatingReasons: await extract(data, 'currentHeatingReasons'),
            currentHeatingNote: await extract(data, 'currentHeatingNote'),
            allergyAsthma: await extract(data, 'allergyAsthma'),
            allergyAnimal: await extract(data, 'allergyAnimal'),
            allergyPollen: await extract(data, 'allergyPollen'),
            allergyDust: await extract(data, 'allergyDust'),
            allergyOther: await extract(data, 'allergyOther'),
            allergyOtherWhich: await extract(data, 'allergyOtherWhich'),
            extremeTempsWho: await extract(data, 'extremeTempsWho'),
            extremeTempsHow: await extract(data, 'extremeTempsHow'),
            offSeasonHow: await extract(data, 'offSeasonHow'),
            houseHumidity: await extract(data, 'houseHumidity'),
            houseHumidityDeteriorations: await extract(
                data,
                'houseHumidityDeteriorations'
            ),
            houseHumidityDeteriorationsWhich: await extract(
                data,
                'houseHumidityDeteriorationsWhich'
            ),
            heatingMonths: await extract(data, 'heatingMonths'),
            energyUsed,
            energyUsedOther: await extract(data, 'energyUsedOther'),
            secondaryEnergyUsed: await extract(data, 'secondaryEnergyUsed'),
            energyUsedHotWater: await extract(data, 'energyUsedHotWater'),
            annualAmount: await extract(data, 'annualAmount'),
            cityGasCost: await extract(data, 'cityGasCost'),
            cityGasBoiler: await extract(data, 'cityGasBoiler'),
            cityGasMaintenance: await extract(data, 'cityGasMaintenance'),
            cityGasWood: await extract(data, 'cityGasWood'),
            cityGasSweeping: await extract(data, 'cityGasSweeping'),
            propaneGasCost: await extract(data, 'propaneGasCost'),
            propaneGasBoiler: await extract(data, 'propaneGasBoiler'),
            propaneGasMaintenance: await extract(data, 'propaneGasMaintenance'),
            propaneGasWood: await extract(data, 'propaneGasWood'),
            propaneGasSweeping: await extract(data, 'propaneGasSweeping'),
            propaneGasTankRental: await extract(data, 'propaneGasTankRental'),
            fuelConsumption: await extract(data, 'fuelConsumption'),
            fuelPrice: await extract(data, 'fuelPrice'),
            fuelCost: await extract(data, 'fuelCost'),
            fuelBoiler: await extract(data, 'fuelBoiler'),
            fuelMaintenance: await extract(data, 'fuelMaintenance'),
            fuelWood: await extract(data, 'fuelWood'),
            fuelSweeping: await extract(data, 'fuelSweeping'),
            fuelTankRental: await extract(data, 'fuelTankRental'),
            electricityHeaterType,
            electricityCost: await extract(data, 'electricityCost'),
            electricityPower: await extract(data, 'electricityPower'),
            electricitySubscription: await extract(
                data,
                'electricitySubscription'
            ),
            heatingTotalCost: await extract(data, 'heatingTotalCost'),
            idealHeater1: await extract(data, 'idealHeater1'),
            idealHeater2: await extract(data, 'idealHeater2'),
            idealHeater3: await extract(data, 'idealHeater3'),
            idealHeater4: await extract(data, 'idealHeater4'),
            idealHeater5: await extract(data, 'idealHeater5'),
            heaterToAvoid1: await extract(data, 'heaterToAvoid1'),
            heaterToAvoid2: await extract(data, 'heaterToAvoid2'),
            heaterToAvoid3: await extract(data, 'heaterToAvoid3'),
            heaterToAvoid4: await extract(data, 'heaterToAvoid4'),
            heaterToAvoid5: await extract(data, 'heaterToAvoid5'),
        }
    },
    foundations: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
    }),
    gender: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
    }),
    habitationType: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
    }),
    prospect: async ({ id, created, lastModified, data }) => {
        const [
            vrp,
            status,
            gender,
        ] = await Promise.all([
            extract(data, 'vrp', async item => (
                extractors.vrp(
                    await $api.get(`/vrp/${item[0]}`)
                )
            )),
            extract(data, 'status', async item => (
                extractors.prospectStatus(
                    await $api.get(`/prospect-status/${item[0]}`)
                )
            )),
            extract(data, 'gender', async item => (
                extractors.gender(
                    await $api.get(`/gender/${item[0]}`)
                )
            )),
        ])
        return {
            id,
            created,
            lastModified,
            vrp,
            status,
            firstname: await extract(data, 'firstname'),
            lastname: await extract(data, 'lastname'),
            gender,
            phone: await extract(data, 'phone'),
            email: await extract(data, 'email'),
            address: await extract(data, 'address'),
            postalCode: await extract(data, 'postalCode'),
            city: await extract(data, 'city'),
        }
    },
    prospectStatus: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
        state: data.state.iv,
    }),
    vrp: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        email: data.email.iv,
        firstname: data.firstname.iv,
        lastname: data.lastname.iv,
        phone: data.phone.iv,
    }),
    wallsInsulation: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
        note: data.note.iv,
    }),
    windowsInsulation: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
        note: data.note.iv,
    }),
    winterDelayTime: async ({ id, created, lastModified, data }) => ({
        id,
        created,
        lastModified,
        label: data.label.iv,
    }),
}

// Export module
export default ({ app }, inject) => {
    inject('extractors', extractors)
    app.store.$extractors = extractors;
    ({ $api } = app)
}
