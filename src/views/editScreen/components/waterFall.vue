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
                <dt>
                    <a href="#" @click.prevent="titleOpen = !titleOpen">
                        <b class="unfold"></b>
                        <h3>主标题</h3>
                    </a>
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
                <dt>
                    <a href="#" @click.prevent="subtitleOpen = !subtitleOpen">
                        <b class="unfold"></b>
                        <h3>副标题</h3>
                    </a>
                </dt>
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
                    <a href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>X轴</h3>
                    </a>
                    <div class="fun-show" @click.stop="isShow(chartMsg.xAxis,'visible')">
                        <i class="check" :class="{checked: chartMsg.xAxis.visible}"></i>显示
                    </div>
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
                <dt>
                    <a href="#" @click.prevent="yOpen = !yOpen">
                        <b class="unfold"></b>
                        <h3>Y轴</h3>
                    </a>
                    <div class="fun-show" @click.stop="isShow(chartMsg.yAxis,'visible')">
                        <i class="check" :class="{checked: chartMsg.yAxis.visible}"></i>显示
                    </div>
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
                    <a href="#" @click.prevent="sOpen = !sOpen">
                        <b class="unfold"></b>
                        <h3>数据</h3>
                    </a>
                    <span class="u-addseries" @click.stop="addSeries">添加</span>
                </dt>
                <dd :class="{ open: sOpen }">
                    <div v-for="(item,index) in chartMsg.extra.series[0].data" :class="{'g-series': index != chartMsg.extra.series[0].data.length-1}">
                        <div class="big-rule-box m-setting">
                            <h3>数据{{index + 1}}
                                <a href="#" @click.prevent="removeSeries(index)" class="u-deleteseries">删除</a>
                            </h3>
                            <div style="position: relative;margin-left: 20px;">
                                <label @click="selectKind(item,'isY')" class="posAb">
                                    <i class="radio mr5" :class="{'radio-check': item.isY}"></i>
                                </label>
                                <setting-text name="数据映射" v-model="item.rName" @change="updateSeries()"></setting-text>
                                <div>
                                    <div class="wf-help"><div>isIntermediateSum: When this property is true, the points acts as a summary column for the values added or substracted since the last intermediate sum, or since the start of the series</div></div>
                                    <label @click="selectKind(item,'isIntermediateSum')">
                                        <i class="radio mr5" :class="{'radio-check': item.isIntermediateSum}"></i>isIntermediateSum
                                    </label>
                                </div>
                                <div>
                                    <div class="wf-help"><div>isSum: When this property is true, the point display the total sum across the entire series</div></div>
                                    <label @click="selectKind(item,'isSum')">
                                        <i class="radio mr5" :class="{'radio-check': item.isSum}"></i>isSum
                                    </label>
                                </div>
                            </div>
                           <setting-text name="数据名" v-model="item.name" @change="updateSeries()"></setting-text>
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

    export default{
        data () {
            return {
                overallOpen : true,
                titleOpen : false,
                subtitleOpen : false,
                xOpen : false,
                yOpen : false,
                sOpen : false,
                chartMsg : this.$store.state.screen.activeLayer.chartMsg
            };
        },

        components: {settingNumber,settingColor,settingText,layerPosition,partPosition},

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

            addSeries () {
                const s = this.chartMsg.extra.defaultSeries;
                const series = this.chartMsg.extra.series[0].data;
                const len = series.length;
                const msg = $.extend(true, {}, s);
                msg.name = "数据" + (len + 1);
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
            selectKind (item,kind) {
                item.isIntermediateSum = false;
                item.isSum = false;
                item.isY = false;
                item[kind] = true;
                this.updateSeries();
            }
        }
    };

</script>
<style>
    .posAb{
        position: absolute;
        z-index: 1;
    }
    .wf-help{
        display: inline-block;
        width: 20px;
        height: 20px;
        float: none;
        margin-right: 0;
        background: url(../../../../static/images/wenhao.png) no-repeat;
        vertical-align: middle;
        margin-top: -2px;
    }
    .wf-help div{
        position: absolute;
        width: 200px;
        left: 17px;
        background: #fff;
        color: #666;
        z-index: 1111;
        line-height: 20px;
        padding: 5px;
        border: 1px solid #ccc;
        word-break: break-all;
        display: none;
    }
    .wf-help:hover{
        cursor: pointer;
    }
    .wf-help:hover div{
        display: block;
    }
</style>
