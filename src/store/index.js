import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import datasource from './modules/datasource';
import screen from './modules/screen';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        common,
        datasource,
        screen
    }
});
