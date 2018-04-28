/**
 * 实现表格的搜索，排序(尚未实现),分页功能,支持一次性全部读取数据和分步读取数据
 * 为提高扩展性，只返回了相关方法，属性，不限定html部分
 * 待功能完善后移入公共组件
 */
import api from '../../../../api';

export default {
    /**
     * [初始化smartTable对象]
     * @param  {[Object]}   STobj                               [传入的原始对象] [必须]
     * @param  {[String]}   STobj.ajax.url                      [获取数据的url] [必须]
     * @param  {[String]}   STobj.ajax.method                   [获取数据的方法] [可选，默认为GET]
     * @param  {[Object]}   STobj.ajax.params                   [获取数据的传送的参数] [可选]
     * @param  {[Boolean]}  STobj.async                         [true为分步获取数据，false为一次性获取数据] [可选, 默认为true]
     * @param  {[Array]}    STobj.pagination                    [分页信息] [可选]
     * @param  {[Array]}    STobj.pagination[index].displayName [分页下拉框展示的信息] [可选]
     * @param  {[Array]}    STobj.pagination[index].num         [分页下拉框展示的与后端交互的字段] [可选]
     * @param  {[Number]}   STobj.paginationDefaultIndex        [默认分页下拉框展示pagination的哪一条] [可选，默认为0]
     * @return {[Object]}   STobj                               [给STobj挂载一些属性和方法后返回]
     * @return {[Number]}   STobj.total                         [数据总量]
     * @return {[Object]}   STobj.data                          [展示在界面中的数据]
     * 返回方法待补充...
     */
    initSmartTableObj: (STobj) => {
        // 从后端获取的源数据
        let dataSource = [];
        // 搜索过滤后的数据
        let dataFiltered = [];
        /**
         * [搜索过滤数据]
         * @param  {[Array]}    data        [需要被处理的数组]
         * @param  {[String]}   searchKey   [搜索关键字]
         * @return {[Array]}                [处理后的数组]
         */
        const filterBy = (data, searchKey) => {
            return data.filter(function (item) {
                return item.tableName.includes(searchKey);  
            });
        };
        /**
         * [处理分页，每页展示多少数据]
         * @param  {[type]} data        [待处理的数据]
         * @param  {[type]} currentPage [当前页码]
         * @param  {[type]} pageSize    [每页展示条数]
         * @return {[type]}             [处理后的数据]
         */
        const limit = (data, currentPage, pageSize) => {
            const start = (currentPage - 1) * pageSize;
            const end = currentPage * pageSize;
            return data.slice(start, end);
        };

        const generateDisplayData = () => {
            if (STobj.async) {
                return dataSource;
            } else {
                dataFiltered = filterBy(dataSource, STobj.searchKey);
                STobj.total = dataFiltered.length;
                return limit(dataFiltered, STobj.currentPage, STobj.pageSize);
            }
        };
        // check params
        if(!STobj.ajax || !STobj.ajax.url) {
            throw "STobj.ajax.url不能为空";
        }
        // set default value
        STobj.ajax.method = STobj.ajax.method || 'GET';
        STobj.ajax.params = STobj.ajax.params || {};
        STobj.async = ((STobj.async === undefined || STobj.async === true)? true: false);
        STobj.pagination = STobj.pagination || [
            {
                displayName: 10,
                num: 10
            },
            {
                displayName: 20,
                num: 20
            },
            {
                displayName: 50,
                num: 50
            }
        ];
        STobj.paginationDefaultIndex = STobj.paginationDefaultIndex || 0;
        STobj.pageSize = STobj.pagination[STobj.paginationDefaultIndex].num;
        STobj.currentPage = 1;
        STobj.searchKey = '';
        if (STobj.async) {
            STobj.ajax.params.pageSize = STobj.pageSize;
            STobj.ajax.params.currentPage = 1;
            STobj.ajax.params.searchKey = '';
        };
        // 挂载接口方法到STobj对象 
        STobj.reloadPagination = () => {
            STobj.pages = [1];
            STobj.currentPage = 1;
            STobj.totalPage = Math.ceil(STobj.total / STobj.pageSize);
            if (STobj.totalPage > 4) {
                STobj.pages = [1,2,3,'...',STobj.totalPage];
            } else {
                for (let i = 0; i < STobj.totalPage; i++) {
                    STobj.pages = i + 1;
                }
            }
        };
        STobj.getData = (reloadPagination) => {
            return api.smartTable(STobj.ajax.url, STobj.ajax.method, STobj.ajax.params)
            .then((response) => {
                if(response.code == 0) {
                    dataSource = response.data.tables || [];
                    STobj.total = response.data.total;
                    STobj.data = generateDisplayData();
                    reloadPagination && STobj.reloadPagination();
                } else {
                    this.layerError(response.msg);
                }
            });
        };
        // 翻页
        STobj.flip = (page) => {
            if (page > 0 && page <= STobj.totalPage) {
                STobj.currentPage = page;
                if (STobj.totalPage > 4) {
                    STobj.pages[0] = Math.min(Math.max(page - 1, 1), STobj.totalPage - 3);
                    STobj.pages[1] = Math.min(Math.max(page, 2), STobj.totalPage - 2);
                    STobj.pages[2] = Math.min(Math.max(page + 1, 3), STobj.totalPage - 1);
                }
                if(STobj.async) {
                    STobj.ajax.params.currentPage = page;
                    STobj.getData(false);
                } else {
                    STobj.data = limit(dataFiltered, STobj.currentPage, STobj.pageSize);
                }
            }
            if(STobj.totalPage - page <= 2 && STobj.pages[3] == "...") {
                STobj.pages.splice(3, 1);
            }
            if(STobj.totalPage - page > 2 && STobj.pages[3] != "...") {
                STobj.pages.splice(3, 0,'...');
            }
        };
        // 改变每页数量
        STobj.changePageSize = (num) => {
            STobj.currentPage = 1;
            STobj.pageSize = num;
            if (STobj.async) {
                STobj.ajax.params.pageSize = num;
                STobj.getData(true);
            } else {
                STobj.reloadPagination();
                STobj.data = limit(dataFiltered, STobj.currentPage, STobj.pageSize);
            }
        };
        // 搜索
        STobj.search = (searchKey) => {
            STobj.searchKey = searchKey;
            if (STobj.async) {
                STobj.ajax.params.searchKey = searchKey;
                STobj.getData(true);
            } else {
                dataFiltered = filterBy(dataSource, searchKey);
                STobj.total = dataFiltered.length;
                STobj.reloadPagination();
                STobj.data = limit(dataFiltered, STobj.currentPage, STobj.pageSize);
            }
        };
        return STobj;
    }
};