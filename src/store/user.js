const user = {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user
        }
    },
    getters: {
        user: state => state.user
    }
}

export default user;