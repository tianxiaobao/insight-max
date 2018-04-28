import * as types from '../mutation-types';

const state = {
    activeDatasource: {
        id: null,
        name: null
    },
    operationFailed: false,
    operationSuccess: false
};
const getters = {
    activeDatasource: state => state.activeDatasource,
    operationFailed: state => state.operationFailed,
    operationSuccess: state => state.operationSuccess
};
const mutations = {
    SET_ACTIVE_DATASOURCE (state, payload) {
        state.activeDatasource = payload;
    },
    SHOW_OPERATION_SUCCESS (state) {
        state.operationSuccess = true;
        setTimeout(() => {state.operationSuccess = false;}, 3000);
    },
    SHOW_OPERATION_FAILED (state) {
        state.operationFailed = true;
        setTimeout(() => {state.operationFailed = false;}, 3000);
    }
};

const actions = {
    setActiveDatasource ({ commit }, payload) {
        commit(types.SET_ACTIVE_DATASOURCE, payload);
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};