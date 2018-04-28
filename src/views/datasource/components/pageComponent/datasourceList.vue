<style type="text/css" scoped>
    .fold-txt,.source-menu h3,.source-menu .tips-text,.check,.pages a{cursor: pointer;}
    .s-leftMenu {
        z-index: 0 !important;
    }
</style>
<template>
    <div>
        <div class="s-leftMenu">
            <div style="display:none">{{ trigger }}</div>
            <div class="mt">
                数据源<span class="fold-txt" @click="openAddDatasourceLayer()">+添加</span>
            </div>
            <div class="mc">
                <div class="s-search">
                    <input type="text" class="s-searchInput" placeholder="请输入关键词搜索" v-model="searchKey"><a href="javascript:;" class="s-searchBtn"><i class="i31"></i></a>
                </div>
                <ul class="source-menu overflow-ul">
                    <li v-for="item in datasourceDisplay"
                        :class="{on: activeDatasource.id == item.dbId}"
                        >
                        <h3 class="fl"
                            @click="setActiveDatasource(item.dbId, item.displayName)"
                            >{{ item.alias }}
                        </h3>
                        <span class="tips-text fr" style="z-index: 10; display:block">
                            <b @click="deleteDatasource(item.dbId, item.isUse, item.displayName)">
                                删除
                            </b>
                            <span class="tips-con visit-con">名称：{{ item.displayName }}<br>所有者：{{ item.userName }}</span>
                        </span>
                        <div class="clear"></div>
                    </li>
                </ul>
                <div class="no-result" v-show="!datasourceDisplay.length && !loading">无搜索结果</div>
                <loading v-show="loading"></loading>
            </div>
        </div>
        <div class="addSource" style="display:none;">
            <ul class="listItem">
                 <li><p class="tit">所有者：</p>
                      <div class="con tab">
                            <span>
                                <i class="radio" id="r-com" 
                                    :class="{'radio-check': submitType == 0}"
                                    @click="submitType=0"
                                    >
                                </i>
                                <span>{{ user }}</span>
                            </span>
                            <!--span class="pl20">
                                <i class="radio" id="r-cn"
                                    :class="{'radio-check': submitType == 1}"
                                    @click="submitType=1"
                                    >
                                </i>
                                <span>其他</span>
                            </span-->
                      </div>
                  </li>
                  <div class="tab-bd">
                      <div class="tab-con r-com" v-show="submitType == 0">
                          <ul>
                                <li><p class="tit pal">选择数据源：</p>
                                    <div class="s-search" style="display:inline-block"><input type="text" placeholder="请输入关键词搜索" class="s-searchInput" v-model="searchDbKey" v-on:keyup="clearAll()"><a href="javascript:;" class="s-searchBtn"><i class="i31"></i></a></div>
                                <div class="con" v-show="datasourceOptionList.length != 0">
                                    <i class="check mr5"
                                        :class="{checked: addAll}"
                                        @click="selectAll()"
                                        >
                                    </i>
                                    全选
                                </div>
                                <p style="color:red; padding:6px; margin-left:90px" v-show="datasourceOptionList.length == 0">
                                    无可用数据， 请先在数据仓库添加数据
                                </p>
                                <ul class="domain-list pl95">
                                    <li v-for="item in datasourceOptionList" v-if="item.selectable && item.dbName.includes(searchDbKey)">
                                        <i class="check mr5"
                                            :class="{checked: item.checked}"
                                            @click="toggleSubmitList(item)"
                                            >
                                        </i>
                                        {{ item.dbName }}
                                    </li>
                                    <li v-for="item in datasourceOptionList" v-if="!item.selectable && item.dbName.includes(searchDbKey)">
                                        <i class="check mr5 checked disabled">
                                        </i>
                                        {{ item.dbName }}
                                    </li>
                                </ul>
                              </li>
                         </ul>
                      </div>
                      <div class="tab-con r-cn" v-show="submitType == 1">
                          <ul>
                              <li><p class="tit pal">显示名称</p>
                                <div class="con">
                                    <input type="text" class="inputMode w335 gray" placeholder="显示名称" v-model="displayName">
                                </div>
                              </li>
                              <li><p class="tit pal">数据库名称：</p>
                                <div class="con">
                                    <input type="text" class="inputMode w335 gray" placeholder="数据库名称" v-model="dbName">
                                </div>
                              </li>
                              <li><p class="tit pal">app key：</p>
                                <div class="con">
                                    <input type="text" class="inputMode w335 gray" placeholder="app key" v-model="appKey">
                                </div>
                              </li>
                              <li><p class="tit pal">secret key：</p>
                                <div class="con">
                                    <input type="text" class="inputMode w335 gray" placeholder="secret key" v-model="secretKey">
                                </div>
                              </li>
                              <li class="mb10"><p class="tit">连接测试：</p>
                               <div class="con">
                                    <p class="new-tips">
                                        <a href="#" class="whiteBtn_v3" 
                                            @click="connectTest()">
                                            连接测试
                                        </a>&nbsp;&nbsp;
                                        <span class="ff0 pl10" v-show="testFailed">
                                            链接超时！
                                        </span>
                                        <span class="0ff pl10" v-show="testSuccess">
                                            链接成功！
                                        </span>
                                    </p>
                                </div>
                              </li>
                         </ul>
                      </div>
                  </div>
              </ul>
        </div>
    </div>
</template>
<script>
import api from '../../../../api';
import loading from '../../../../components/loading';
import { mapGetters } from 'vuex';
export default {
    name: 'datasource-list',
    components: { loading },
    mounted () {
        // get datasource to display in main area the page
        this.getDatasource();
        // get datasource to display in the option box
        this.getOptionList();
        // get user from cookie
        this.user = this.getCookie('pin');
    },
    data () {
        return {
            datasourceList: [],
            item: '',
            searchKey: '',
            addAll: false,     
            submitList: [],         // 用户勾选的要添加的数据源列表
            ownDatabases: [],       // all the databases of the user
            trigger: false,         // trigger view to update
            submitType: 0,          // 0 refers add own databases, 1 refers add others
            testSuccess: false,
            testFailed: false,
            displayName: '',
            dbName: '',
            appKey: '',
            secretKey: '',
            user: '',
            loading: true,
            searchDbKey: ''
        };
    },
    computed: {
        ...mapGetters(['activeDatasource']),
        /**
         * [filter datasource by searchKey]
         * @return {[Array]} [data to display]
         */
        datasourceDisplay () {
            return this.datasourceList.filter((item) => {
                return item.displayName.includes(this.searchKey);  
            });
        },
        /**
         * [cache selected datasource]
         * @return {[Array]} [selected datasource of the user]
         */
        ownDatasourceCache () {
            const tempList = [];
            this.datasourceList.forEach((item) => {
                if(item.userName === this.user) {
                    tempList.push(item.dbName);
                }
            });
            return tempList;
        },
        /**
         * [generate the optionlist which is used in the template]
         * [set 'selectable' as false if the databases has been added]
         * @return {[Array]} []
         */
        datasourceOptionList () {
            return this.ownDatabases.map((item) => {
                const obj = {};
                obj.dbName = item;
                obj.checked = false;
                if(this.ownDatasourceCache.indexOf(item) !== -1) {
                    obj.selectable = false;
                } else {
                    obj.selectable = true;
                }
                return obj;
            });
        }
    },
    methods: {
        checkCheckAll () {
            this.addAll = this.datasourceOptionList.every((item) => (item.checked || !item.selectable));
        },
        setActiveDatasource (id, name) {
            this.$store.dispatch('setActiveDatasource', {id:id, name:name});
            // this.$store.commit('SET_ACTIVE_DATASOURCE', {id:id, name:name});
        },
        getCookie (name) { 
            let arr;
            const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg)) {
                return decodeURI(arr[2]);
            }
            return null; 
        },
        deleteDatasource (id, isUse, name) {
            if(isUse == 1) {
                this.layerMsg('该数据源正在被使用，不可删除！');
            } else {
                const deleteAction = (layero, index) => {
                    api.datasource.deleteDatasource(id).then((response) => {
                        if(response.code == 0) {
                            this.$store.commit('SHOW_OPERATION_SUCCESS');
                            layer.close(index);
                            this.getDatasource();
                        } else {
                            const msg = response.message || '操作失败';
                            this.layerMsg(msg);
                        }
                    })
                    .catch(function () {
                        this.layerMsg('接口连接失败');
                    });
                };
                this.layerConfirm('删除', '确认删除数据源：' + name + '？', deleteAction);
            }
        },
        getDatasource () {
            this.loading = true;
            api.datasource.getDisplayDatasource().then((response) => {
                this.loading = false;
                if(response.code == 0) {
                    this.datasourceList = response.data || [];
                    this.datasourceList.forEach((item) => {
                        item.alias = item.displayName;
                        if(item.alias.length > 12) {
                            item.alias = item.alias.slice(0,12) + '...';
                        }
                    });
                    this.setActiveDatasource(this.datasourceList[0].dbId, this.datasourceList[0].displayName);
                } else {
                    const msg = response.message || '操作失败';
                    this.layerMsg(msg);
                }
            });
        },
        addDatasource (layero, index) {
            if(this.submitType == 0) {
                if(this.submitList == 0) {
                    this.layerMsg("未选择数据源");
                    return;
                }
                api.datasource.addDatasource(this.submitList).then((response) => {
                    if(response.code == 0) {
                        this.$store.commit('SHOW_OPERATION_SUCCESS');
                        layer.close(index);
                        this.getDatasource();
                        // this.layerMsg("操作成功");
                    } else {
                        const msg = response.message || '操作失败';
                        this.layerMsg(msg);
                    }
                })
                .catch(function () {
                    this.layerMsg('接口连接失败');
                });
            } else {
                const params = {
                    displayName: this.displayName,
                    dbName: this.dbName,
                    appKey: this.appKey,
                    secretKey: this.secretKey
                };
                api.datasource.createDatasource(params).then((response) => {
                    if(response.code == 0) {
                        this.$store.commit('SHOW_OPERATION_SUCCESS');
                        layer.close(index);
                        this.getDatasource();
                    } else {
                        const msg = response.message || '操作失败';
                        this.layerMsg(msg);
                    }
                })
                .catch(function () {
                    this.layerMsg('接口连接失败');
                });
            }
            this.testFailed = false;
            this.testSuccess = false;
        },
        /**
         * [get all the databases of the user]
         * @return {[]} [nothing]
         */
        getOptionList () {
            api.datasource.getAllDatasource().then((response) => {
                if(response.code == 0) {
                    this.ownDatabases = response.data;
                    this.trigger = !this.trigger;
                } else {
                    const msg = response.message || '获取下拉框列表失败';
                    this.layerMsg(msg);
                }
            })
            .catch(function () {
                this.layerMsg('接口连接失败');
            });
        }, 
        openAddDatasourceLayer () {
            this.searchDbKey = '';
            this.checkCheckAll();
            this.getOptionList();
            this.layerAddDatasource(this.addDatasource, () => {this.testFailed = false; this.testSuccess = false;});
        },
        toggleSubmitList (item) {
            item.checked = !item.checked;
            const index = this.submitList.indexOf(item.dbName);
            if(item.checked) {
                this.submitList.push(item.dbName);
            } else {
                this.submitList.splice(index, 1);
            }
            this.checkCheckAll();
            this.trigger = !this.trigger;
        },
        selectAll () {
            this.addAll = !this.addAll;
            if(this.addAll) {
                this.datasourceOptionList.forEach((item) => {
                    if(!item.checked && item.selectable && item.dbName.includes(this.searchDbKey)) {
                        item.checked = true;
                        this.submitList.push(item.dbName);
                    }
                });
            } else {
                this.datasourceOptionList.forEach((item) => {
                    if(item.checked && item.selectable) {
                        item.checked = false;
                    }
                });
                this.submitList.length = 0;
            }
            this.trigger = !this.trigger;
        },
        clearAll () {
            this.addAll = false;
            this.datasourceOptionList.forEach((item) => {
                if(item.checked && item.selectable) {
                    item.checked = false;
                }
            });
            this.submitList.length = 0;
            this.trigger = !this.trigger;
        },
        connectTest () {
            this.testSuccess = false;
            this.testFailed = false;
            const params = {
                displayName: this.displayName,
                dbName: this.dbName,
                appKey: this.appKey,
                secretKey: this.secretKey
            };
            api.datasource.connectTest(params).then((response) => {
                if(response.code == 0) {
                    this.testSuccess = true;
                } else {
                    this.testFailed = true;
                }
            })
            .catch(function () {
                this.layerMsg('接口连接失败');
            });
        }
    }
};
</script>
<style scoped>
    .0ff {
        color: #64d1b5;
    }
    .overflow-ul {
        position: absolute;
        top: 90px;
        right: 0px;
        bottom: 60px;
        left: 0px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .overflow-ul > li {
        position: relative;
    }
    .overflow-ul > li .tips-text {
        position: static;
    }
    .overflow-ul .tips-con {
        position: absolute;
        top: 30px;
        left: 40px;
        background-color: #fff;
        z-index: 10000;
        word-break: break-all;
        width: 120px;
    }
    .checked.disabled {
        background: url(../../../../images/disabled.png);
    }
    .no-result {
        text-align: center;
        color: #ddd;
    }
</style>
