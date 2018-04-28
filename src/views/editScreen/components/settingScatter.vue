<template>
    <div class="setting">
        <div class="big-buildCon" id="con-detail-1">
            <div class="big-nav">
                <dl class="fore">
                    <dt><h3>散点图</h3></dt>
                </dl>
                <dl class="style-item">
                    <dt><b class="unfold"></b><h3>图表</h3></dt>
                    <dd>
                        <div class="big-rule-box m-setting">
                            <setting-color name="背景颜色" v-model="chartMsg.chart.backgroundColor" @change="updateChart"></setting-color>
                        </div>
                        <div class="big-rule-box m-setting">
                            <setting-color name="边框颜色" v-model="chartMsg.chart.borderColor" @change="updateChart"></setting-color>
                        </div>
                        <div class="big-rule-box m-setting">
                            <setting-number name="边框宽度" v-model="chartMsg.chart.borderWidth" @change="updateChart"></setting-number>
                        </div>

                        <div class="big-rule-box m-setting">
                        <h3>边距</h3>
                            <setting-number name="顶部" v-model="chartMsg.chart.marginTop" @change="updateChart"></setting-number>
                            <setting-number name="底部" v-model="chartMsg.chart.marginBottom" @change="updateChart"></setting-number>
                            <setting-number name="左侧" v-model="chartMsg.chart.marginLeft" @change="updateChart"></setting-number>
                            <setting-number name="右侧" v-model="chartMsg.chart.marginRight" @change="updateChart"></setting-number>
                        </div>
                    </dd>
                </dl>

                <dl class="style-item">
                    <dt><b class="unfold close"></b><h3>主标题</h3></dt>
                    <dd>
                        <div class="big-rule-box m-setting">
                            <setting-text name="标题名称" v-model="titleText" @change="updateTitle"></setting-text>
                            <setting-number name="字号" v-model="chartMsg.title.style.fontSize" @change="updateChart"></setting-number>
                            <setting-color name="颜色" v-model="chartMsg.title.style.color" @change="updateChart"></setting-color>
                            <div class="item coordinate cl">
                                <div class="fl mr10"> 位置 </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.title.x" @change="updateChart">
                                    <div class="center">横坐标</div>
                                </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.title.y" @change="updateChart">
                                    <div class="center">纵坐标</div>
                                </div>
                            </div>
                        </div>
                    </dd>
                </dl>

                <dl class="style-item">
                    <dt><b class="unfold close"></b><h3>副标题</h3></dt>
                    <dd>
                        <div class="big-rule-box m-setting">
                            <setting-text name="标题名称" v-model="titleSubtext" @change="updateSubTitle"></setting-text>
                            <setting-number name="字号" v-model="chartMsg.subtitle.style.fontSize" @change="updateChart"></setting-number>
                            <setting-color name="颜色" v-model="chartMsg.subtitle.style.color" @change="updateChart"></setting-color>
                            <div class="item coordinate cl">
                                <div class="fl mr10"> 位置 </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.subtitle.x" @change="updateChart">
                                    <div class="center">横坐标</div>
                                </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.subtitle.y" @change="updateChart">
                                    <div class="center">纵坐标</div>
                                </div>
                            </div>
                        </div>
                    </dd>
                </dl>

                <dl class="style-item">
                    <dt>
                        <b class="unfold close"></b><h3>X轴</h3>
                        <div class="fun-show" @click.stop="xAxisShow"><i class="check" :class="{checked: chartMsg.xAxis.visible}"></i>显示</div>
                    </dt>
                    <dd>
                        <div class="big-rule-box m-setting" v-show="chartMsg.xAxis.visible">
                            <setting-number name="文本字号" v-model="chartMsg.xAxis.labels.style.fontSize" @change="updateChart"></setting-number>
                            <setting-color name="文本颜色" v-model="chartMsg.xAxis.labels.style.color" @change="updateChart"></setting-color>
                            <setting-color name="轴线颜色" v-model="chartMsg.xAxis.lineColor" @change="updateChart"></setting-color>
                            <setting-number name="轴线宽度" v-model="chartMsg.xAxis.lineWidth" @change="updateChart"></setting-number>

                            <h3>标题</h3>
                            <setting-text name="标题名称" v-model="xAxisTitle" @change="updateXaxisTitle"></setting-text>
                            <setting-number name="字号" v-model="chartMsg.xAxis.title.style.fontSize" @change="updateChart"></setting-number>
                            <setting-color name="颜色" v-model="chartMsg.xAxis.title.style.color" @change="updateChart"></setting-color>
                            <div class="item coordinate cl">
                                <div class="fl mr10"> 位置 </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.xAxis.title.x" @change="updateChart">
                                    <div class="center">横坐标</div>
                                </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.xAxis.title.y" @change="updateChart">
                                    <div class="center">纵坐标</div>
                                </div>
                            </div>
                        </div>
                    </dd>
                </dl>

                <dl class="style-item">
                    <dt>
                        <b class="unfold close"></b><h3>Y轴</h3>
                        <div class="fun-show" @click.stop="yAxisShow"><i class="check" :class="{checked: chartMsg.yAxis.visible}"></i>显示</div>
                    </dt>
                    <dd>
                        <div class="big-rule-box m-setting" v-show="chartMsg.yAxis.visible">
                            <setting-number name="文本字号" v-model="chartMsg.yAxis.labels.style.fontSize" @change="updateChart"></setting-number>
                            <setting-color name="文本颜色" v-model="chartMsg.yAxis.labels.style.color" @change="updateChart"></setting-color>
                            <setting-color name="轴线颜色" v-model="chartMsg.yAxis.lineColor" @change="updateChart"></setting-color>
                            <setting-number name="轴线宽度" v-model="chartMsg.yAxis.lineWidth" @change="updateChart"></setting-number>

                            <h3>标题</h3>
                            <setting-text name="标题名称" v-model="yAxisTitle" @change="updateYaxisTitle"></setting-text>
                            <setting-number name="字号" v-model="chartMsg.yAxis.title.style.fontSize" @change="updateChart"></setting-number>
                            <setting-color name="颜色" v-model="chartMsg.yAxis.title.style.color" @change="updateChart"></setting-color>
                            <div class="item coordinate cl">
                                <div class="fl mr10"> 位置 </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.yAxis.title.x" @change="updateChart">
                                    <div class="center">横坐标</div>
                                </div>
                                <div class="fl mr10">
                                    <input type="number" v-model.number="chartMsg.yAxis.title.y" @change="updateChart">
                                    <div class="center">纵坐标</div>
                                </div>
                            </div>

                            <h3>网格线</h3>
                            <setting-number name="线宽" v-model="chartMsg.yAxis.gridLineWidth" @change="updateChart"></setting-number>
                            <setting-color name="颜色" v-model="chartMsg.yAxis.gridLineColor" @change="updateChart"></setting-color>
                        </div>
                    </dd>
                </dl>

                <dl class="style-item">
                    <dt>
                        <b class="unfold close"></b><h3>图例</h3>
                        <div class="fun-show" @click.stop="showInLegend"><i class="check" :class="{checked: chartMsg.plotOptions.scatter.showInLegend}"></i>显示</div>
                    </dt>
                    <dd>
                        <div v-if="chartMsg.plotOptions.scatter.showInLegend">
                           <!--  <div class="big-rule-box m-setting clearfloat">
                                <div class="fl radio-box">水平对齐</div>
                                <div class="fl radio-box" @click="legendAlign('left')"><i class="radio mr5 " :class="{'radio-check': legend.align === 'left'}"></i>左</div>
                                <div class="fl radio-box" @click="legendAlign('center')"><i class="radio mr5" :class="{'radio-check': legend.align === 'center'}"></i>中</div>
                                <div class="fl radio-box" @click="legendAlign('right')"><i class="radio mr5" :class="{'radio-check': legend.align === 'right'}"></i>右</div>
                            </div>

                            <div class="big-rule-box m-setting clearfloat">
                                <div class="fl radio-box">垂直对齐</div>
                                <div class="fl radio-box" @click="legendVertical('top')"><i class="radio mr5" :class="{'radio-check': legend.verticalAlign === 'top'}"></i>上</div>
                                <div class="fl radio-box" @click="legendVertical('middle')"><i class="radio mr5" :class="{'radio-check': legend.verticalAlign === 'middle'}"></i>中</div>
                                <div class="fl radio-box" @click="legendVertical('bottom')"><i class="radio mr5" :class="{'radio-check': legend.verticalAlign === 'bottom'}"></i>下</div>
                            </div> -->
                            <div class="big-rule-box m-setting">
                                <setting-number name="字号" v-model="chartMsg.legend.itemStyle.fontSize" @change="updateChart"></setting-number>
                                <setting-color name="颜色" v-model="chartMsg.legend.itemStyle.color" @change="updateChart"></setting-color>
                                <setting-color name="背景颜色" v-model="chartMsg.legend.backgroundColor" @change="updateChart"></setting-color>
                                <setting-number name="边框宽度" v-model="chartMsg.legend.borderWidth" @change="updateChart"></setting-number>
                                <setting-color name="边框颜色" v-model="chartMsg.legend.borderColor" @change="updateChart"></setting-color>
                            </div>
                            <div class="big-rule-box m-setting">
                               <legend-orientation @updatePositon = "updateOrientation"></legend-orientation>
                            </div>
                            <div class="big-rule-box m-setting">
                               <part-position :position="chartMsg.legend" v-on:updatePositon="updateChart()"></part-position>
                            </div>
                        </div>
                    </dd>
                </dl>

                <dl class="style-item">
                    <dt>
                        <b class="unfold close"></b><h3>数据系列</h3>
                        <div class="fun-show"><a href="" @click.stop.prevent="addSerie">添加</a></div>
                    </dt>
                    <dd>
                        <div class="big-rule-box m-setting" v-for="(data, index) of chartMsg.s">
                            <div class="delete-wrap">系列{{index + 1}} <a href="" @click.prevent="removeSerie(index)">删除</a></div>
                            <setting-text name="系列值" v-model="data.value" @change="updateSeries"></setting-text>
                            <setting-text name="系列名" v-model="data.name" @change="updateSeries"></setting-text>
                            <setting-color name="填充颜色" v-model="data.marker.fillColor" @change="updateSeries"></setting-color>
                        </div>
                    </dd>
                </dl>

                <!-- 图表位置 -->
                <dl class="style-item">
                    <dt>
                        <b class="unfold close"></b><h3>图表位置</h3>
                    </dt>
                    <dd>
                        <div class="big-rule-box m-setting clearfloat chart-set-css">
                            <div class="tit fl">图表尺寸</div>
                            <div class="item fl">
                                <input type="number" min="0" v-model="chart.width" @click="setChartW" @change="setChartW">
                                <div class="tt">宽度</div>
                            </div>
                            <div class="item fl">
                                <input type="number"  min="0" v-model="chart.height"  @click="setChartH" @change="setChartH">
                                <div class="tt">高度</div>
                            </div>
                        </div>

                        <div class="big-rule-box m-setting clearfloat chart-set-css">
                            <div class="tit fl">图表位置</div>
                            <div class="item fl">
                                <input type="number" min="0" v-model="chart.x" @click="setChartX" @change="setChartX">
                                <div class="tt">X坐标</div>
                            </div>
                            <div class="item fl">
                                <input type="number"  min="0" v-model="chart.y"  @click="setChartY" @change="setChartY">
                                <div class="tt">Y坐标</div>
                            </div>
                        </div>
                    </dd>
                </dl>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import regs from '@/utils/regs';
import scatter from '@/store/modules/defaultFormat/scatter';
import settingColor from '@/components/setting-color.vue';
import settingNumber from '@/components/setting-number.vue';
import settingText from '@/components/setting-text.vue';
import legendOrientation from '../../../components/legend-orientation.vue';
import partPosition from '../../../components/part-position.vue';

export default {
    name: 'scatter',
    components: {
        settingColor,
        settingNumber,
        settingText,
        legendOrientation,
        partPosition
    },
    data () {
        return {
            chartMsg: {},
            titleText: '',
            titleSubtext: '',
            xAxisTitle: '',
            yAxisTitle: '',
            plotLines: {
                value: 0,
                width: 0,
                color: ''
            },
            legend: {
                align: '',
                verticalAlign: ''
            },
            size: {
                max: '',
                min: ''
            },
            chart: {width: 0, height: 0, x: 0, y: 0 }
        };
    },
    computed: {
        ...mapGetters(['layers','activeLayer'])
    },
    created () {
        this.initChartMsg(this.activeLayer.chartMsg);
    },
    mounted () {
        this.$nextTick(() => {
            this.titleText = regs.escapeHtml(this.chartMsg.title.text);
            this.titleSubtext = regs.escapeHtml(this.chartMsg.subtitle.text);
            this.xAxisTitle = regs.escapeHtml(this.chartMsg.xAxis.title.text);
            this.yAxisTitle = regs.escapeHtml(this.chartMsg.yAxis.title.text);
            this.chart.width = parseInt(this.activeLayer.width);
            this.chart.height = parseInt(this.activeLayer.height);
            this.chart.x = parseInt(this.activeLayer.x);
            this.chart.y = parseInt(this.activeLayer.y);
            this.toggleItem();
        });
    },
    watch: {
        layers () {
            this.initChartMsg({});
        },
        activeLayer (n) {
            this.initChartMsg(n.chartMsg);
        },
        'activeLayer.width': function (n) {
            this.chart.width = parseInt(n);
        },
        'activeLayer.height': function (n) {
            this.chart.height = parseInt(n);
        },
        'activeLayer.x': function (n) {
            this.chart.x = parseInt(n);
        },
        'activeLayer.y': function (n) {
            this.chart.y = parseInt(n);
        }
    },
    methods: {
        initChartMsg (chartMsg) {
            this.chartMsg = $.extend(true, {}, scatter[0].chartMsg, chartMsg);
        },
        updateChart () {
            this.$store.commit('setChartMsg',this.chartMsg);
            this.$events.emit('update_chart');
        },
        toggleItem () {
            const $styleItem = $('.style-item');

            $styleItem.each((i, item) => {
                const $dt = $(item).find('dt');
                const $dd = $(item).find('dd');
                const $b = $dt.children('b');
                if($b.hasClass('close')) {
                    $dd.css({display: 'none'});
                } else {
                    $dd.css({display: 'block'});
                }
            });
            $styleItem.on('click', 'dt', function () {
                $(this).find('b').toggleClass('close');
                $(this).siblings('dd').toggle();
            });
        },
        updateTitle () {
            this.chartMsg.title.text = regs.htmlEscape(this.titleText);
            this.updateChart();
        },
        updateSubTitle () {
            this.chartMsg.subtitle.text = regs.htmlEscape(this.titleSubtext);
            this.updateChart();
        },
        xAxisShow () {
            this.chartMsg.xAxis.visible = !this.chartMsg.xAxis.visible;
            this.updateChart();
        },
        yAxisShow () {
            this.chartMsg.yAxis.visible = !this.chartMsg.yAxis.visible;
            this.updateChart();
        },
        updateXaxisTitle () {
            this.chartMsg.xAxis.title.text = regs.htmlEscape(this.xAxisTitle);
            this.updateChart();
        },
        updateYaxisTitle () {
            this.chartMsg.yAxis.title.text = regs.htmlEscape(this.yAxisTitle);
            this.updateChart();
        },
        addPlotLine () {
            const plotId = this.activeLayer.id;
            const chart = this.activeLayer.chart.yAxis[0];
            const plotLine = this.chartMsg.yplotLine;

            chart.removePlotLine(plotId);
            chart.addPlotLine({
                value: plotLine.value,
                color: plotLine.color,
                width: plotLine.width,
                id: plotId
            });
        },
        updatePlotLines () {
            this.updateChart();
            this.addPlotLine();
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
        showInLegend () {
            this.chartMsg.plotOptions.scatter.showInLegend = !this.chartMsg.plotOptions.scatter.showInLegend;
            this.updateChart();
        },
        setChartW () {
            this.activeLayer.width = this.chart.width;
            this.$nextTick(() => {
                this.$events.emit('redraw_chart');
            });
        },
        setChartH () {
            this.activeLayer.height = this.chart.height;
            this.$nextTick(() => {
                this.$events.emit('redraw_chart');
            });
        },
        setChartX () {
            this.activeLayer.x = this.chart.x;
            this.$nextTick(() => {
                this.$events.emit('redraw_chart');
            });
        },
        setChartY () {
            this.activeLayer.y = this.chart.y;
            this.$nextTick(() => {
                this.$events.emit('redraw_chart');
            });
        },
        getRandomColor () {
            return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        },
        addSerie () {
            const chart = this.activeLayer.chart;
            const index = chart.series.length + 1;
            let serieData = [], serieOpt = null;
            const color = this.getRandomColor();

            if(this.chartMsg.series.length === 0) {
                serieData = scatter[0].sourceData.sData;
            }
            serieOpt = {
                value: index,
                name: `数据列${index}`,
                marker: {
                    fillColor: color,
                    lineColor: color
                },
                data: serieData
            };
            chart.addSeries(serieOpt, false);
            this.chartMsg.s.push(serieOpt);
            this.updateChart();
            this.$events.emit('redraw_chart');
        },
        removeSerie (index) {
            if (this.chartMsg.series.length) {
                this.chartMsg.series.splice(index, 1);
                this.chartMsg.s.splice(index, 1);
                this.updateChart();
            }
        },
        updateSeries () {
            this.$store.commit('setChartMsg', this.chartMsg);
            this.$events.emit('redraw_chart');
        }
    }

};
</script>
