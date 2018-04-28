import { fetch } from './base';

export default {
    getDbList (params) {
        return fetch('get', '/database/list', params);
    },
    getDataBySql (params) {
        return fetch('get', '/layer/checkData', params);
    }
};