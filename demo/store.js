import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dlgs: []
    },
    mutations: {
        ADD_MODAL(state, modal) {
            state.dlgs.push(modal);
        },
    },
    actions: {
        add({
            commit
        }, modal) {
            commit('ADD_MODAL', modal);
        },
    }
})
