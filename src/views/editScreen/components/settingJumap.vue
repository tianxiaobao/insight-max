<template>
<div class="setting" id="jumap">
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
                                <select class="u-select w100" v-model="chartMsg.bmap.mapStyle" @change="drawMap">
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
                            :address="chartMsg.bmap.boundary.key"
                            @update:address="changeAddress">
                        </vue-address>
                        <!-- <div class="item clearfloat">
                            <span class="left">仅显示选中区域</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.bmap.showChecked" @change="drawMap"></el-checkbox>
                            </div>
                        </div> -->
                        <div class="item clearfloat">
                            <span class="left">透明度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="1"
                                    :min="0"
                                    :step="0.01"
                                    v-model="chartMsg.bmap.boundary.fillOpacity"
                                    @change="drawMap"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <setting-color name="边界颜色" v-model="chartMsg.bmap.boundary.strokeColor" @change="drawMap"></setting-color>
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
                                <el-checkbox v-model="chartMsg.bmap.ruler" @change="drawMap"></el-checkbox>
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
                                    v-model="chartMsg.style.scale"
                                    @change="drawMap"
                                    :max="2"
                                    :min="0"
                                    :step="0.1"
                                    show-input
                                    >
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">动效速度</span>
                            <div class="right mr-30">
                                <el-slider
                                    v-model="chartMsg.style.speed"
                                    @change="drawMap"
                                    :max="2"
                                    :min="0"
                                    :step="0.01"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">最大尺寸</span>
                            <div class="right mr-30">
                                <el-slider
                                    v-model="chartMsg.style.maxSize"
                                    @change="drawMap"
                                    :max="20"
                                    :min="1"
                                    :step="0.1"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">最小尺寸</span>
                            <div class="right mr-30">
                                <el-slider
                                    v-model="chartMsg.style.minSize"
                                    @change="drawMap"
                                    :max="5"
                                    :min="0"
                                    :step="0.1"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">气泡类型</span> <label class="f-r m-r pointer" @click="addBubbleStyle">+添加</label>
                        </div>
                        <div class="item clearfloat color" v-for="item,$index in chartMsg.bubbleStyle">
                            <div class="m-l-25">
                                气泡类型{{$index+1}} <label class="f-r m-r pointer" @click="deleteBubbleStyle(item)">删除</label>
                            </div>
                            <span class="left">KEY</span>
                            <input type="text" v-model="item.key" class="m-l-10" @change="drawMap">
                            <setting-color name="颜色" v-model="item.color" @change="drawMap"></setting-color>
                        </div>
                    </div>
                </dd>
            </dl>
            <jumap-title></jumap-title>
            <layer-position></layer-position>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import settingColor from '../../../components/setting-color.vue';
    import layerPosition from '../../../components/layer-position.vue';
    import jumapTitle from '../../../components/jumap-title.vue';
    import vueAddress from '../../../components/vueAddress/vueAddress.vue';

    export default{
        data () {
            const activeLayer = this.$store.state.screen.activeLayer;
            return {
                baseStyle : [
                    {'value': 'normal', 'name': '默认地图样式'},
                    {'value': 'waterDark', 'name': '经典黑风格'},
                    {'value': 'waterLight', 'name': '弱边界灰色风格'},
                    // {'value': 'light', 'name': '清新蓝风格'},
                    {'value': 'dark', 'name': '黑夜风格'},
                    {'value': 'googlelite', 'name': '精简风格'},
                    // {'value': 'grassgreen', 'name': '自然绿风格'},
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

        components: {settingColor,layerPosition,vueAddress,jumapTitle},

        methods:{
            addBubbleStyle () {
                this.chartMsg.bubbleStyle.push({key: '', color: '#FBF320'});
            },
            deleteBubbleStyle (item) {
                const index = this.chartMsg.bubbleStyle.indexOf(item);
                this.chartMsg.bubbleStyle.splice(index, 1);
                this.$events.emit('redraw_chart');
            },
            drawMap () {
                this.$events.emit('redraw_chart');
            },
            changeAddress (address) {
                this.chartMsg.bmap.boundary.key = address;
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
    .m-l-10 {
        margin-left: 10px;
    }
    .m-l-25 {
        margin-left: 25px;
    }
    .m-r {
        margin-right: 20px;
    }
    .f-r {
        float: right;
    }
    .b-t {
        border-top: 1px solid #ddd;
    }
    .pointer {
        cursor: pointer;
        color: #2aafff;
    }
    .pointer:hover {
        color: #51d2b7;
    }
    #jumap #m-setting{
        overflow: initial;
        overflow-x: initial;
    }
    #jumap .color .right>div {
        padding-left: 7px;
    }
    #jumap .map-scale {
        margin-left: 30px;
        margin-right: 30px;
    }
    #jumap .el-slider__button-wrapper {
        top: -20px;
    }
    #jumap .el-slider__runway.show-input {
        margin-right: 80px;
    }
    #jumap .el-input-number--small {
        width: 60px;
    }
    #jumap .el-input-number--small .el-input__inner {
        padding-right: 0;
        width: 60px;
        border-radius: 0;
    }
    .big-nav span.el-checkbox__input ,
    .big-nav span.el-checkbox__inner{
        display: inline-block;
        float: none;
    }
    .m-setting .right.mr-30 {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>