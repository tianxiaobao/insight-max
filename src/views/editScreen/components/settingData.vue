<style>

</style>
<template>
<div class="setting">
	<div class="big-buildCon" id="con-detail-2">
        <div class="datav" style="margin-bottom: 60px;">
            <div class="i-mt">
                <h3 class="fl">{{activeLayer.name}}</h3>
                <!-- <i class="big-i2 fr"></i> -->
            </div>
            <div class="i-mc" v-show="filterType">
                <div class="item fore">
                    <h3 class="fl">{{activeLayer.name}}接口</h3>
                    <span class="fr ff0" v-if="!isValid">配置未完成</span>
                    <span class="fr" v-if="isValid">配置已完成</span>
                </div>
                <div class="item">
                    <!-- 表头 -->
                    <table class="big-listTable">
                        <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>字段</th>
                                <th>映射</th>
                                <th>说明</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                    </table>
                    <table class="big-listTable">
                        <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup>
                        <tbody>
                            <tr v-for="(item,$index) in activeLayer.sourceData.reflect">
                                <td>{{item.name}}</td>
                                <td><input type="text" class="inputMode w40" @change="matchStr($index)" v-model="item.reflectName"></td>
                                <td>{{item.construction}}</td>
                                <td>
                                    <span class="c62ba75" v-if="item.state">匹配成功</span>
                                    <span class="ff0" v-if="!item.state">未找到字段</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="item">
                    <ul class="big-listItem">
                        <li>
                            <p class="tit">数据源类型：</p>
                            <div class="con">
                                <div class="select-box shorter">
                                    <div class="dropdown-btn" @click="toggleDrop"><span class="select-value">{{dataType}}</span><i class="arr"></i></div>
                                    <div class="dropdown-list">
                                        <ul>
                                            <li @click="setDataType('staticData')"><a href="javascript:;">staticData</a></li>
                                            <li @click="setDataType('database')"><a href="javascript:;">database</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li v-if="dataType=='database'">
                            <p class="tit">选择数据库：</p>
                            <div class="con">
                                <div class="select-box shorter">
                                    <div class="dropdown-btn" @click="toggleDrop"><span class="select-value">{{selectDb.displayName}}</span><i class="arr"></i></div>
                                    <div class="dropdown-list">
                                        <ul>
                                            <li v-for="(db,$index) in dbList"><a href="javascript:;" @click="setSelectDb($index)">{{db.displayName}}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="show">
                        <div class="mt10" v-if="dataType=='database'">
                            SQL:<a href="#" @click.prevent="getDataBySql" class="blueLink fr">查看数据</a>
                        </div>
                        <div id="editor" class="mt10"></div>
                        <div class="mt10 m-mb">
                            <i class="big-check mr10 fl mt5" :class="activeLayer.sourceData.refreshState?'big-checked':''" @click="activeLayer.sourceData.refreshState=!activeLayer.sourceData.refreshState"></i>每 &nbsp;<input type="text" class="inputMode w40" v-model="activeLayer.sourceData.reflectFrequency" @blur="replaceValue">&nbsp;秒自动更新
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import api from '../../../api';
import { mapGetters } from 'vuex';
export default {
    name: 'settingData',
    data () {
        return {
            dataType:'staticData',// 数据源类型
            dbList:[],// 数据库列表
            selectDb:[],// 选择的数据库
            sql:null,
            haveCheck:false,// 拦截请求，防止点击多次
            isValid:false
        };
    },
    mounted () {
        // this.$events.on('addLayer', this.retCheck);
        this.initAce();
        this.getDbList();
        this.listenData();
        this.matchAll();
    },
    computed: {
        ...mapGetters(['layers','activeLayer']),
        filterType () {
            const type = this.activeLayer.type;
            return (type != 'border' && type != 'gif' && type != 'video');
        }
    },
    watch:{
        activeLayer (obj) {
            if(!obj) return;
            this.initAce();
        }
    },
    methods: {
        // 初始ACE插件
        initAce () {
            const editor = ace.edit("editor");
            editor.setTheme("ace/theme/twilight");
            // 把activeLayer的type存起来
            this.dataType = this.activeLayer.sourceData.type;
            if(this.activeLayer.sourceData.type=='database') {
                editor.getSession().setMode("ace/mode/sql");
                const con = this.activeLayer.sourceData.sql;
                editor.setValue(con);
            }else{
                editor.getSession().setMode("ace/mode/json");
                const con = formatJson(this.activeLayer.sourceData.sData);
                editor.setValue(con);
            }
        },
        // 获取数据库列表
        getDbList () {
            api.getDbList().then(res => {
                if(res.code == 0) {
                    this.dbList = res.data;
                    if(this.activeLayer.sourceData.databaseId) {
                        for(let i=0;i<this.dbList.length;i++) {
                            if(this.dbList[i].dbId == this.activeLayer.sourceData.databaseId) {
                                this.selectDb = this.dbList[i];
                            }
                        }
                    }else{
                        this.selectDb = this.dbList[0];
                    }
                } else {
                    this.layerMsg(res.message);
                }
            });
        },
        // 下拉菜单函数
        toggleDrop (e) {
            const _parent=$(e.currentTarget).parent();
            if(_parent.hasClass("open")) {
                _parent.removeClass("open");
            } else{
                $(".select-box").removeClass("open");
                _parent.addClass("open");
            }
            $(document).one('click',function () {
                $(".select-box").removeClass("open");
            });
            e.stopPropagation();
        },
        // 切换数据类型函数
        setDataType (type) {
            if(this.activeLayer.sourceData.type != type) {
                this.activeLayer.sourceData.type = type;
                this.initAce();
            }
        },
        // 设置选择的数据库
        setSelectDb (index) {
            this.activeLayer.sourceData.databaseId = this.dbList[index].dbId;
            this.selectDb = this.dbList[index];
        },
        // 执行sql
        getDataBySql () {
            // 拦截请求，防止点击多次
            if(this.haveCheck) {
                return;
            }
            this.haveCheck = true;
            const editor = ace.edit("editor");
            this.activeLayer.sourceData.databaseId = this.selectDb.dbId;
            this.activeLayer.sourceData.sql = editor.getValue();
            const params = {databaseId:this.selectDb.dbId,sql:editor.getValue()};
            api.getDataBySql(params).then(res => {
                if(res.code == 0) {
                    this.activeLayer.sourceData.data = res.data.data;
                    this.layerLookData((layero, index) => {
                        layer.close(index);
                    }, () => {
                    });
                    this.haveCheck = false;
                } else {
                    this.haveCheck = false;
                    this.layerError(res.message);
                }
            });
        },
        // 匹配字段
        matchStr (index) {
            const editor = ace.edit("editor");
            let sourceData0;
            // 数据源
            if(this.activeLayer.sourceData.type=='database') {
                sourceData0 = this.activeLayer.sourceData.data[0] || {};
                if(this.activeLayer.sourceData.reflect[index].reflectName.indexOf(",") < 0) {
                    if(sourceData0.hasOwnProperty(this.activeLayer.sourceData.reflect[index].reflectName)) {
                        this.activeLayer.sourceData.reflect[index].state = true;
                    }else{
                        this.activeLayer.sourceData.reflect[index].state = false;
                    }
                }else{
                    this.activeLayer.sourceData.reflect[index].state = true;
                    const reflectArr = this.activeLayer.sourceData.reflect[index].reflectName.split(",");
                    for(let i = 0; i < reflectArr.length; i++) {
                        if(!sourceData0.hasOwnProperty(reflectArr[i])) {
                            this.activeLayer.sourceData.reflect[index].state = false;
                            break;
                        }
                    }
                }
            }else{
                // 静态数据
                sourceData0 = this.activeLayer.sourceData.sData;
                if(this.activeLayer.sourceData.reflect[index].reflectName.indexOf(',') < 0) {
                    for(let i=0;i<sourceData0.length;i++) {
                        if(sourceData0[i].hasOwnProperty(this.activeLayer.sourceData.reflect[index].reflectName)) {
                            this.activeLayer.sourceData.reflect[index].state = true;
                        }else{
                            this.activeLayer.sourceData.reflect[index].state = false;
                        }
                    }
                }else{
                    const reflectArr = this.activeLayer.sourceData.reflect[index].reflectName.split(",");
                    this.activeLayer.sourceData.reflect[index].state = true;
                    for(let i = 0; i < reflectArr.length; i++) {
                        for(let j=0;j<sourceData0.length;j++) {
                            if(sourceData0[j].hasOwnProperty(reflectArr[i])) {
                                this.activeLayer.sourceData.reflect[index].state = true;
                            }else{
                                this.activeLayer.sourceData.reflect[index].state = false;
                            }
                        }
                    }
                }
            }
            if(this.dataType == 'staticData') {
                this.updateProps(editor);
            }
            this.matchAll();
        },
        matchAll () {
            const refLen = this.activeLayer.sourceData.reflect.length;
            const legnth = (this.activeLayer.type == 'pie'|| this.activeLayer.type == 'generalTitle'||this.activeLayer.type == 'singlePic'|| this.activeLayer.type == 'video') ? refLen:refLen-1;
            for(let i=0;i<legnth;i++) {
                if(this.activeLayer.sourceData.reflect[i].state) {
                    this.isValid = true;
                }else{
                    this.isValid = false;
                    break;
                }
            }
            if(this.isValid) {
                this.$events.emit('redraw_chart');
            }
        },
        listenData () {
            const _this =this;
            const editor = ace.edit("editor");
            editor.on("blur", function () {
                if(_this.dataType == 'staticData'&&editor.getValue()!=""&&!$(".ace_error").length) {
                    _this.activeLayer.sourceData.sData = JSON.parse(editor.getValue());
                    _this.updateProps();
                }
            });
        },
        updateProps () {
            this.$events.emit('redraw_chart');
        },
        replaceValue () {
            let val = this.activeLayer.sourceData.reflectFrequency;
            val = val.replace(/\D/g,'');
            if(val>99999) {
                val = 99999;
            }
            if(val<1) {
                val = 1;
            }
            this.activeLayer.sourceData.reflectFrequency =val;
        }
    }
};
</script>
<style>
#editor {
    height: 200px;
}
.datav .big-listItem li {
    padding-top: 10px;
}
</style>
