<template>
    <div class="preview" id="preview">
        <div class="big-sub-content"
             v-show="checkPassed"
            >
            <div class="item resizable" 
                v-for="layer,$index in layers" 
                :style="{'z-index': layer.zIndex,
                         'height': layer.height + 'px',
                         'width': layer.width + 'px',
                         'left': layer.x + 'px',
                         'top': layer.y + 'px'
                        }"
                :index="$index"
                v-show="layer.visiable"
                >
                <div :id="layer.id" class="layer-canvas"></div>
            </div>
        </div>
        <div class="shade-model" v-show="!checkPassed">
            <div class="inputPass">
                <p v-show="!publish && !needPw">该大屏尚未发布</p>
                <p v-show="!publish && needPw">已打开密码保护，请输入密码</p>
                <div v-show="!publish && needPw">
                    <input class="inputMode" type="text" v-model="password"><a href="#" class="btn" @click.prevent="checkPassword">确定</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import highcharts from 'highcharts';
import loadJs from '@/utils/loadJs';
import * as config from '../editScreen/config.js';
import transform from '@/store/modules/transform';

export default {
    name: 'previewScreen',
    data () {
        return {
            zoom: null,  // 比例尺
            layers: [],
            id: null,
            checkPassed:false,
            publish:true,
            needPw:false,
            password:'',
            canvas: {
                height: '',
                width: '',
                bgUrl: '',
                scale: config.SCREEN_SCALES[0]
            },
            unit: 1000,
            max: 99999,
            min: 1,
            updateLayers: []
        };
    },
    mounted () {
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
        if(this.$route.query.id) {
            this.id = this.$route.query.id;
        }
        if(this.$route.query.pre) {
            this.checkPassed = true;
        }
        $(window).resize(this.setScale);
        $('head').append('<meta name="viewport" content="width='+ window.screen.width +'"/>');
    },
    methods: {
        initPage () {
            this.getData()
            .then(this.formatData)
            .then(this.setScale)
            .then(this.drawAll)
            .then(this.update);
            this.checkPublish();
        },
        // 获取数据
        getData () {
            const pre = (this.$route.query.pre === '1') ? true : false;
            return pre ? api.getBigScreen(this.id) : api.getBigScreenAndCheck(this.id);
        },
        // 数据格式转化
        formatData (response) {
            if(response) {
                if(response.code == 0) {
                    document.title = response.data.bigScreenInfo.bsName || '大屏';
                    this.canvas = JSON.parse(response.data.bigScreenInfo.layout);
                    this.layers.length = 0;
                    response.data.layersInfo.forEach((item) => {
                        this.layers.push(JSON.parse(item.layout));
                    });
                } else {
                    const msg = ('message' in response) ? response.message : '请求数据异常，请稍后再试！';
                    this.$message.error(msg);
                }
            }
        },
        // 查询sql并画图
        drawAll () {
            this.layers.forEach((layer) => {
                if(layer.sourceData.type === 'staticData') {
                    this.drawLayer(layer);
                } else {
                    this.$store.dispatch('refreshSqlData', layer);
                }
            });
        },
        update () {
            const layers = this.layers;
            for(let i = 0; i < layers.length; i++) {
                const state = layers[i].sourceData.refreshState;
                state && this.updateLayers.push(layers[i]);
            }
            this.updateLayers.sort((a, b) => {
                return Number(a.sourceData.reflectFrequency) - Number(b.sourceData.reflectFrequency);
            });
            this.updating();
        },
        updating () {
            const layers = this.updateLayers;

            for(let i = 0; i < layers.length; i++) {
                const type = layers[i].sourceData.type;
                
                if(type === 'staticData') {
                    this.getStaticData(layers[i]);
                } else {
                    this.getSqlData(layers[i]);
                }
            }
        },
        getStaticData (layer) {
            const reftime = Number(layer.sourceData.reflectFrequency);
            const time = this.judgeValue(reftime);
            const layerId = layer.id;
            
            const result = (res) => {
                if(res && res.code == 0) {
                    const layersInfo = res.data.layersInfo;
                    layersInfo.forEach(item => {
                        const lid = item.layerId;
                        if(lid == layerId) {
                            const layout = JSON.parse(item.layout);
                            const newLayer = this.setSeries(transform, layout);
                            layout.chart = highcharts.chart(newLayer.id, newLayer.chartMsg);
                            this.$store.commit('triggerChartCallback', layout);
                        }
                    });
                }
            };
            
            setInterval(() => {
                this.getData().then(result);
            }, time);
        },
        getSqlData (layer) {
            const state = layer.sourceData.refreshState;
            const reftime = Number(layer.sourceData.reflectFrequency);
            const time = this.judgeValue(reftime);

            if(state) { // 定时更新
                setInterval(() => {
                    this.$store.dispatch('refreshSqlData', layer);
                }, time);
                this.$store.dispatch('refreshSqlData', layer);
            } else {
                this.$store.dispatch('refreshSqlData', layer);
            }
        },
        setSeries (transform, layer) {
            const type = layer.type;
            if(transform.hasOwnProperty(type)) {
                return transform[type](layer);
            }    
        },
        judgeValue (num) {
            let time = 0;

            if(num <= 0 || isNaN(num)) {
                time = this.min * this.unit;
            } else if (num > this.max) {
                time = this.max;
            } else {
                time = num * this.unit;
            }
            return time + 100;
        },
        // 画图
        drawLayer (layer) {
            if(layer.chartType === 'highchart') {
                layer.chart = highcharts.chart(layer.id, layer.chartMsg);
            } else if (layer.chartType === 'video') {
                this.createVideo(layer);
            }
            this.$store.commit('triggerChartCallback', layer);
        },
        createVideo (layer) {
            if ($(`#${layer.id}`).find('video').length) return;
            const videoInfo = layer.chartMsg.video;
            const videoTemp = `
                <video src="${videoInfo.url}" ${videoInfo.autoplay ? 'autoplay' : ''} ${videoInfo.loop ? 'loop' : ''} width="100%" height="99%">
                    your browser does not support the video tag
                </video>`;
            
            $(`#${layer.id}`).append(videoTemp);
        },
        setScale () {
            const scale = this.canvas.scale;
            const zoom = {x: 0, y: 0};
            const percent = {x: 0, y: 0};
            const bgSize = this.getImgSize();
            
            if(!this.checkPassed) return;
            
            zoom.x = $(window).width() / (Number(this.canvas.width));
            zoom.y = $(window).height() / (Number(this.canvas.height));
            percent.x = (this.canvas.width - bgSize.w) * (1 - zoom.x);
            percent.y = (this.canvas.height - bgSize.h) * (1 - zoom.y);
            const style = {
                width: this.canvas.width,
                height: this.canvas.height,
                backgroundImage: `url(${this.canvas.bgUrl})`,
                backgroundColor: '#313541',
                transformOrigin: 'left top'
            };

            switch(scale.value) {
            case 'width':
                style.transform = `scale(${zoom.x})`;
                $('html').css({overflowX: 'hidden', overflowY: 'visible'});
                $('body').css(style);
                break;
            case 'height':
                style.transform = `scale(${zoom.y})`;
                style.backgroundSize = 100 * (window.screen.width / $(window).width() * zoom.y) + "%" + ' 100%';
                style.backgroundPosition = ($(window).width()-$('body').width() * zoom.y) / 2 + "px top";
                style.marginLeft = ($(window).width() - $('body').width() * zoom.y) / 2;
                $('html').css({overflowX: 'hidden', overflowY: 'hidden'});
                $('body').css(style);
                break;
            case 'full':
                style.transform = `scale(${zoom.x}, ${zoom.y})`;
                style.backgroundSize = '100% 100%';
                $('html').css({overflowX: 'hidden', overflowY: 'hidden'});
                $('body').css(style);
                break;
            }
        },
        getImgSize () {
            const o = {w: 0, h: 0};
            const img = new Image();

            img.onload = () => {
                o.w = img.width;
                o.h = img.height;
            };
            img.src = this.canvas.bgUrl;
            return o;
        },
        // 检查是否发布
        checkPublish () {
            api.getBigScreenAndCheck(this.id).then(res => {
                if(res.code=='43') {
                    this.publish = false;
                    this.needPw = true;
                }else if(res.code=='42') {
                    this.publish = false;
                    this.needPw = false;
                }else{
                    this.checkPassed = true;
                    this.publish = false;
                    this.needPw = false;
                    return res;
                }
            }).then(this.formatData)
            .then(this.setScale)
            .then(this.drawAll);
        },
        // 检查发布密码
        checkPassword () {
            api.checkPassword({bigScreenId:this.id,password:this.password}).then(res => {
                if(res.code=='0') {
                    this.checkPassed = true;
                    this.publish = false;
                    this.needPw = false;
                    return res;
                }else{
                    this.layerMsg(res.message);
                }
            }).then(this.formatData)
            .then(this.setScale)
            .then(this.drawAll);
        }
    }
};
</script>
<style lang="less">
    html,body {
        height: 100%;
        width: 100%;
        overflow: hidden;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            background-color: #fff;
        }
        background-size: cover
    }
    body {
        padding: 0;
        height: 100%;
        transform-origin: 'left top 0px';
    }
    .preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        // min-width: auto;
        // position: absolute;
        // top: 0;
        // bottom: 0;
        // left: 0;
        // right: 0;
        // padding: 0;
        // overflow: visible;
        background-color: transparent;
    }
   .preview .big-sub-content {
        position: relative;
        transform-origin: left top;
        margin-top: 0;
        background-color: transparent;
    } 
   .preview .item {
        position: absolute;
        // margin-left: -8px;
    }
   .preview .item:hover {
        border: 0;
    }
    .preview .big-sub-content {
        height: 100%;
    }
    .preview .layer-canvas {
        height: 100%;
        width: 100%;
    }
    .white {
        color: #fff;
        font-size: 64px;
    }
    .shade-model {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(222, 222, 222, 0.2);
    }
    .preview .inputPass .btn{
        display: inline-block;
        border-radius: 3px;
        text-align: center;
        background: #3e8acc;
        color: #fff;
        width: 70px;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
    }
    .preview .inputPass .inputMode{
        vertical-align: top;
    }
    .preview .inputPass{
        position: absolute;
        top: 40%;
        left: 50%;
        width:50%;
        padding:10px;
        text-align:center;
        color:#fff;
        transform: translate(-50%, -50%);
    }
    .preview .inputPass p{
        color: #fff;
        text-align: center;
        padding-bottom:10px;
        font-size: 16px;
    }
    video::-internal-media-controls-download-button {
        display: none;
    }

    video::-webkit-media-controls-enclosure {
        overflow: hidden;
    }
    video::-webkit-media-controls-fullscreen-button {
        display: none;
    }
    video::-webkit-media-controls {
        overflow: hidden !important
    }
    video::-webkit-media-controls-enclosure {
        width: calc(100% + 7px);
        margin-left: auto;
    }

</style>