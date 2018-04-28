<template>
    <div class="s-rightMenu" id="datasource">
        <div style="display:none"> {{ trigger }} </div>
        <div class="border-radius0 bor-box ml12" style="margin-bottom:60px">
            <div class="webDiv f3f7fb">
                <div class="searchBox">
                    <input type="text" class="searchInput" placeholder="请输名称进行搜索" v-model="STobj.searchKey" 
                        @keyup="search(STobj.searchKey)">
                    <a href="#" class="searchBtn" @click="search(STobj.searchKey)">
                      <i class="i31"></i>
                    </a>
                </div>
            </div>
            <table class="listTable table-layout">
                <colgroup>
                    <col width="33%" class="batch">
                    <!-- <col width="25%"> -->
                    <col width="33%">
                    <col width="33%">
                </colgroup>
                <thead>
                    <tr>
                        <!--th class="batch" id="selectAll2">
                            <i class="check"
                                :class="{checked: addAll}"
                                @click="checkAll()"
                                >
                            </i>
                        </th-->
                        <th>数据表名称</th>
                        <!-- <th>大小</th> -->
                        <th>创建时间</th>
                        <th><span class="pl5">操作</span></th>
                    </tr>
                </thead>
            </table>
            <table class="listTable table-layout break-word" v-show="!loading">
                <colgroup>
                    <col width="33%" class="batch">
                    <col width="33%">
                    <col width="33%">
                </colgroup>
                <tbody>
                    <!--tr class="trGray"-->
                    <tr v-for="item in STobj.data">
                        <!--td class="batch">
                            <i class="check"
                                :class="{checked: item.checked}"
                                @click="toggleSubmitList(item)"
                                >
                            </i>
                        </td-->
                        <td class="txtHidden" :title="item.tableName">{{ item.tableName }}</td>
                        <!-- <td>{{ item.size }}</td> -->
                        <td>{{ item.createdTime }}</td>
                        <td>
                            <a href="#" class="blueLink"
                                @click="activetableName = item.tableName; reload = true; previewTable();"
                                >
                                查看
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <loading v-show="loading" style="background-color:#fff; padding:20px 0;"></loading>
            <div style="background-color:#fff; padding:20px 0; text-align:center; color: #ddd" v-show="!loading && STobj.data.length == 0 && STobj.searchKey !== ''">
                无相关结果
            </div>
            <div style="background-color:#fff; padding:20px 0; text-align:center; color: #ddd" v-show="!loading && STobj.data.length == 0 && STobj.searchKey === ''">
                无数据表数据
            </div>
            <!--div class="botDiv">
                <span class="checkDiv" id="selectAll">
                    <i class="check"
                        :class="{checked: addAll}"
                        @click="checkAll()"
                        >
                    </i>
                </span>
                <a href="#" class="glBtn"
                    @click="addToSheet()"
                    >
                    添加至工作表
                </a>
            </div-->
        </div>
        <div class="page-div fix">
            <div class="pages cl">
                <p class="fr" v-show="STobj.totalPage > 1">项 
                  <a href="#" class="firstpage"
                    @click="flip(1)"
                    :class="{no: STobj.currentPage == 1}"
                    >
                    <i></i>
                  </a>
                  <a href="#" class="prev" 
                    @click="flip(STobj.currentPage - 1)"
                    :class="{no: STobj.currentPage == 1}"
                    >
                    &lt;
                  </a>
                  <a v-for="item in STobj.pages" 
                    @click="flip(item)"
                    :class="{current: STobj.currentPage == item}"
                    >
                    {{ item }}
                  </a>
                  <a href="#" class="next"
                    @click="flip(STobj.currentPage + 1)"
                    :class="{no: STobj.currentPage == STobj.totalPage}"
                    >&gt;</a>
                  <a href="#" class="lastpage"
                    @click="flip(STobj.totalPage)"
                    :class="{no: STobj.currentPage == STobj.totalPage}"
                    >
                    <i></i>
                  </a> 跳转到
                  <input type="text" class="pageinput" v-model="goPage" @keyup.enter="flip(goPage)">页
                  <a href="#" class="gobutton" @click="flip(goPage)">GO
                  </a>
                </p>
                <div class="new-sel-box" v-show="STobj.totalPage > 1">
                    <div class="sel-value">{{ STobj.pageSize }}</div>
                    <select class="new-select" v-model="STobj.pageSize" @change="changePageSize(STobj.pageSize)">
                        <option v-for="item in STobj.pagination" v-model="item.num">
                          {{ item.displayName }}
                        </option>
                    </select>
                </div>
                <p class="txt" v-show="STobj.totalPage > 1">，每页显示</p>
                <p class="txt">共{{ STobj.total }}项</p>
            </div>
        </div>
        <div class="cl"></div>
        <div class="layer-table" style="display:none">
            <vue-dragtable v-on:loadData="previewTable"></vue-dragtable>
        </div>
    </div>
</template>
<script>
import smartTable from '../smartTable';
import api from '../../../../api';
import loading from '../../../../components/loading';
import { mapGetters } from 'vuex';
import vueDragtable from '../../../../components/vue-dragtable';
export default {
    name: 'common-table',
    components: { loading, vueDragtable },
    computed: {
        ...mapGetters(['dragTableData', 'activeDatasource'])
    },
    data () {
        return {
            item: '',
            goPage: '',
            STobj: {
                ajax: {
                    url: '/database/listTables',
                    method: 'GET',
                    params: {
                        pageSize: -1,
                        pageNum: 1
                    }
                },
                async: false,
                data: []
            },
            submitList: [], // selected databases to submit
            addAll: false, // select all checkbox
            loading: false,
            reload: true,
            trigger: false,
            activetableName: null
        };
    },
    created () {
        // initial smartTable object
        smartTable.initSmartTableObj(this.STobj);
    },
    methods: {
        checkCheckAll () {
            this.addAll = this.STobj.data.every((item) => (item.checked));
        },
        /**
         * [add or delete item from SubmitList]
         * @param  {[String]} item  [dbname]
         * @return {[null]}         [nothing]
         */
        toggleSubmitList (item) {
            item.checked = !item.checked;
            const index = this.submitList.indexOf(item.tableName);
            if(item.checked) {
                this.submitList.push(item.tableName);
            } else {
                this.submitList.splice(index, 1);
            }
            this.checkCheckAll();
            this.trigger = !this.trigger;
        },
        /**
         * [check or clear all checkboxs]
         * @return {[null]} [nothing]
         */
        checkAll () {
            this.addAll = !this.addAll;
            if(this.addAll) {
                this.STobj.data.forEach((item) => {
                    if(!item.checked) {
                        item.checked = true;
                        this.submitList.push(item.tableName);
                    }
                });
            } else {
                this.clearCheck();
            }
            this.trigger = !this.trigger;
        },
        search (searchKey) {
            this.STobj.search(searchKey);
            this.clearCheck();
            this.trigger = !this.trigger;
        },
        changePageSize (num) {
            this.STobj.changePageSize(num);
            this.clearCheck();
            this.trigger = !this.trigger;
        },
        flip (page) {
            this.STobj.flip(page);
            this.clearCheck();
            this.trigger = !this.trigger;
        },
        /**
         * [clear all checkbox]
         * @return {[null]} [nothing]
         */
        clearCheck () {
            this.submitList.length = 0;
            this.addAll = false;
            this.STobj.data.forEach((item) => {
                item.checked = false;
            });
        },
        /**
         * [add table to worksheet]
         * @param {[String]} tableName []
         */
        addToSheet (tableName) {
            const params = {
                dbId: this.activeDatasource.id
            };
            // use submitList when tableName eq undefined
            if(tableName) {
                params.tableName = [tableName];
            } else if(this.submitList.length == 0) {
                this.layerMsg('未选择任何数据表');
                return;
            } else {
                params.tableName = this.submitList;
            }
            api.datasource.addToSheet(params).then((response) => {
                if(response.code == 0) {
                    // display success tips on the top right  of the page
                    this.$store.commit('SHOW_OPERATION_SUCCESS');
                    this.$router.push({path:'/worksheet/list'});
                } else {
                    const msg = response.message || '操作失败';
                    this.layerError(msg);
                }
            })
            .catch(function () {
                this.layerMsg('接口连接失败');
            });
        },
        previewTable () {
            if(this.activetableName !== null) {
                const index = layer.load(1);
                if(this.reload) {
                    const obj = {
                        header: [], // 表头 
                        value: [],  // 值
                        loading: true, // 为true时显示‘正在加载数据...’
                        total: 10 // 总数
                    };
                    this.$store.dispatch('setDragTableData', obj);
                    this.reload = false;
                }
                api.datasource.previewTable(this.activeDatasource.id, this.activeDatasource.name, this.activetableName).then((response) => {
                    layer.close(index);
                    if(response.code == 0) {
                        const obj = {
                            header: response.data.headers,
                            value: this.dragTableData.value.concat(response.data.values),
                            loading: false,
                            total: response.data.values.length // 这里由于后端不支持分页，所以做了特殊处理
                        };
                        this.$store.dispatch('setDragTableData', obj);
                        this.layerTable();
                    } else {
                        const msg = response.message || '操作失败';
                        this.layerError(msg);
                    }
                });
            }
        }
    },
    watch: {
        activeDatasource () {
            this.STobj.ajax.params.dbId = this.activeDatasource.id;
            if(this.activeDatasource.id !== undefined && this.activeDatasource.id !== null) {
                if(this.STobj.ajax.params.dbId) {
                    this.loading = true;
                    this.STobj.getData(true).then(() => {
                        this.loading = false;
                    }); 
                } else {
                    this.loading = false;
                }
            }
        }
    }
};
</script>
<style type="text/css" scoped>
    .pages a.current {
        background: #51d2b7;
        color: #fff;
    }
    .txtHidden{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .s-rightMenu .vue-dragtable-container {
        height: 300px;
    }
    .layer-table.layui-layer-wrap {
        padding: 10px;
    }
    .listTable tbody>tr:nth-child(odd) {
        background-color: #f3f7fb;
    }
    .listTable tbody>tr:hover {
        background-color: #f9f8e8;
    }
</style>