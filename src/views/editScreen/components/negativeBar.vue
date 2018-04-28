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
                        <h3>边框</h3>
                        <setting-color name="背景颜色" v-model="chartMsg.chart.backgroundColor" @change="updateChart()"></setting-color>
                        <setting-number name="边框宽度" v-model="chartMsg.chart.borderWidth" @change="updateChart()"></setting-number>
                        <setting-color name="边框颜色" v-model="chartMsg.chart.borderColor" @change="updateChart()"></setting-color>
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

            <dl>
                <dt>
                    <a href="#" @click.prevent="xlOpen = !xlOpen"><b class="unfold"></b><h3>X轴(左)</h3></a>
                    <div class="fun-show" @click.stop="isShow(chartMsg.xAxis[0],'visible')"><i class="check" :class="{checked: chartMsg.xAxis[0].visible}"></i>显示</div>
                </dt>
                <dd :class="{ open: xlOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">轴反转</span>
                            <div class="right">
                            <i @click="reverseX(chartMsg.xAxis[0])" class="check" :class="{checked: chartMsg.xAxis[0].reversed}"></i>
                            </div>
                        </div>
                        <setting-number name="文本字号" v-model="chartMsg.xAxis[0].labels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.xAxis[0].labels.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="轴线宽度" v-model="chartMsg.xAxis[0].lineWidth" @change="updateChart()"></setting-number>
                        <setting-color name="轴线颜色" v-model="chartMsg.xAxis[0].lineColor" @change="updateChart()"></setting-color>
                    </div>
                   <div class="big-rule-box m-setting">
                       <h3>标题</h3>
                         <setting-text name="标题名称" v-model="chartMsg.xAxis[0].title.text" @change="updateChart()"></setting-text>
                         <setting-number name="字号" v-model="chartMsg.xAxis[0].title.style.fontSize" @change="updateChart()"></setting-number>
                         <setting-color name="颜色" v-model="chartMsg.xAxis[0].title.style.color" @change="updateChart()"></setting-color>
                         <part-position :position="chartMsg.xAxis[0].title" v-on:updatePositon="updateChart()"></part-position>
                   </div>
                </dd>
            </dl>

            <dl>
                <dt>
                    <a href="#" @click.prevent="xrOpen = !xrOpen"><b class="unfold"></b><h3>X轴(右)</h3></a>
                    <div class="fun-show" @click.stop="isShow(chartMsg.xAxis[1],'visible')"><i class="check" :class="{checked: chartMsg.xAxis[1].visible}"></i>显示</div>
                </dt>
                <dd :class="{ open: xrOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">轴反转</span>
                            <div class="right">
                            <i @click="reverseX(chartMsg.xAxis[1])" class="check" :class="{checked: chartMsg.xAxis[1].reversed}"></i>
                            </div>
                        </div>
                        <setting-number name="文本字号" v-model="chartMsg.xAxis[1].labels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.xAxis[1].labels.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="轴线宽度" v-model="chartMsg.xAxis[1].lineWidth" @change="updateChart()"></setting-number>
                        <setting-color name="轴线颜色" v-model="chartMsg.xAxis[1].lineColor" @change="updateChart()"></setting-color>
                    </div>
                   <div class="big-rule-box m-setting">
                       <h3>标题</h3>
                         <setting-text name="标题名称" v-model="chartMsg.xAxis[1].title.text" @change="updateChart()"></setting-text>
                         <setting-number name="字号" v-model="chartMsg.xAxis[1].title.style.fontSize" @change="updateChart()"></setting-number>
                         <setting-color name="颜色" v-model="chartMsg.xAxis[1].title.style.color" @change="updateChart()"></setting-color>
                         <part-position :position="chartMsg.xAxis[1].title" v-on:updatePositon="updateChart()"></part-position>
                   </div>
                </dd>
            </dl>

            <dl>
                <dt>
                    <a href="#" @click.prevent="yOpen = !yOpen"><b class="unfold"></b><h3>Y轴</h3></a>
                    <div class="fun-show" @click.stop="isShow(chartMsg.yAxis,'visible')"><i class="check" :class="{checked: chartMsg.yAxis.visible}"></i>显示</div>
                </dt>
                <dd :class="{ open: yOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-number name="文本字号" v-model="chartMsg.yAxis.labels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.yAxis.labels.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="轴线宽度" v-model="chartMsg.yAxis.lineWidth" @change="updateChart()"></setting-number>

                        <setting-color name="轴线颜色" v-model="chartMsg.yAxis.lineColor" @change="updateChart()"></setting-color>
                    </div>
                   <div class="big-rule-box m-setting">
                       <h3>标题</h3>
                       <setting-text name="标题名称" v-model="chartMsg.yAxis.title.text" @change="updateChart()"></setting-text>
                       <setting-number name="字号" v-model="chartMsg.yAxis.title.style.fontSize" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis.title.style.color" @change="updateChart()"></setting-color>
                       <part-position :position="chartMsg.yAxis.title" v-on:updatePositon="updateChart()"></part-position>
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

            <dl>
                <dt>
                    <a href="#" @click.prevent="sOpen = !sOpen">
                        <b class="unfold"></b>
                        <h3>数据系列</h3>
                    </a>
                    <span class="u-addseries" @click.stop="addSeries">添加</span>
                </dt>
                <dd :class="{ open: sOpen }">
                    <div v-for="(item,index) in chartMsg.extra.series" :class="{'g-series': index != chartMsg.extra.series.length-1}">
                       <div class="big-rule-box m-setting">
                           <h3>系列{{index + 1}}  <a href="#" @click.prevent="removeSeries(index)" class="u-deleteseries">删除</a></h3>
                           <setting-text name="系列值" v-model="item.value" @change="updateSeries()"></setting-text>
                           <setting-text name="系列名" v-model="item.name" @change="updateSeries()"></setting-text>
                           <setting-color name="颜色" v-model="item.color" @change="updateSeries()"></setting-color>
                       </div>
                       <div class="big-rule-box m-setting">
                           <h3>数据标签</h3>
                            <div class="item clearfloat">
                                <span class="left">显示数值</span>
                                <div class="right">
                                   <i @click="setDataLabels(item.dataLabels)" class="check" :class="{checked: item.dataLabels.enabled}"></i>
                                </div>
                            </div>
                            <setting-number name="字号" v-model="item.dataLabels.style.fontSize" @change="updateSeries()"></setting-number>
                            <setting-color name="颜色" v-model="item.dataLabels.color" @change="updateSeries()"></setting-color>
                       </div>
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
    import layerPosition from '../../../components/layer-position.vue';
    import partPosition from '../../../components/part-position.vue';
    import legendOrientation from '../../../components/legend-orientation.vue';

    export default{
        data () {
            return {
                overallOpen : true,
                titleOpen : false,
                subtitleOpen : false,
                legendOpen : false,
                xlOpen : false,
                xrOpen : false,
                yOpen : false,
                sOpen : false,
                chartMsg : this.$store.state.screen.activeLayer.chartMsg
            };
        },

        components: {settingNumber,settingColor,settingText,layerPosition,partPosition,legendOrientation},

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
        },
        methods:{
            updateChart () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$events.emit('update_chart');
            },
            updateSeries () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$events.emit('redraw_chart');
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
            // 反转x轴
            reverseX (item) {
                item.reversed = !item.reversed;
                this.updateSeries();
            }
        }
    };

</script>