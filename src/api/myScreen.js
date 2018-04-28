import { fetch } from './base';

export default {
    getScreenList (params) {
        return fetch('get', '/bigScreen/list', params);
    },
    newScreen (params) {
        return fetch('post', '/bigScreen/create', {} , params);
    },
    reScreen (params) {
        return fetch('post', '/bigScreen/rename', {}, params);
    },
    copScreen (params) {
        return fetch('post', '/bigScreen/copy', {} , params);
    },
    delScreen (params) {
        return fetch('post', '/bigScreen/delete/'+ params.id, params);
    },
    publish (params) {
        return fetch('post', '/bigScreen/publish', {} , params);
    },
    checkPassword (params) {
        return fetch('post', '/bigScreen/checkPwById', {} , params);
    }
};