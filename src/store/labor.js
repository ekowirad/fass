const labor = {
    namespaced: true,
    state: {
        provinces: [],
        regencies: [],
        districts: [],
        ethnics: [],
        jobs: [],
        statuses: [],
        orderLabor: {},
        orderLaborReq: {},
        orderMitra: {},
        revenue: {},
        report: {}
    },
    mutations: {
        SET_PROVINCES: (state, provinces) => {
            state.provinces = provinces
            Array.from(provinces).forEach((data, idx) => {
                state.provinces[idx].text = data.name
                state.provinces[idx].id = data.id
            })
        },
        SET_REGENCIES: (state, regencies) => {
            state.regencies = regencies
            Array.from(regencies).forEach((data, idx) => {
                state.regencies[idx].text = data.name
                state.regencies[idx].id = data.id
            })
        },
        SET_ETHNICS: (state, ethnics) => {
            state.ethnics = ethnics
            Array.from(ethnics).forEach((data, idx) => {
                state.ethnics[idx].text = data.name
                state.ethnics[idx].id = data.id
            })
        },
        SET_DISTRICTS: (state, districts) => {
            state.districts = districts
            Array.from(districts).forEach((data, idx) => {
                state.districts[idx].text = data.name
                state.districts[idx].id = data.id
            })
        },
        SET_STATUSES: (state, statuses) => {
            state.statuses = statuses
            Array.from(statuses).forEach((data, idx) => {
                state.statuses[idx].text = data.name
                state.statuses[idx].id = data.id
            })
        },
        SET_JOBS: (state, jobs) => {
            state.jobs = jobs
            Array.from(jobs).forEach((data, idx) => {
                state.jobs[idx].text = data.name
                state.jobs[idx].id = data.id
            })
        },
        SET_ORDER_MITRA:(state, params) =>{
            state.orderMitra = params
        },
        SET_ORDER_LABOR:(state, params) =>{
            state.orderLabor = params
        },
        SET_ORDER_LABOR_REQ:(state, params) =>{
            state.orderLaborReq = params
        },
        SET_REVENUE: (state, revenue) => {
            state.revenue = revenue
        },
        SET_REPORT: (state, report) => {
            state.report = report
        },
        RESET_STATE_ARR: (state, key) =>{
            state[key] = []
        },
        RESET_STATE_OBJ: (state, key) =>{
            state[key] = {}
        }
    },
    getters: {
        provinces: state => state.provinces,
        regencies: state => state.regencies,
        districts: state => state.districts,
        ethnics: state => state.ethnics,
        jobs: state => state.jobs,
        statuses: state => state.statuses,
        orderLabor: state => state.orderLabor,
        orderLaborReq: state => state.orderLaborReq,
        orderMitra: state => state.orderMitra,
        revenue: state => state.revenue,
        report: state => state.report
    }
}


export default labor;
