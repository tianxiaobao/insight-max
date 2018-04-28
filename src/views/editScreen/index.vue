<template>
    <div class="screen-content">
        <header-panel></header-panel>
        <div class="big-main">
            <left-panel></left-panel>
            <screen-canvas></screen-canvas>
            <div class="big-right" :class="{'switch-on': !showRight}">
              <setting-panel></setting-panel>
            </div>
            <div class="popup lookData" style="display: none;">
                <div class="scrollDiv">
                    <pre>{{activeLayer&&activeLayer.sourceData.data}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import screenCanvas from './components/screenCanvas';
import settingPanel from './components/settingPanel';
import headerPanel from './components/headerPanel';
import leftPanel from './components/leftPanel';
import * as config from './config.js';
import api from '../../api';
import loadJs from '../../utils/loadJs';

export default {
    name: 'editScreen',
    components: { screenCanvas, settingPanel, headerPanel, leftPanel},
    mounted () {
        // 设置背景颜色
        document.body.style.backgroundColor = config.BACKGROUND_COLOR;
        // 获取id，初始化页面
        const id = this.$route.query.id;
        if(id) {
            const url = config.BS_URL_PREFIX + id;
            this.$store.commit('setScreenBasicMsg', {id: id, bsUrl: url});
        } else {
            this.emitInit();
        }

        // 获取百度地图
        if(window.BMap) {
            this.initPage();
        } else {
            const bmap = loadJs('bmap', config.BMAP_API);
            bmap.onload = () => {
                const bmapRealJs = document.querySelector('script[src*="' + config.BMAP_AK + '&services"]');
                bmapRealJs.onload = () => {
                    // 初始化页面
                    this.initPage();
                };
            };
        }
    },
    computed: {
        ...mapGetters(['activeLayer', 'screenBasicMsg', 'layers', 'showRight'])
    },
    methods: {
        initPage () {
            this.getData()
            .then(this.formatData)
            .then(this.emitInit)
            .then(this.updataSql);
        },
        updataSql () {
            this.layers.forEach((layer) => {
                if(layer.sourceData.type === 'database') {
                    this.$store.dispatch('refreshSqlData', layer);
                }
            });
        },
        // 获取数据
        getData () {
            return api.getBigScreen(this.screenBasicMsg.id);
        },
        // 数据格式转化
        formatData (response) {
            if (response.data) {
                document.title = response.data.bigScreenInfo.bsName || '大屏';
            }
            // 有数据
            if(response.code == 0 && response.data.bigScreenInfo.layout) {
                this.$store.commit('setIsPassword', response.data.bigScreenInfo.isPassword);
                const canvas = JSON.parse(response.data.bigScreenInfo.layout);
                
                // let canvas = {"height":1000, "width":1900};
                this.$store.dispatch('setCanvas', canvas);
                this.$store.commit('setPush', response.data.bigScreenInfo.push);
                const layers = [];
                response.data.layersInfo = response.data.layersInfo || [];
                response.data.layersInfo.forEach((item) => {
                    layers.push(JSON.parse(item.layout));
                });
                this.$store.dispatch('setLayers', layers);
            } else { // 没有数据，新建或异常
                this.$store.dispatch('setCanvas', {height: config.CANVAS_HEIGHT, width: config.CANVAS_WIDTH, bgUrl: ''});
                this.$store.dispatch('setLayers', []);
            }
        },
        emitInit () {
            // 发送初始化指令给各个模块
            this.$events.emit('initPage');
        }
    }
};
</script>
<style lang="less">
.big-left, .big-content, .big-bottom-content, .big-right {
    -webkit-transition:all .3s ease;
    -moz-transition:all .3s ease;
    -ms-transition:all .3s ease;
    -o-transition:all .3s ease;
    transition:all .3s ease;
}
.big-left.switch-on {
    height: 50px;
    left: -140px;
    z-index: 1;
}
.big-right.switch-on {
    right: -280px;
    height: 50px;
    z-index: 1;
}

.big-content.switch-on {
    right: 0px;
}
.big-content.switch-on + .big-bottom-content {
    right: 0;
}
.big-left.switch-on + div .big-content {
    left: 0;
}
.big-left.switch-on + div .big-bottom-content {
    left: 0;
}
.big-left.switch-on .big-manage-wrap {
    visibility: hidden;
}
.big-left .mt span{
    position: absolute;
    right: 10px;
    cursor: pointer;
}

.big-right .mt i.big-i3,
.big-right .mt i.big-i4 {
    margin: 0;
    margin-left: 10px;
    cursor: pointer;
}
.big-right .mt li {
    width: 120px !important;
}
</style>