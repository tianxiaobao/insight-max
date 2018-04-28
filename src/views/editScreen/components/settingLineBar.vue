<template>
<div class="setting">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>基本折线柱图</h3></dt>
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
                <dt><a href="#" @click.prevent="titleOpen = !titleOpen"><b class="unfold"></b><h3>主标题</h3></a>
                </dt>
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
                <dt><a href="#" @click.prevent="xOpen = !xOpen"><b class="unfold"></b><h3>X轴</h3></a><div class="fun-show" @click.stop="isShow(chartMsg.xAxis,'visible')"><i class="check" :class="{checked: chartMsg.xAxis.visible}"></i>显示</div>
                </dt>

                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">

                        <setting-number name="文本字号" v-model="chartMsg.xAxis.labels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.xAxis.labels.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="轴线宽度" v-model="chartMsg.xAxis.lineWidth" @change="updateChart()"></setting-number>

                        <setting-color name="轴线颜色" v-model="chartMsg.xAxis.lineColor" @change="updateChart()"></setting-color>
                    </div>

                   <div class="big-rule-box m-setting">
                       <h3>标题</h3>
                         <setting-text name="标题名称" v-model="chartMsg.xAxis.title.text" @change="updateChart()"></setting-text>
                         <setting-number name="字号" v-model="chartMsg.xAxis.title.style.fontSize" @change="updateChart()"></setting-number>
                         <setting-color name="颜色" v-model="chartMsg.xAxis.title.style.color" @change="updateChart()"></setting-color>
                         <part-position :position="chartMsg.xAxis.title" v-on:updatePositon="updateChart()"></part-position>
                   </div>

                </dd>
            </dl>

            <dl>
                <dt><a href="#" @click.prevent="yOpen = !yOpen"><b class="unfold"></b><h3>Y1轴</h3></a><div class="fun-show" @click.stop="isShow(chartMsg.yAxis[0],'visible')"><i class="check" :class="{checked: chartMsg.yAxis[0].visible}"></i>显示</div></dt>

                <dd :class="{ open: yOpen }">
                    <div class="big-rule-box m-setting">

                        <setting-number name="文本字号" v-model="chartMsg.yAxis[0].labels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.yAxis[0].labels.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="轴线宽度" v-model="chartMsg.yAxis[0].lineWidth" @change="updateChart()"></setting-number>

                        <setting-color name="轴线颜色" v-model="chartMsg.yAxis[0].lineColor" @change="updateChart()"></setting-color>
                    </div>

                   <div class="big-rule-box m-setting">
                       <h3>标题</h3>

                       <setting-text name="标题名称" v-model="chartMsg.yAxis[0].title.text" @change="updateChart()"></setting-text>
                       <setting-number name="字号" v-model="chartMsg.yAxis[0].title.style.fontSize" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis[0].title.style.color" @change="updateChart()"></setting-color>
                       <part-position :position="chartMsg.yAxis[0].title" v-on:updatePositon="updateChart()"></part-position>
                   </div>

                   <div class="big-rule-box m-setting">
                       <h3>辅助线</h3> 
                       <setting-number name="数值" v-model="chartMsg.yAxis[0].plotLines[0].value" @change="updateChart()"></setting-number>
                       <setting-number name="线宽" v-model="chartMsg.yAxis[0].plotLines[0].width" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis[0].plotLines[0].color" @change="updateChart()"></setting-color>
                   </div>

                   <div class="big-rule-box m-setting">
                       <h3>网格线</h3>
                       <setting-number name="线宽" v-model="chartMsg.yAxis[0].gridLineWidth" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis[0].gridLineColor" @change="updateChart()"></setting-color>
                   </div>
                </dd>
            </dl>

            <dl>
                <dt><a href="#" @click.prevent="y1Open = !y1Open"><b class="unfold"></b><h3>Y2轴</h3></a><div class="fun-show" @click.stop="isShow(chartMsg.yAxis[1],'visible')"><i class="check" :class="{checked: chartMsg.yAxis[1].visible}"></i>显示</div></dt>

                <dd :class="{ open: y1Open }">
                    <div class="big-rule-box m-setting">

                        <setting-number name="文本字号" v-model="chartMsg.yAxis[1].labels.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.yAxis[1].labels.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="轴线宽度" v-model="chartMsg.yAxis[1].lineWidth" @change="updateChart()"></setting-number>

                        <setting-color name="轴线颜色" v-model="chartMsg.yAxis[1].lineColor" @change="updateChart()"></setting-color>
                    </div>

                   <div class="big-rule-box m-setting">
                       <h3>标题</h3>

                       <setting-text name="标题名称" v-model="chartMsg.yAxis[1].title.text" @change="updateChart()"></setting-text>
                       <setting-number name="字号" v-model="chartMsg.yAxis[1].title.style.fontSize" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis[1].title.style.color" @change="updateChart()"></setting-color>
                       <part-position :position="chartMsg.yAxis[1].title" v-on:updatePositon="updateChart()"></part-position>
                   </div>
                    <div class="big-rule-box m-setting">
                       <h3>辅助线</h3> 
                       <setting-number name="数值" v-model="chartMsg.yAxis[1].plotLines[0].value" @change="updateChart()"></setting-number>
                       <setting-number name="线宽" v-model="chartMsg.yAxis[1].plotLines[0].width" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis[1].plotLines[0].color" @change="updateChart()"></setting-color>
                   </div>
                   <div class="big-rule-box m-setting">
                       <h3>网格线</h3>
                       <setting-number name="线宽" v-model="chartMsg.yAxis[1].gridLineWidth" @change="updateChart()"></setting-number>
                       <setting-color name="颜色" v-model="chartMsg.yAxis[1].gridLineColor" @change="updateChart()"></setting-color>
                   </div>
                </dd>
            </dl>

            <dl>
                <dt><a href="#" @click.prevent="legendOpen = !legendOpen"><b class="unfold"></b><h3>图例</h3></a><div class="fun-show" @click.stop="isShow(chartMsg.legend,'enabled')"><i class="check" :class="{checked: chartMsg.legend.enabled}"></i>显示</div></dt>

                <dd :class="{ open: legendOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-number name="文本字号" v-model="chartMsg.legend.itemStyle.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="文本颜色" v-model="chartMsg.legend.itemStyle.color" @change="updateChart()"></setting-color>
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
                    <div v-for="(item,index) in chartMsg.s" :class="{'g-series': index != chartMsg.s.length-1}">
                       <div class="big-rule-box m-setting">
                           <h3>系列{{index + 1}}  <a href="#" @click.prevent="removeSeries(index)" class="u-deleteseries">删除</a></h3>
                           <setting-text name="系列值" v-model="item['column'].value" @change="updateSeries()"></setting-text>
                            <h3>柱子</h3>
                           <setting-text name="系列名" v-model="item['column'].name" @change="updateSeries()"></setting-text>
                       </div>

                       <div class="big-rule-box m-setting">
                           <setting-color name="边框颜色" v-model="item['column'].borderColor" @change="updateSeries()"></setting-color>
                           <setting-number name="边框宽度" v-model="item['column'].borderWidth" @change="updateSeries()"></setting-number>
                           <setting-color name="柱图颜色" v-model="item['column'].color" @change="updateSeries()"></setting-color>
                           <setting-number name="柱图宽度" v-model="item['column'].pointWidth" @change="updateSeries()"></setting-number>
                           <h3>数据标签</h3>
                            <div class="item clearfloat">
                                <span class="left">显示数值</span>
                                <div class="right">
                                   <i @click="setDataLabels(item['column'].dataLabels)" class="check" :class="{checked: item['column'].dataLabels.enabled}"></i>
                                </div>
                            </div>
                            <setting-number name="字号" v-model="item['column'].dataLabels.style.fontSize" @change="updateSeries()"></setting-number>
                            <setting-color name="颜色" v-model="item['column'].dataLabels.color" @change="updateSeries()"></setting-color>
                       </div>

                       <div class="big-rule-box m-setting">
                            <h3>折线</h3>
                           <setting-text name="系列名" v-model="item['line'].name" @change="updateSeries()"></setting-text>

                           <setting-color name="颜色" v-model="item['line'].color" @change="updateSeries()"></setting-color>
                           <div class="item clearfloat">
                                <span class="left">样式</span>
                                <div class="right">
                                    <select class="u-select w100" v-model="item['line'].dashStyle" @change="updateSeries()">
                                        <option v-for="item2 in dashStyle" :value="item2">{{item2}}</option>
                                    </select>
                                </div>
                            </div>
                            <setting-number name="粗细" v-model="item['line'].lineWidth" @change="updateSeries()"></setting-number>
                            <div class="item clearfloat">
                                <span class="left">近曲线</span>
                                <div class="right">
                                   <i @click="setChartType(item['line'])" class="check" :class="{checked: item['line'].type == 'spline'}"></i>
                                </div>
                            </div>
                           <h3>圆点</h3>
                            <setting-color name="颜色" v-model="item['line'].marker.fillColor" @change="updateSeries()"></setting-color>
                            <setting-number name="半径" v-model="item['line'].marker.radius" @change="updateSeries()"></setting-number>
                            <h3>数据标签</h3>
                            <div class="item clearfloat">
                                <span class="left">显示数值</span>
                                <div class="right">
                                   <i @click="setDataLabels(item['line'].dataLabels)" class="check" :class="{checked: item['line'].dataLabels.enabled}"></i>
                                </div>
                            </div>
                            <setting-number name="字号" v-model="item['line'].dataLabels.style.fontSize" @change="updateSeries()"></setting-number>
                            <setting-color name="颜色" v-model="item['line'].dataLabels.color" @change="updateSeries()"></setting-color>
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
            const activeLayer = this.$store.state.screen.activeLayer;
            return {
                dashStyle : [
                    'Solid',
                    'ShortDash',
                    'ShortDot',
                    'ShortDashDot',
                    'ShortDashDotDot',
                    'Dot',
                    'Dash',
                    'LongDash',
                    'DashDot',
                    'LongDashDot',
                    'LongDashDotDot'
                ],
                overallOpen : true,
                titleOpen : false,
                subtitleOpen : false,
                legendOpen : false,
                xOpen : false,
                yOpen : false,
                y1Open : false,
                sOpen : false,
                chartMsg : activeLayer.chartMsg
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

            "activeLayer.chartMsg.s":function (v) {
                this.chartMsg.s = v;
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
                const s = this.chartMsg.extra.series;
                const series = this.chartMsg.s;
                const len = series.length;
                const msg = $.extend(true, {}, s);
                msg.name = "系列" + (len + 1);
                series.push(msg);
                this.updateSeries();
            },

            removeSeries (index) {
                const s = this.chartMsg.s;
                s.splice(index, 1 );
                this.updateSeries();
            },
            // 显示坐标轴
            isShow (obj,key) {
                obj[key] = !obj[key];
                this.updateChart();
            },
            // 设置近曲线
            setChartType (item) {
                if(item.type == 'line') {
                    item.type = 'spline';
                }else{
                    item.type = 'line';
                }
                this.updateSeries();
            },
            // 设置显示数值
            setDataLabels (item) {
                item.enabled = !item.enabled;
                this.updateSeries();
            }
        }
    };
</script>