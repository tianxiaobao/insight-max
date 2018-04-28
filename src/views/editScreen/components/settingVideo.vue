<style lang="less">
    .v-checkbox {
        margin-left: 30px;
        line-height: 24px;
        .tit {
            display: block;
            margin-top: 10px;
            min-width: 68px;
        }
        .check {
            margin-top: 14px;
        }
    }
</style>
<template>
    <div class="setting">
        <div class="big-buildCon" id="con-detail-1">
            <div class="big-nav">
                <dl class="fore">
                    <dt><h3>视频</h3></dt>
                </dl>

                <dl class="style-item">
                    <dt>
                        <b class="unfold"></b><h3>视频设置</h3>
                    </dt>
                    <dd>
                        <div class="big-rule-box m-setting">
                            <setting-text name="视频地址" v-model="chartMsg.video.url" placeholder="请输入视频播放地址, 推荐 mp4 格式视频地址" @change="updateChart"></setting-text>
                        </div>
                        <div class="v-checkbox cl">
                            <div class="fl tit">自动播放</div><i class="fl check" :class="{'checked': chartMsg.video.autoplay}" @click="changeAutoplay"></i>
                        </div>
                        <div class="v-checkbox cl">
                            <div class="fl tit">循环播放</div><i class="fl check" :class="{'checked': chartMsg.video.loop}" @click="changeLoop"></i>
                        </div>
                    </dd>
                </dl>

                <!-- 图表位置 -->
                <dl class="style-item">
                    <dt>
                        <b class="unfold"></b><h3>图表位置</h3>
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
import video from '@/store/modules/defaultFormat/video';
import settingText from '@/components/setting-text.vue';

export default {
    name: 'video',
    components: {
        settingText
    },
    data () {
        return {
            chartMsg: {},
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
            this.toggleItem();
            this.chart.width = parseInt(this.activeLayer.width);
            this.chart.height = parseInt(this.activeLayer.height);
            this.chart.x = parseInt(this.activeLayer.x);
            this.chart.y = parseInt(this.activeLayer.y);
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
            this.chartMsg = $.extend(true, {}, video[0].chartMsg, chartMsg);
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
        changeAutoplay () {
            this.chartMsg.video.autoplay = !this.chartMsg.video.autoplay;
            this.updateChart();
        },
        changeLoop () {
            this.chartMsg.video.loop = !this.chartMsg.video.loop;
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
        }
    }
};
</script>