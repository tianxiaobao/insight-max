import { fetch, fetch3wForm } from './base';

export default {
    upLoadScreenshot (req) {
        return fetch3wForm('post', '/bigScreen/updateImg', req);
    },
    getBigScreenAndCheck (id) {
        return fetch('get', '/bigScreen/getBigScreenAndCheck', {id: id});
    },
    updateBigScreen (req) {
        return fetch('post', '/bigScreen/update', {},req);
    },
    getShotImg (id) {
        return fetch('get', '/bigScreen/getImg/' + id);
    },
    layerGetData (id) {
        return fetch('get', '/layer/getData', {id: id});
    },
    getBigScreen (id) {
        return fetch('get', '/bigScreen/getBigScreen', {id: id});
    },
    updateBgPic (req) {
        return fetch('post', '/bigScreen/updateBgPic', {}, req);
    },
    refresh () {
        return fetch('get', '/bigScreen/refresh');
    }
};