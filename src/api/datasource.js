/**
 * 工作表相关接口
 * 接口文档链接：http://192.168.149.92:9000/index.html
 */

import { fetch } from './base';

export default {
    datasource: {
        // BI中已添加进入的数据源列表
        getDisplayDatasource () {
            return fetch('get', '/database/list?pageSize=-1&pageNum=1');
        },
        // 获取数据仓库下默认的数据库列表
        getAllDatasource () {
            return fetch('get', '/database/listDb');
        },
        deleteDatasource (id) {
            return fetch('get', '/database/delete', {'id': id});
        },
        addDatasource (list) {
            return fetch('post', '/database/addDb', {}, {dbNames: list});
        },
        createDatasource (list) {
            return fetch('post', '/database/createDb', {}, list);
        },
        connectTest (params) {
            return fetch('post', '/database/testDb', {}, params);
        },
        addToSheet (params) {
            return fetch('post', '/sheet/addToSheet', {}, params);
        },
        previewTable (dbId, dbName, tableName) {
            return fetch('get', '/database/previewTable', {dbId: dbId, dbName: dbName, tableName: tableName, maxSize: 100});
        }
    },
    smartTable (url, method, params) {
        return fetch(method, url, params);
    }
};
