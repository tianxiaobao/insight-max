import * as types from '../mutation-types';

const state = {
    loading: false,
    showFail: false,
    deleteLayer:{
        type : '',
        name : '',
        id   : ''
    },
    dragTableData: {
        header: [],
        value: [],
        total: 0,
        loading: false
    }
};

const getters = {
    loading: state => state.loading,
    deleteLayer: state => state.deleteLayer,
    dragTableData: state => state.dragTableData
};

const mutations = {
    [types.LOAGING_STATUS] (state, status) {
        state.loading = status;
    },
    [types.SET_DELETE_LAYER] (state, payload) {
        state.deleteLayer = payload;
    },
    [types.SET_DRAG_TABLE_DATA] (state, payload) {
        state.dragTableData = payload;
    }
};

const actions = {
    setLoadingStatus ({ commit }, status) {
        commit(types.LOAGING_STATUS, status);
    },
    setDeleteLayer ({ commit }, payload) {
        commit(types.SET_DELETE_LAYER, payload);
    },
    setDragTableData ({ commit }, payload) {
        commit(types.SET_DRAG_TABLE_DATA, payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};