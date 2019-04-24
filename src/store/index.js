import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        user,
    }
})

export default store;