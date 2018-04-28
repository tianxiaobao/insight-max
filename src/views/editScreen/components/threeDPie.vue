<template>
<div class="setting">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>{{activeLayer.name}}</h3></dt>
            </dl>
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="overallOpen = !overallOpen">
                        <b class="unfold"></b><h3>全局样式</h3>
                    </a>
                </dt>
                <dd :class="{ open: overallOpen }">
                    <div class="big-rule-box m-setting">
                        <h3>图表</h3>
                        <setting-color name="背景颜色" v-model="chartMsg.chart.backgroundColor" @change="updateChart()"></setting-color>
                        <setting-number name="边框宽度" v-model="chartMsg.chart.borderWidth" @change="updateChart()"></setting-number>
                        <setting-color name="边框颜色" v-model="chartMsg.chart.borderColor" @change="updateChart()"></setting-color>
                        <setting-number name="3D深度" v-model="chartMsg.plotOptions.pie.depth" @change="updateChart()"></setting-number>
                        <setting-number name="角度" v-model="chartMsg.chart.options3d.alpha" @change="updateChart()"></setting-number>
                    </div>
                    <div class="big-rule-box m-setting">
                        <h3>边距</h3>
                        <setting-number name="顶部" v-model="chartMsg.chart.marginTop" @change="updateChart()"></setting-number>
                        <setting-number name="底部" v-model="chartMsg.chart.marginBottom" @change="updateChart()"></setting-number>
                        <setting-number name="左侧" v-model="chartMsg.chart.marginLeft" @change="updateChart()"></setting-number>
                        <setting-number name="右侧" v-model="chartMsg.chart.marginRight" @change="updateChart()"></setting-number>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><a href="#" @click.prevent="titleOpen = !titleOpen"><b class="unfold"></b><h3>主标题</h3></a></dt>
                <dd :class="{ open: titleOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-text name="名称" v-model="chartMsg.title.text" @change="updateChart()"></setting-text>
                        <setting-number name="字号" v-model="chartMsg.title.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="颜色" v-model="chartMsg.title.style.color" @change="updateChart()"></setting-color>
                        <part-position :position="chartMsg.title" v-on:updatePositon="updateChart()"></part-position>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><a href="#" @click.prevent="subtitleOpen = !subtitleOpen"><b class="unfold"></b><h3>副标题</h3></a></dt>

                <dd :class="{ open: subtitleOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-text name="名称" v-model="chartMsg.subtitle.text" @change="updateChart()"></setting-text>
                        <setting-number name="字号" v-model="chartMsg.subtitle.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="颜色" v-model="chartMsg.subtitle.style.color" @change="updateChart()"></setting-color>
                        <part-position :position="chartMsg.subtitle" v-on:updatePositon="updateChart()"></part-position>
                    </div>
                </dd>
            </dl>
            <!-- 数据 -->
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="dataOpen = !dataOpen">
                        <b class="unfold"></b><h3>数据</h3>
                    </a>
                </dt>
                <dd :class="{ open: dataOpen }">
                    <div class="big-rule-box m-setting" v-for="(serie, index) of chartMsg.series[0].data">
                        <div class="item">
                            <span class="left">{{`系列${index+1}颜色`}}</span>
                            <div class="right">
                                <set-color :color="serie.color||''" :type="index" @change="updateDataSerie"></set-color>
                            </div>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><a href="#" @click.prevent="dataLabelOpen = !dataLabelOpen"><b class="unfold"></b><h3>数据标签</h3></a>
                <div class="fun-show" @click.stop="isShow(chartMsg.plotOptions.pie.dataLabels,'enabled')"><i class="check" :class="{checked: chartMsg.plotOptions.pie.dataLabels.enabled}"></i>显示</div>
                </dt>
                <dd :class="{ open: dataLabelOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-number name="字号" v-model="chartMsg.plotOptions.pie.dataLabels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="颜色" v-model="chartMsg.plotOptions.pie.dataLabels.style.color" @change="updateChart()"></setting-color>

                        <div class="big-rule-box m-setting">
                            <set-type :prop = "tipType" @change="updateType"></set-type>
                        </div>

                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">标签距中心</span>
                                <div class="right">
                                    <div class="slider-wrap">
                                        <el-slider v-model="chartMsg.plotOptions.pie.dataLabels.distance" :max="100" :min="-100" @change="updateChart"></el-slider>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">小数点数</span>
                                <div class="right">
                                    <div class="slider-wrap">
                                    <el-slider v-model="float" :max="9" :min="0" @change="updateFloat"></el-slider>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <a href="#" @click.prevent="legendOpen = !legendOpen"><b class="unfold"></b><h3>图例</h3></a>
                    <div class="fun-show" @click.stop="isShow(chartMsg.legend,'enabled')"><i class="check" :class="{checked: chartMsg.legend.enabled}"></i>显示</div>
                </dt>
                <dd :class="{ open: legendOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-number name="文本字号" v-model="chartMsg.legend.itemStyle.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.legend.itemStyle.color" @change="updateChart()"></setting-color>
                        <setting-color name="背景颜色" v-model="chartMsg.legend.backgroundColor" @change="updateChart()"></setting-color>
                        <setting-number name="边框宽度" v-model="chartMsg.legend.borderWidth" @change="updateChart()"></setting-number>
                        <setting-color name="边框颜色" v-model="chartMsg.legend.borderColor" @change="updateChart()"></setting-color>
                        <legend-orientation @updatePositon = "updateOrientation"></legend-orientation>
                        <part-position :position="chartMsg.legend" v-on:updatePositon="updateChart()"></part-position>
                    </div>
                </dd>
            </dl>
            <layer-position></layer-position>
        </div>
        <div class="clear"></div>
    </div>
</div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import settingNumber from '../../../components/setting-number.vue';
    import settingText from '../../../components/setting-text.vue';
    import settingColor from '../../../components/setting-color.vue';
    import setColor from '@/components/set-color.vue';
    import layerPosition from '../../../components/layer-position.vue';
    import partPosition from '../../../components/part-position.vue';
    import inputNumber from '@/components/input-number.vue';
    import setType from '@/components/setting-type.vue';
    import legendOrientation from '../../../components/legend-orientation.vue';

    export default{
        data () {
            return {
                overallOpen : true,
                titleOpen : false,
                subtitleOpen : false,
                legendOpen : false,
                dataLabelOpen : false,
                dataOpen : false,
                chartMsg : this.$store.state.screen.activeLayer.chartMsg,
                float: 1,
                tipType: {
                    title: '样式',
                    data:[
                    {key: 3, val: '两者'},
                    {key: 1, val: '类别'},
                    {key: 2, val: '资料值'}
                    ]
                },
                tipFlag:3,
                floatFloat: ''
            };
        },

        components: {settingNumber,settingColor,settingText,layerPosition,partPosition,setColor,inputNumber,setType,legendOrientation},

        computed: {
            ...mapGetters(['activeLayer'])
        },

        watch:{
            activeLayer () {
                this.chartMsg = this.$store.state.screen.activeLayer.chartMsg;
            },
            "activeLayer.chartMsg.extra.series":function (v) {
                this.chartMsg.extra.series = v;
            }
        },

        mounted () {
            this.$nextTick(() => {
                this.initData(this.chartMsg);
            });
        },
        methods:{
            initData (chartMsg) {
                chartMsg.series.forEach((item) => {
                    const serie = item.data;
                    serie.forEach((s) => {
                        const color = s.color || '';
                        s.color = color;
                    });
                });
                this.$forceUpdate();
            },
            updateChart () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$events.emit('update_chart');
            },
            updateSeries () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$events.emit('redraw_chart');
            },
            updateType (val) {
                this.tipFlag = parseInt(val);
                switch (parseInt(val)) {
                case 1: {
                    this.chartMsg.plotOptions.pie.dataLabels.format = `<b>{point.name}</b>`;
                    break;
                }
                case 2: {
                    this.chartMsg.plotOptions.pie.dataLabels.format = `<span>{point.percentage:.${this.floatFloat || 1}f}%</span>`;
                    break;
                }
                case 3: {
                    this.chartMsg.plotOptions.pie.dataLabels.format = `<b>{point.name}</b>: <span>{point.percentage:.${this.floatFloat || 1}f}%</span>`;
                    break;
                }
                }
                this.updateChart();
            },
            updateOrientation (val) {
                this.chartMsg.legend.x = 0;
                this.chartMsg.legend.y = 0;
                switch (parseInt(val)) {
                case 1: {
                    this.chartMsg.legend.align = "left";
                    this.chartMsg.legend.verticalAlign = "top";
                    this.chartMsg.legend.layout = "horizontal";
                    break;
                }
                case 2: {
                    this.chartMsg.legend.align = "left";
                    this.chartMsg.legend.verticalAlign = "bottom";
                    this.chartMsg.legend.layout = "horizontal";
                    break;
                }
                case 3: {
                    this.chartMsg.legend.align = "left";
                    this.chartMsg.legend.verticalAlign = "top";
                    this.chartMsg.legend.layout = "vertical";
                    break;
                }
                case 4: {
                    this.chartMsg.legend.align = "right";
                    this.chartMsg.legend.verticalAlign = "top";
                    this.chartMsg.legend.layout = "vertical";
                    break;
                }
                }
                this.updateChart();
            },
            updateFloat () {
                this.floatFloat = this.float;
                const value = this.float;
                switch (this.tipFlag) {
                case 1: break;
                case 2: {
                    this.chartMsg.plotOptions.pie.dataLabels.format = `<span>{point.percentage:.${value}f}%</span>`;
                    this.chartMsg.tooltip.valueDecimals = value;
                    this.updateChart();
                    break;
                }
                case 3: {
                    this.chartMsg.plotOptions.pie.dataLabels.format = `<b>{point.name}</b>: <span>{point.percentage:.${value}f}%</span>`;
                    this.chartMsg.tooltip.valueDecimals = value;
                    this.updateChart();
                    break;
                }
                }
            },
            addSeries () {
                const s = this.chartMsg.extra.defaultSeries;
                const series = this.chartMsg.extra.series;
                const len = series.length;
                const msg = $.extend(true, {}, s);
                msg.name = "系列" + (len + 1);
                series.push(msg);
                this.updateSeries();
            },

            removeSeries (index) {
                const s = this.chartMsg.extra.series;
                s.splice(index, 1 );

                this.updateSeries();
            },
            isShow (obj,key) {
                obj[key] = !obj[key];
                this.updateChart();
            },
            setDataLabels (item) {
                item.enabled = !item.enabled;

                this.updateSeries();
            },
            updateDataSerie (c) {
                this.chartMsg.series.forEach((item) => {
                    const serie = item.data;
                    serie[c.type].color = c.color;
                });
                this.updateChart();
            }
        }
    };

</script>
<style type="text/css">
    .big-rule-box.m-setting {
    line-height: 38px;
}
</style>