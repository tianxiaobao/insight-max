<style lang="less" scoped>
    .m-setting {
        margin: 4px 0 7px 0;
    }
</style>
<template>
    <div class="setting">
        <div class="big-buildCon" id="con-detail-1">
            <div class="big-nav">
                <dl class="fore">
                    <dt><h3>通用标题</h3></dt>
                </dl>

                <dl class="style-item">
                    <dd>
                        <div class="big-rule-box m-setting">
                            
                            <setting-text name="标题名称" v-model="titleText" @change="updateTitle"></setting-text>
                        </div>
                    </dd>
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
                    </dd>
                </dl>
                <dl class="style-item">
                    <dt><b class="unfold close"></b><h3>文本样式</h3></dt>
                    <dd>
                        <div class="big-rule-box m-setting">
                            <setting-number name="字号" v-model="chartMsg.title.style.fontSize" @change="updateChart"></setting-number>
                        </div> 

                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">字体</span>
                                <div class="right">
                                    <select class="form-el" @change="updateFontFamily">
                                        <option v-for="opt of chartMsg.title.fontFamily" :value="opt">{{opt}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="big-rule-box m-setting">
                            <setting-color name="字体颜色" v-model="chartMsg.title.style.color" @change="updateChart"></setting-color>
                        </div>

                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">字体粗细</span>
                                <div class="right">
                                    <select class="form-el" @change="updateFontWeight">
                                        <option :value="opt" v-for="opt of chartMsg.title.fontWeightList">{{opt}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">对齐方式</span>
                                <div class="right">
                                    <select class="form-el" @change="updateAlign">
                                        <option v-for="opt of chartMsg.title.alignList" :value="opt.value">{{opt.name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>               
                    </dd>
                </dl>
                
                <dl class="style-item">
                    <dt><b class="unfold close"></b><h3>超链接设置</h3></dt>
                    <dd>
                        <div class="big-rule-box m-setting">
                            <setting-text name="链接地址" v-model="chartMsg.title.href" @change="updateChart"></setting-text>
                        </div>
                        <div class="big-rule-box m-setting">
                            <span class="left">新开窗口</span>
                            <div class="right">
                                <i class="check" :class="{'checked': chartMsg.title.blank}" @click="updateBlank"></i>
                            </div>
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
// import generalTitle from '@/store/modules/defaultFormat/general-title';
import settingColor from '@/components/setting-color.vue';
import settingNumber from '@/components/setting-number.vue';
import settingText from '@/components/setting-text.vue';

export default {
    name: 'general-title',
    components: {
        settingColor,
        settingNumber,
        settingText
    },
    data () {
        return {
            chartMsg: {},
            titleText: '',
            chart: {width: 0, height: 0, x: 0, y: 0 },
            fontWeight: ''
        };
    },
    computed: {
        ...mapGetters(['layers','activeLayer'])
    },
    created () {
        this.initChartMsg(this.activeLayer.chartMsg);
    },
    mounted () {
        this.titleText = regs.escapeHtml(this.chartMsg.title.text);
        this.fontWeight = this.chartMsg.title.style.fontWeight;
        this.chart.width = parseInt(this.activeLayer.width);
        this.chart.height = parseInt(this.activeLayer.height);
        this.chart.x = parseInt(this.activeLayer.x);
        this.chart.y = parseInt(this.activeLayer.y);
     
        this.$nextTick(this.toggleItem);
    },
    watch: {
        activeLayer (n) {
            this.initChartMsg(n.chartMsg);
        },
        'chartMsg.title.text': function (n) {
            this.titleText = regs.escapeHtml(n);
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
            this.chartMsg = $.extend(true, {}, chartMsg);
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
        updateChart () {
            this.$store.commit('setChartMsg', this.chartMsg);
            this.$events.emit('update_chart');
        },
        updateBlank () {
            this.chartMsg.title.blank = !this.chartMsg.title.blank;
            this.updateChart();
        },
        updateFontFamily (e) {
            this.chartMsg.title.style.fontFamily = e.target.value;
            this.updateChart();
        },
        updateFontWeight (e) {
            this.chartMsg.title.style.fontWeight = e.target.value;
            this.updateChart();
        },
        updateAlign (e) {
            this.chartMsg.title.align = e.target.value;
            this.updateChart();
        },
        setChartW () {
            this.activeLayer.width = this.chart.width;
            this.$nextTick(() => {
                this.$events.emit('update_chart');
            });
        },
        setChartH () {
            this.activeLayer.height = this.chart.height;
            this.$nextTick(() => {
                this.$events.emit('update_chart');
            });
        },
        setChartX () {
            this.activeLayer.x = this.chart.x;
            this.$nextTick(() => {
                this.$events.emit('update_chart');
            });
        },
        setChartY () {
            this.activeLayer.y = this.chart.y;
            this.$nextTick(() => {
                this.$events.emit('update_chart');
            });
        }
    }
};
</script>