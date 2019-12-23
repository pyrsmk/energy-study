import fioul from '~/config/fioul.json'

const rounded = (value, precision) => (
    Number(
        Number.parseFloat(value).toFixed(precision)
    )
)

export const state = () => {
    /*
        The following properties are not defined because
        they're defined in getters:
            - totalSurface
            - cubing
            - cityGasCost
            - propaneGasCost
            - fuelCost
            - electricityCost
            - heatingTotalCost
    */
    return {
        // form selects
        habitationTypeList: [],
        windowsInsulationList: [],
        wallsInsulationList: [],
        atticInsulationList: [],
        foundationList: [],
        winterDelayTimeList: [],
        energyUsedList: [],
        electricityHeaterTypeList: [],
        // prospect entity
        prospect: null,
        phone: '',
        email: '',
        address: '',
        postalCode: '',
        city: '',
        // energy-study metadata
        filled: false,
        prospectId: null,
        // energy-study entity
        jobConjoint1: '',
        jobConjoint2: '',
        ageConjoint1: 0,
        ageConjoint2: 0,
        householdComposition: 0,
        housingType: { id: null, label: '' },
        constructionYear: 0,
        moveInDate: 0,
        livingArea: 0,
        windowsInsulation: { id: null, label: '' },
        exteriorWallsInsulation: { id: null, label: '' },
        atticInsulation: { id: null, label: '' },
        foundations: { id: null, label: '' },
        foundationsAccess: false,
        livingRoomsNumber: 0,
        rooms: [],
        ceilingHeight: 0,
        haveVmc: false,
        energySavings: false,
        energySavingsWhich: '',
        specialEnergySubscription: false,
        specialEnergySubscriptionWhich: '',
        winterLivingRoomsTemp: 0,
        winterNightRoomsTemp: 0,
        winterHouseHeatingTime: { id: null, label: '' },
        winterRoomsSameTemp: false,
        auxiliaryHeating: false,
        auxiliaryHeatingWhich: '',
        auxiliaryHeatingDetails: '',
        currentHeatingReasons: '',
        currentHeatingNote: 0,
        allergyAsthma: false,
        allergyAnimal: false,
        allergyPollen: false,
        allergyDust: false,
        allergyOther: false,
        allergyOtherWhich: '',
        extremeTempsWho: '',
        extremeTempsHow: '',
        offSeasonHow: '',
        houseHumidity: false,
        houseHumidityDeteriorations: false,
        houseHumidityDeteriorationsWhich: '',
        heatingMonths: 0,
        energyUsed: { id: null, label: '' },
        energyUsedOther: '',
        secondaryEnergyUsed: '',
        energyUsedHotWater: false,
        annualAmount: 0,
        cityGasBoiler: 42,
        cityGasMaintenance: 0,
        cityGasWood: 0,
        cityGasSweeping: 0,
        propaneGasBoiler: 42,
        propaneGasMaintenance: 0,
        propaneGasWood: 0,
        propaneGasSweeping: 0,
        propaneGasTankRental: 0,
        fuelConsumption: 0,
        fuelPrice: 0,
        fuelBoiler: 42,
        fuelMaintenance: 0,
        fuelWood: 0,
        fuelSweeping: 0,
        fuelTankRental: 0,
        electricityHeaterType: { id: null, label: '' },
        electricityPower: 0,
        electricitySubscription: 0,
        idealHeater1: '',
        idealHeater2: '',
        idealHeater3: '',
        idealHeater4: '',
        idealHeater5: '',
        heaterToAvoid1: '',
        heaterToAvoid2: '',
        heaterToAvoid3: '',
        heaterToAvoid4: '',
        heaterToAvoid5: '',
        signature: '',
    }
}

export const getters = {
    totalSurface: state => {
        return rounded(
            state.rooms.reduce((sum, room) => {
                return sum + room.surface
            }, 0),
            2
        )
    },
    cubing: (state, getters) => {
        return rounded(
            getters.totalSurface * state.ceilingHeight,
            2
        )
    },
    cityGasCost: state => {
        return rounded(
            state.annualAmount * (state.energyUsedHotWater ? 0.8 : 1),
            2
        )
    },
    propaneGasCost: state => {
        return rounded(
            state.annualAmount * (state.energyUsedHotWater ? 0.8 : 1),
            2
        )
    },
    fuelCost: state => {
        return rounded(
            state.annualAmount * (state.energyUsedHotWater ? 0.8 : 1),
            2
        )
    },
    electricityCost: state => {
        return rounded(state.annualAmount * 0.7, 2)
    },
    heatingTotalCost: (state, getters) => {
        switch (state.energyUsed.label) {
            case 'Gaz de ville':
                return getters.cityGasHeatingCost
            case 'Gaz propane/butane':
                return getters.propaneGasHeatingCost
            case 'Fioul':
                return getters.fuelHeatingCost
            case 'Electricité':
                return getters.electricityHeatingCost
            case 'Bois':
                return getters.woodHeatingCost
            case 'Autre':
            default:
                return getters.otherHeatingCost
        }
    },
    cityGasHeatingCost: (state, getters) => {
        return rounded(
            getters.cityGasCost
            + state.cityGasBoiler
            + state.cityGasMaintenance
            + state.cityGasWood
            + state.cityGasSweeping,
            2
        )
    },
    propaneGasHeatingCost: (state, getters) => {
        return rounded(
            getters.propaneGasCost
            + state.propaneGasBoiler
            + state.propaneGasMaintenance
            + state.propaneGasWood
            + state.propaneGasSweeping
            + state.propaneGasTankRental,
            2
        )
    },
    fuelHeatingCost: (state, getters) => {
        return rounded(
            getters.fuelCost
            + state.fuelBoiler
            + state.fuelMaintenance
            + state.fuelWood
            + state.fuelSweeping
            + state.fuelTankRental,
            2
        )
    },
    electricityHeatingCost: (state, getters) => {
        return rounded(
            getters.electricityCost
            + state.electricitySubscription,
            2
        )
    },
    woodHeatingCost: state => {
        return state.annualAmount
    },
    otherHeatingCost: state => {
        return state.annualAmount
    },
}

export const mutations = {
    filled(state, data) {
        state.filled = data
    },
    prospect(state, data) {
        state.prospect = data
    },
    habitationTypeList(state, data) {
        state.habitationTypeList = data
    },
    windowsInsulationList(state, data) {
        state.windowsInsulationList = data
    },
    wallsInsulationList(state, data) {
        state.wallsInsulationList = data
    },
    atticInsulationList(state, data) {
        state.atticInsulationList = data
    },
    foundationList(state, data) {
        state.foundationList = data
    },
    winterDelayTimeList(state, data) {
        state.winterDelayTimeList = data
    },
    energyUsedList(state, data) {
        state.energyUsedList = data
    },
    electricityHeaterTypeList(state, data) {
        state.electricityHeaterTypeList = data
    },
    phone(state, data) {
        state.phone = data
    },
    email(state, data) {
        state.email = data
    },
    address(state, data) {
        state.address = data
    },
    postalCode(state, data) {
        state.postalCode = data
    },
    city(state, data) {
        state.city = data
    },
    jobConjoint1(state, data) {
        state.jobConjoint1 = data
    },
    jobConjoint2(state, data) {
        state.jobConjoint2 = data
    },
    ageConjoint1(state, data) {
        state.ageConjoint1 = Number(data)
    },
    ageConjoint2(state, data) {
        state.ageConjoint2 = Number(data)
    },
    householdComposition(state, data) {
        state.householdComposition = Number(data)
    },
    housingType(state, data) {
        state.housingType = data
    },
    constructionYear(state, data) {
        state.constructionYear = Number(data)
    },
    moveInDate(state, data) {
        state.moveInDate = Number(data)
    },
    livingArea(state, data) {
        state.livingArea = Number(data)
    },
    windowsInsulation(state, data) {
        state.windowsInsulation = data
    },
    exteriorWallsInsulation(state, data) {
        state.exteriorWallsInsulation = data
    },
    atticInsulation(state, data) {
        state.atticInsulation = data
    },
    foundations(state, data) {
        state.foundations = data
    },
    foundationsAccess(state, data) {
        state.foundationsAccess = data
    },
    livingRoomsNumber(state, data) {
        state.livingRoomsNumber = Number(data)
    },
    rooms(state, data) {
        state.rooms = data
    },
    ceilingHeight(state, data) {
        state.ceilingHeight = Number(data)
    },
    haveVmc(state, data) {
        state.haveVmc = data
    },
    energySavings(state, data) {
        state.energySavings = data
    },
    energySavingsWhich(state, data) {
        state.energySavingsWhich = data
    },
    specialEnergySubscription(state, data) {
        state.specialEnergySubscription = data
    },
    specialEnergySubscriptionWhich(state, data) {
        state.specialEnergySubscriptionWhich = data
    },
    winterLivingRoomsTemp(state, data) {
        state.winterLivingRoomsTemp = data
    },
    winterNightRoomsTemp(state, data) {
        state.winterNightRoomsTemp = data
    },
    winterHouseHeatingTime(state, data) {
        state.winterHouseHeatingTime = data
    },
    winterRoomsSameTemp(state, data) {
        state.winterRoomsSameTemp = data
    },
    auxiliaryHeating(state, data) {
        state.auxiliaryHeating = data
    },
    auxiliaryHeatingWhich(state, data) {
        state.auxiliaryHeatingWhich = data
    },
    auxiliaryHeatingDetails(state, data) {
        state.auxiliaryHeatingDetails = data
    },
    currentHeatingReasons(state, data) {
        state.currentHeatingReasons = data
    },
    currentHeatingNote(state, data) {
        state.currentHeatingNote = data
    },
    allergyAsthma(state, data) {
        state.allergyAsthma = data
    },
    allergyAnimal(state, data) {
        state.allergyAnimal = data
    },
    allergyPollen(state, data) {
        state.allergyPollen = data
    },
    allergyDust(state, data) {
        state.allergyDust = data
    },
    allergyOther(state, data) {
        state.allergyOther = data
    },
    allergyOtherWhich(state, data) {
        state.allergyOtherWhich = data
    },
    extremeTempsWho(state, data) {
        state.extremeTempsWho = data
    },
    extremeTempsHow(state, data) {
        state.extremeTempsHow = data
    },
    offSeasonHow(state, data) {
        state.offSeasonHow = data
    },
    houseHumidity(state, data) {
        state.houseHumidity = data
    },
    houseHumidityDeteriorations(state, data) {
        state.houseHumidityDeteriorations = data
    },
    houseHumidityDeteriorationsWhich(state, data) {
        state.houseHumidityDeteriorationsWhich = data
    },
    heatingMonths(state, data) {
        state.heatingMonths = data
    },
    energyUsed(state, data) {
        state.energyUsed = data
    },
    energyUsedOther(state, data) {
        state.energyUsedOther = data
    },
    secondaryEnergyUsed(state, data) {
        state.secondaryEnergyUsed = data
    },
    energyUsedHotWater(state, data) {
        state.energyUsedHotWater = data
    },
    annualAmount(state, data) {
        state.annualAmount = rounded(data, 2)
    },
    cityGasBoiler(state, data) {
        state.cityGasBoiler = rounded(data, 2)
    },
    cityGasMaintenance(state, data) {
        state.cityGasMaintenance = rounded(data, 2)
    },
    cityGasWood(state, data) {
        state.cityGasWood = rounded(data, 2)
    },
    cityGasSweeping(state, data) {
        state.cityGasSweeping = rounded(data, 2)
    },
    propaneGasBoiler(state, data) {
        state.propaneGasBoiler = rounded(data, 2)
    },
    propaneGasMaintenance(state, data) {
        state.propaneGasMaintenance = rounded(data, 2)
    },
    propaneGasWood(state, data) {
        state.propaneGasWood = rounded(data, 2)
    },
    propaneGasSweeping(state, data) {
        state.propaneGasSweeping = rounded(data, 2)
    },
    propaneGasTankRental(state, data) {
        state.propaneGasTankRental = rounded(data, 2)
    },
    fuelConsumption(state, data) {
        state.fuelConsumption = data
    },
    fuelPrice(state, data) {
        state.fuelPrice = rounded(data, 3)
    },
    fuelBoiler(state, data) {
        state.fuelBoiler = rounded(data, 2)
    },
    fuelMaintenance(state, data) {
        state.fuelMaintenance = rounded(data, 2)
    },
    fuelWood(state, data) {
        state.fuelWood = rounded(data, 2)
    },
    fuelSweeping(state, data) {
        state.fuelSweeping = rounded(data, 2)
    },
    fuelTankRental(state, data) {
        state.fuelTankRental = rounded(data, 2)
    },
    electricityHeaterType(state, data) {
        state.electricityHeaterType = data
    },
    electricityPower(state, data) {
        state.electricityPower = data
    },
    electricitySubscription(state, data) {
        state.electricitySubscription = rounded(data, 2)
    },
    idealHeater1(state, data) {
        state.idealHeater1 = data
    },
    idealHeater2(state, data) {
        state.idealHeater2 = data
    },
    idealHeater3(state, data) {
        state.idealHeater3 = data
    },
    idealHeater4(state, data) {
        state.idealHeater4 = data
    },
    idealHeater5(state, data) {
        state.idealHeater5 = data
    },
    heaterToAvoid1(state, data) {
        state.heaterToAvoid1 = data
    },
    heaterToAvoid2(state, data) {
        state.heaterToAvoid2 = data
    },
    heaterToAvoid3(state, data) {
        state.heaterToAvoid3 = data
    },
    heaterToAvoid4(state, data) {
        state.heaterToAvoid4 = data
    },
    heaterToAvoid5(state, data) {
        state.heaterToAvoid5 = data
    },
    signature(state, data) {
        state.signature = data
    },
}

export const actions = {
    async init({ commit, state }, { prospectId }) {
        // Commit prospect ID
        if (prospectId === undefined) {
            throw new Error("'prospectId' parameter expected")
        }
        // Retrieve modules
        const { $api, $extractors } = this
        // Retrieve top-level data
        const [
            habitationTypeData,
            windowsInsulationData,
            wallsInsulationData,
            atticInsulationData,
            foundationData,
            winterDelayTimeData,
            energyUsedData,
            electricityHeaterTypeData,
            prospectData,
            energyStudyData,
        ] = await Promise.all([
            $api.get('/habitation-type', { $orderby: 'data/order/iv' }),
            $api.get('/windows-insulation', { $orderby: 'data/order/iv' }),
            $api.get('/walls-insulation', { $orderby: 'data/order/iv' }),
            $api.get('/attic-insulation', { $orderby: 'data/order/iv' }),
            $api.get('/foundations', { $orderby: 'data/order/iv' }),
            $api.get('/winter-delay-time', { $orderby: 'data/order/iv' }),
            $api.get('/energy-used', { $orderby: 'data/order/iv' }),
            $api.get('/electricity-heater-type', { $orderby: 'data/order/iv' }),
            $api.get(`/prospect/${prospectId}`),
            $api.get(
                '/energy-study',
                { $filter: `data/prospect/iv eq '${prospectId}'` }
            )
        ])
        // Extract data
        const [
            habitationTypeList,
            windowsInsulationList,
            wallsInsulationList,
            atticInsulationList,
            foundationList,
            winterDelayTimeList,
            energyUsedList,
            electricityHeaterTypeList,
            prospect,
            energyStudy,
        ] = await Promise.all([
            Promise.all(habitationTypeData.items.map(
                item => $extractors.habitationType(item)
            )),
            Promise.all(windowsInsulationData.items.map(
                item => $extractors.windowsInsulation(item)
            )),
            Promise.all(wallsInsulationData.items.map(
                item => $extractors.wallsInsulation(item)
            )),
            Promise.all(atticInsulationData.items.map(
                item => $extractors.atticInsulation(item)
            )),
            Promise.all(foundationData.items.map(
                item => $extractors.foundations(item)
            )),
            Promise.all(winterDelayTimeData.items.map(
                item => $extractors.winterDelayTime(item)
            )),
            Promise.all(energyUsedData.items.map(
                item => $extractors.energyUsed(item)
            )),
            Promise.all(electricityHeaterTypeData.items.map(
                item => $extractors.electricityHeaterType(item)
            )),
            $extractors.prospect(prospectData),
            energyStudyData.total === 0
                ? Promise.resolve()
                : $extractors.energyStudy(energyStudyData.items[0]),
        ])
        // Define commitIfNotNull helper
        const commitIfNotNull = (data, key, fallback) => {
            if (data[key] !== null) {
                commit(key, data[key])
            }
            if (fallback !== undefined) {
                commit(key, fallback())
            }
        }
        // Commit lists
        commit('habitationTypeList', habitationTypeList)
        commit('windowsInsulationList', windowsInsulationList)
        commit('wallsInsulationList', wallsInsulationList)
        commit('atticInsulationList', atticInsulationList)
        commit('foundationList', foundationList)
        commit('winterDelayTimeList', winterDelayTimeList)
        commit('energyUsedList', energyUsedList)
        commit('electricityHeaterTypeList', electricityHeaterTypeList)
        // Commit default values from lists
        const firstItem = key => {
            const { id, label } = state[key][0]
            return { id, label }
        }
        commit('housingType', firstItem('habitationTypeList'))
        commit('windowsInsulation', firstItem('windowsInsulationList'))
        commit('exteriorWallsInsulation', firstItem('wallsInsulationList'))
        commit('atticInsulation', firstItem('atticInsulationList'))
        commit('foundations', firstItem('foundationList'))
        commit('winterHouseHeatingTime', firstItem('winterDelayTimeList'))
        commit('energyUsed', firstItem('energyUsedList'))
        commit('electricityHeaterType', firstItem('electricityHeaterTypeList'))
        // Commit prospect data
        commit('prospect', prospect)
        commitIfNotNull(prospect, 'phone')
        commitIfNotNull(prospect, 'email')
        commitIfNotNull(prospect, 'address')
        commitIfNotNull(prospect, 'postalCode')
        commitIfNotNull(prospect, 'city')
        // The form is not filled yet, just import fuelPrice
        if (energyStudyData.total === 0) {
            commit('fuelPrice', await (await fetch(fioul.endpoint)).json())
            return
        }
        // Commit form with existing data
        /*
            The following properties are not committed because they're
            handled by getters:
                - totalSurface
                - cubing
                - cityGasCost
                - propaneGasCost
                - fuelCost
                - electricityCost
                - heatingTotalCost
        */
        commitIfNotNull(energyStudy, 'filled')
        commitIfNotNull(energyStudy, 'jobConjoint1')
        commitIfNotNull(energyStudy, 'jobConjoint2')
        commitIfNotNull(energyStudy, 'ageConjoint1')
        commitIfNotNull(energyStudy, 'ageConjoint2')
        commitIfNotNull(energyStudy, 'householdComposition')
        commitIfNotNull(energyStudy, 'housingType')
        commitIfNotNull(energyStudy, 'constructionYear')
        commitIfNotNull(energyStudy, 'moveInDate')
        commitIfNotNull(energyStudy, 'livingArea')
        commitIfNotNull(energyStudy, 'windowsInsulation')
        commitIfNotNull(energyStudy, 'exteriorWallsInsulation')
        commitIfNotNull(energyStudy, 'atticInsulation')
        commitIfNotNull(energyStudy, 'foundations')
        commitIfNotNull(energyStudy, 'foundationsAccess')
        commitIfNotNull(energyStudy, 'livingRoomsNumber')
        commitIfNotNull(energyStudy, 'rooms')
        commitIfNotNull(energyStudy, 'ceilingHeight')
        commitIfNotNull(energyStudy, 'haveVmc')
        commitIfNotNull(energyStudy, 'energySavings')
        commitIfNotNull(energyStudy, 'energySavingsWhich')
        commitIfNotNull(energyStudy, 'specialEnergySubscription')
        commitIfNotNull(energyStudy, 'specialEnergySubscriptionWhich')
        commitIfNotNull(energyStudy, 'winterLivingRoomsTemp')
        commitIfNotNull(energyStudy, 'winterNightRoomsTemp')
        commitIfNotNull(energyStudy, 'winterHouseHeatingTime')
        commitIfNotNull(energyStudy, 'winterRoomsSameTemp')
        commitIfNotNull(energyStudy, 'auxiliaryHeating')
        commitIfNotNull(energyStudy, 'auxiliaryHeatingWhich')
        commitIfNotNull(energyStudy, 'auxiliaryHeatingDetails')
        commitIfNotNull(energyStudy, 'currentHeatingReasons')
        commitIfNotNull(energyStudy, 'currentHeatingNote')
        commitIfNotNull(energyStudy, 'allergyAsthma')
        commitIfNotNull(energyStudy, 'allergyAnimal')
        commitIfNotNull(energyStudy, 'allergyPollen')
        commitIfNotNull(energyStudy, 'allergyDust')
        commitIfNotNull(energyStudy, 'allergyOther')
        commitIfNotNull(energyStudy, 'allergyOtherWhich')
        commitIfNotNull(energyStudy, 'extremeTempsWho')
        commitIfNotNull(energyStudy, 'extremeTempsHow')
        commitIfNotNull(energyStudy, 'offSeasonHow')
        commitIfNotNull(energyStudy, 'houseHumidity')
        commitIfNotNull(energyStudy, 'houseHumidityDeteriorations')
        commitIfNotNull(energyStudy, 'houseHumidityDeteriorationsWhich')
        commitIfNotNull(energyStudy, 'heatingMonths')
        commitIfNotNull(energyStudy, 'energyUsed')
        commitIfNotNull(energyStudy, 'energyUsedOther')
        commitIfNotNull(energyStudy, 'secondaryEnergyUsed')
        commitIfNotNull(energyStudy, 'energyUsedHotWater')
        commitIfNotNull(energyStudy, 'annualAmount')
        commitIfNotNull(energyStudy, 'cityGasBoiler')
        commitIfNotNull(energyStudy, 'cityGasMaintenance')
        commitIfNotNull(energyStudy, 'cityGasWood')
        commitIfNotNull(energyStudy, 'cityGasSweeping')
        commitIfNotNull(energyStudy, 'propaneGasBoiler')
        commitIfNotNull(energyStudy, 'propaneGasMaintenance')
        commitIfNotNull(energyStudy, 'propaneGasWood')
        commitIfNotNull(energyStudy, 'propaneGasSweeping')
        commitIfNotNull(energyStudy, 'propaneGasTankRental')
        commitIfNotNull(energyStudy, 'fuelConsumption')
        commitIfNotNull(energyStudy, 'fuelPrice')
        commitIfNotNull(energyStudy, 'fuelBoiler')
        commitIfNotNull(energyStudy, 'fuelMaintenance')
        commitIfNotNull(energyStudy, 'fuelWood')
        commitIfNotNull(energyStudy, 'fuelSweeping')
        commitIfNotNull(energyStudy, 'fuelTankRental')
        commitIfNotNull(energyStudy, 'electricityHeaterType')
        commitIfNotNull(energyStudy, 'electricityPower')
        commitIfNotNull(energyStudy, 'electricitySubscription')
        commitIfNotNull(energyStudy, 'idealHeater1')
        commitIfNotNull(energyStudy, 'idealHeater2')
        commitIfNotNull(energyStudy, 'idealHeater3')
        commitIfNotNull(energyStudy, 'idealHeater4')
        commitIfNotNull(energyStudy, 'idealHeater5')
        commitIfNotNull(energyStudy, 'heaterToAvoid1')
        commitIfNotNull(energyStudy, 'heaterToAvoid2')
        commitIfNotNull(energyStudy, 'heaterToAvoid3')
        commitIfNotNull(energyStudy, 'heaterToAvoid4')
        commitIfNotNull(energyStudy, 'heaterToAvoid5')
        commitIfNotNull(energyStudy, 'signature')
    },
    async submit({ state, getters, commit }, { vrpId }) {
        // Prepare
        const { $api } = this
        // Verify input
        if (vrpId === undefined) {
            throw new Error("'vrpId' parameter expected")
        }
        // Compose prospect data
        const prospectData = {
            vrp: { iv: [state.prospect.vrp.id] },
            manager: { iv: [state.prospect.vrp.id] },
            status: { iv: [state.prospect.status.id] },
            firstname: { iv: state.prospect.firstname },
            lastname: { iv: state.prospect.lastname },
            gender: { iv: [state.prospect.gender.id] },
            phone: { iv: state.phone },
            email: { iv: state.email },
            address: { iv: state.address },
            postalCode: { iv: state.postalCode },
            city: { iv: state.city },
        }
        // Compose energy study data
        const energyStudyData = {
            vrp: { iv: [vrpId] },
            prospect: { iv: [state.prospect.id] },
            filled: { iv: true },
            jobConjoint1: { iv: state.jobConjoint1 },
            jobConjoint2: { iv: state.jobConjoint2 },
            ageConjoint1: { iv: state.ageConjoint1 },
            ageConjoint2: { iv: state.ageConjoint2 },
            householdComposition: { iv: state.householdComposition },
            housingType: { iv: [state.housingType.id] },
            constructionYear: { iv: state.constructionYear },
            moveInDate: { iv: state.moveInDate },
            livingArea: { iv: state.livingArea },
            windowsInsulation: { iv: [state.windowsInsulation.id] },
            exteriorWallsInsulation: { iv: [state.exteriorWallsInsulation.id] },
            atticInsulation: { iv: [state.atticInsulation.id] },
            foundations: { iv: [state.foundations.id] },
            foundationsAccess: { iv: state.foundationsAccess },
            livingRoomsNumber: { iv: state.livingRoomsNumber },
            rooms: { iv: state.rooms },
            totalSurface: { iv: getters.totalSurface },
            ceilingHeight: { iv: state.ceilingHeight },
            cubing: { iv: getters.cubing },
            haveVmc: { iv: state.haveVmc },
            energySavings: { iv: state.energySavings },
            energySavingsWhich: { iv: state.energySavingsWhich },
            specialEnergySubscription: { iv: state.specialEnergySubscription },
            specialEnergySubscriptionWhich: {
                iv: state.specialEnergySubscriptionWhich
            },
            winterLivingRoomsTemp: { iv: state.winterLivingRoomsTemp },
            winterNightRoomsTemp: { iv: state.winterNightRoomsTemp },
            winterHouseHeatingTime: { iv: [state.winterHouseHeatingTime.id] },
            winterRoomsSameTemp: { iv: state.winterRoomsSameTemp },
            auxiliaryHeating: { iv: state.auxiliaryHeating },
            auxiliaryHeatingWhich: { iv: state.auxiliaryHeatingWhich },
            auxiliaryHeatingDetails: { iv: state.auxiliaryHeatingDetails },
            currentHeatingReasons: { iv: state.currentHeatingReasons },
            currentHeatingNote: { iv: state.currentHeatingNote },
            allergyAsthma: { iv: state.allergyAsthma },
            allergyAnimal: { iv: state.allergyAnimal },
            allergyPollen: { iv: state.allergyPollen },
            allergyDust: { iv: state.allergyDust },
            allergyOther: { iv: state.allergyOther },
            allergyOtherWhich: { iv: state.allergyOtherWhich },
            extremeTempsWho: { iv: state.extremeTempsWho },
            extremeTempsHow: { iv: state.extremeTempsHow },
            offSeasonHow: { iv: state.offSeasonHow },
            houseHumidity: { iv: state.houseHumidity },
            houseHumidityDeteriorations: {
                iv: state.houseHumidityDeteriorations
            },
            houseHumidityDeteriorationsWhich: {
                iv: state.houseHumidityDeteriorationsWhich
            },
            heatingMonths: { iv: state.heatingMonths },
            energyUsed: { iv: [state.energyUsed.id] },
            energyUsedOther: { iv: state.energyUsedOther },
            secondaryEnergyUsed: { iv: state.secondaryEnergyUsed },
            energyUsedHotWater: { iv: state.energyUsedHotWater },
            annualAmount: { iv: state.annualAmount },
            cityGasCost: { iv: getters.cityGasCost },
            cityGasBoiler: { iv: state.cityGasBoiler },
            cityGasMaintenance: { iv: state.cityGasMaintenance },
            cityGasWood: { iv: state.cityGasWood },
            cityGasSweeping: { iv: state.cityGasSweeping },
            propaneGasCost: { iv: getters.propaneGasCost },
            propaneGasBoiler: { iv: state.propaneGasBoiler },
            propaneGasMaintenance: { iv: state.propaneGasMaintenance },
            propaneGasWood: { iv: state.propaneGasWood },
            propaneGasSweeping: { iv: state.propaneGasSweeping },
            propaneGasTankRental: { iv: state.propaneGasTankRental },
            fuelConsumption: { iv: state.fuelConsumption },
            fuelPrice: { iv: state.fuelPrice },
            fuelCost: { iv: getters.fuelCost },
            fuelBoiler: { iv: state.fuelBoiler },
            fuelMaintenance: { iv: state.fuelMaintenance },
            fuelWood: { iv: state.fuelWood },
            fuelSweeping: { iv: state.fuelSweeping },
            fuelTankRental: { iv: state.fuelTankRental },
            electricityHeaterType: { iv: [state.electricityHeaterType.id] },
            electricityCost: { iv: getters.electricityCost },
            electricityPower: { iv: state.electricityPower },
            electricitySubscription: { iv: state.electricitySubscription },
            heatingTotalCost: { iv: getters.heatingTotalCost },
            idealHeater1: { iv: state.idealHeater1 },
            idealHeater2: { iv: state.idealHeater2 },
            idealHeater3: { iv: state.idealHeater3 },
            idealHeater4: { iv: state.idealHeater4 },
            idealHeater5: { iv: state.idealHeater5 },
            heaterToAvoid1: { iv: state.heaterToAvoid1 },
            heaterToAvoid2: { iv: state.heaterToAvoid2 },
            heaterToAvoid3: { iv: state.heaterToAvoid3 },
            heaterToAvoid4: { iv: state.heaterToAvoid4 },
            heaterToAvoid5: { iv: state.heaterToAvoid5 },
            signature: { iv: state.signature }
        }
        // Dump debug data
        if (process.env.NODE_ENV === 'development') {
            console.log(prospectData) // eslint-disable-line no-console
            console.log(energyStudyData) // eslint-disable-line no-console
        }
        // Send data
        await Promise.all([
            $api.put(`/prospect/${state.prospect.id}`, prospectData),
            $api.post('/energy-study?publish=true', energyStudyData),
        ])
        // The form is filled
        commit('filled', true)
    },
}
