const labor = {
    namespaced: true,
    state: {
        provinces: [],
        regencies: [],
        districts: [],
        ethnics: [],
    },
    mutations: {
        SET_PROVINCES: (state, provinces) => {
            Array.from(provinces).forEach((data, idx) => {
                state.provinces[idx].text = data.name
                state.provinces[idx].id = data.id
            })
            // state.provinces = provinces
        },
        SET_REGENCIES: (state, regencies) => {
            Array.from(regencies).forEach((data, idx) => {
                state.regencies[idx].text = data.name
                state.regencies[idx].id = data.id
            })
            // state.regencies = regencies
        },
        SET_ETHNICS: (state, ethnics) => {
            Array.from(ethnics).forEach((data, idx) => {
                state.ethnics[idx].text = data.name
                state.ethnics[idx].id = data.id
            })
        },
        SET_DISTRICTS: (state, districts) => {
            Array.from(districts).forEach((data, idx) => {
                state.districts[idx].text = data.name
                state.districts[idx].id = data.id
            })
        },
    },
    getters: {
        provinces: state => state.provinces,
        regencies: state => state.regencies,
        districts: state => state.districts,
        ethnics: state => state.ethnics,
    }
}

export default labor;