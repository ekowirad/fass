const user = {
    namespaced: true,
    state: {
        currentUser: {},
        user: {}
    },
    mutations: {
        SET_CURRENT_USER: (state, user) => {
            state.currentUser = user
        },
        SET_USER: (state, user) => {
            state.user = user
        },
    },
    getters: {
        currentUser: state => state.currentUser,
        user: state => state.user
    }
}

export default user;