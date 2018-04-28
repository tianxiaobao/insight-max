<style lang="less" scoped>
    .m-setting {
        margin: 4px 0 7px 0;
    }
    .gui-field-name{
        display: inline-block;
        float: left;
        margin-left: 20px;
    }
    .gui-field-component{
        margin-left: 80px;
        position: relative;
        width: 200px;
        margin-top: 20px;
    }
    .gui-label-file{
        width: 200px;
        height: 100px;
        border: 1px dashed #C4C6CF;
        display: block;
    }
    .gui-label-file span{
        display: block;
        text-align: center;
        color: #999;
        float: none;
        margin-right: 0;
    }
    .gui-image-value{
        width: 45px;
        height: 45px;
        margin: 15px auto 0;
        display: block;
    }
    .gui-input-file{
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div class="setting">
        <div class="big-buildCon" id="con-detail-1">
            <div class="big-nav">
                <dl class="fore">
                    <dt><h3>单张图片</h3></dt>
                </dl>

                <dl class="style-item">
                    <dd>
                        <span class="gui-field-name">背景图</span>
                        <div class="gui-field-component">
                            <label class="gui-label-file">
                                <img class="gui-image-value" v-lazy="activeLayer.chartMsg.chart.plotBackgroundImage">
                                <span>点击上传图片</span>
                            </label>
                            <form id="upfile" >
                            <input type="file" name="file" class="gui-input-file" @change="upload()" id='file'>
                            <input type="hidden" name="layerId" :value="activeLayer.id">
                            <input type="hidden" name="bigScreenId" :value="screenBasicMsg.id">
                            </form>
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
// import api from '../../../api';
import { mapGetters } from 'vuex';
import singlePic from '@/store/modules/defaultFormat/single-pic';
import settingText from '@/components/setting-text.vue';

export default {
    name: 'single-pic',
    components: {
        settingText
    },
    data () {
        return {
            chart: {width: 0, height: 0, x: 0, y: 0 },
            cutImgUrl:''
        };
    },
    computed: {
        ...mapGetters(['layers','activeLayer','screenBasicMsg']),
        chartMsg () {
            const newChartMsg = $.extend(true, {}, singlePic[0].chartMsg, this.activeLayer.chartMsg);
            return newChartMsg;
        }
    },
    mounted () {
        this.chart.width = parseInt(this.activeLayer.width);
        this.chart.height = parseInt(this.activeLayer.height);
        this.chart.x = parseInt(this.activeLayer.x);
        this.chart.y = parseInt(this.activeLayer.y);
        this.$nextTick(this.toggleItem);
    },
    watch: {
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
        updateChart () {
            this.$store.commit('setChartMsg',this.chartMsg);
            this.$events.emit('update_chart');
        },
        setChartW () {
            this.activeLayer.width = this.chart.width;
            this.$events.emit('update_chart');
        },
        setChartH () {
            this.activeLayer.height = this.chart.height;
            this.$events.emit('update_chart');
        },
        setChartX () {
            this.activeLayer.x = this.chart.x;
            this.$events.emit('update_chart');
        },
        setChartY () {
            this.activeLayer.y = this.chart.y;
            this.$events.emit('update_chart');
        },
        upload () {
            const file= document.getElementById('file').files[0];
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt1M = file.size / 1024 / 1024 < 1;

            if (!isJPG && !isPNG) {
                this.$message.error('上传背景图片只能是 JPG/PNG 格式!');
                return;
            }
            if (!isLt1M) {
                this.$message.error('上传背景图片大小不能超过 1MB!');
                return;
            }
            const _this = this;
            const form = new FormData(document.getElementById("upfile"));
            $.ajax({
                url:"/layer/uploadImg",
                type:"post",
                data:form,
                processData:false,
                contentType:false,
                dataType:"json",
                success:function (data) {
                    _this.activeLayer.sourceData.layerUrl = data.data;
                    const id = _this.activeLayer.id;
                    const timestamp = new Date().getTime();
                    _this.cutImgUrl =`layer/getImg/${id}?${timestamp}`;
                    _this.activeLayer.chartMsg.chart.plotBackgroundImage=_this.cutImgUrl;
                    // 清空input
                    $(":input[name='file']")[0].value = '';
                    _this.$events.emit('update_chart');
                }
            });
        }
    }
};
</script>