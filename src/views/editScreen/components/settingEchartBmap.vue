<template>
<div class="setting" id="echartBmap">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>平面地图</h3></dt>
            </dl>

            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>底图层</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">主题</span>
                            <div class="right">
                                <select class="u-select w100" v-model="chartMsg.bmap.mapStyle.style" @change="drawMap">
                                    <option v-for="item in baseStyle" :value="item.value">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </dd>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <h3>范围</h3>
                        <vue-address
                            :init-prov-selected-value="35"
                            :init-city-selected-value="45055"
                            :init-region-selected-value="535"
                            v-on:address="changeAddress">
                        </vue-address>
                        <div class="item clearfloat">
                            <span class="left">透明度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="1"
                                    :min="0"
                                    :step="0.1"
                                    v-model="chartMsg.bmap.mapStyle.fillOpacity"
                                    @change="drawMap"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                    </div>
                </dd>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <h3>地图缩放</h3>
                        <div class="item clearfloat map-scale">
                            <el-slider
                                :max="13"
                                :min="1"
                                v-model="chartMsg.bmap.zoom"
                                @change="drawMap"
                                show-input>
                            </el-slider>
                        </div>
                    </div>
                </dd>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <h3>地图中心</h3>
                        <div class="item clearfloat">
                            <span class="left">经度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="180"
                                    :min="-180"
                                    :step="0.01"
                                    v-model="chartMsg.bmap.center[0]"
                                    @change="drawMap"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">纬度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="90"
                                    :min="-90"
                                    :step="0.01"
                                    v-model="chartMsg.bmap.center[1]"
                                    @change="drawMap"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">比例尺控件</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.bmap.mapStyle.scaleRuler" @change="drawMap"></el-checkbox>
                            </select>
                            </div>
                        </div>
                    </div>
                </dd>
            </dl>

            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="bOpen = !bOpen">
                        <b class="unfold"></b><h3>气泡层</h3>
                    </a>
                </dt>
                <dd :class="{ open: bOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">波动范围</span>
                            <div class="right mr-30">
                                <el-slider
                                    v-model="chartMsg.series[0].rippleEffect.scale"
                                    @change="drawMap"
                                    show-input
                                    >
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">动效速度</span>
                            <div class="right mr-30">
                                <el-slider
                                    v-model="chartMsg.series[0].rippleEffect.period"
                                    @change="drawMap"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">尺寸</span>
                            <div class="right mr-30">
                                <el-slider
                                    v-model="chartMsg.series[0].symbolSize"
                                    @change="drawMap"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">气泡类型</span>
                            <div class="right mr-30">
                                <select class="u-select w100" v-model="chartMsg.series[0].rippleEffect.brushType" @change="drawMap">
                                <option v-for="item in brushType" :value="item">{{item}}</option>
                            </select>
                            </div>
                        </div>
                        <div class="item clearfloat color">
                            <setting-color name="颜色" v-model="chartMsg.series[0].itemStyle.normal.color" @change="drawMap"></setting-color>
                        </div>
                    </div>
                </dd>
            </dl>
            <echart-title></echart-title>
            <echart-subtitle></echart-subtitle>
            <layer-position></layer-position>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>

<script>
    import { mapGetters } from 'vuex';
    // import settingNumber from '../../../components/setting-number.vue';
    // import settingText from '../../../components/setting-text.vue';
    import settingColor from '../../../components/setting-color.vue';
    import layerPosition from '../../../components/layer-position.vue';
    import echartTitle from '../../../components/echart-title.vue';
    import echartSubtitle from '../../../components/echart-subtitle.vue';
    import vueAddress from '../../../components/vueAddress/vueAddress.vue';

    export default{
        data () {
            const activeLayer = this.$store.state.screen.activeLayer;
            return {
                // mapList : mapData.province,
                baseStyle : [
                    {'value': 'normal', 'name': '默认地图样式'},
                    {'value': 'light', 'name': '清新蓝风格'},
                    {'value': 'dark', 'name': '黑夜风格'},
                    {'value': 'googlelite', 'name': '精简风格'},
                    {'value': 'grassgreen', 'name': '自然绿风格'},
                    {'value': 'midnight', 'name': '午夜蓝风格'},
                    {'value': 'grayscale', 'name': '高端灰风格'},
                    {'value': 'hardedge', 'name': '强边界风格'}
                ],
                brushType: ['fill', 'stroke'],
                overallOpen : true,
                titleOpen : false,
                subtitleOpen : false,
                legendOpen : false,
                xOpen : true,
                sOpen : false,
                bOpen: false,
                chartMsg : activeLayer.chartMsg,
                bubbleList: []
            };
        },

        computed: {
            ...mapGetters(['activeLayer'])
        },

        watch:{
            activeLayer () {
                this.chartMsg = this.$store.state.screen.activeLayer.chartMsg;
            }
        },

        components: {/* settingNumber,settingText,*/settingColor,layerPosition,vueAddress,echartTitle,echartSubtitle},

        methods:{
            deleteBubble (item) {
                const index = this.chartMsg.individuationSerise.indexOf(item);
                this.chartMsg.individuationSerise.splice(index, 1);
                this.$events.emit('redraw_chart');
            },
            drawMap () {
                this.$events.emit('redraw_chart');
            },
            changeAddress (address) {
                this.chartMsg.bmap.boundary = address;
                this.drawMap();
            },
            updateChart () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$store.commit('triggerChartCallback');
            }
        }
    };

</script>

<style>
    .f-r {
        float: right;
    }
    .b-t {
        border-top: 1px solid #ddd;
    }
    #echartBmap #m-setting{
        overflow: initial;
        overflow-x: initial;
    }
    #echartBmap .color .right>div {
        padding-left: 7px;
    }
    
    #echartBmap .map-scale {
        margin-left: 30px;
        margin-right: 30px;
    }
    #echartBmap .el-slider__button-wrapper {
        top: -20px;
    }
    #echartBmap .el-slider__runway.show-input {
        margin-right: 80px;
    }
    #echartBmap .el-slider__input {
        margin-top: -3px;
    }
    #echartBmap .el-input-number--small {
        width: 60px;
    }
    #echartBmap .el-input-number--small .el-input__inner {
        padding-right: 0;
        width: 60px;
        border-radius: 0;
    }
    .big-nav span.el-checkbox__input ,
    .big-nav span.el-checkbox__inner{
        display: inline-block;
        float: none;
    }
    /*#echartBmap .el-slider__input {
        float: none;
    }*/
    /*#echartBmap .map-scale input{
        width: 30px;
        border: 1px solid #e7e7e7;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        padding-left: 5px;
        outline: 0;
        box-shadow: none;
        color: #333;
    }*/
    .m-setting .right.mr-30 {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>