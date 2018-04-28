<template>
<div class="setting" id="gif">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>翻牌器</h3></dt>
            </dl>

            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>标题</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">标题名</span>
                            <div class="right">
                                <input type="text" v-model="chartMsg.title.content" @change="draw" style="margin-left:10px">
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">字号</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="500"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.title.fontSize"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="颜色" v-model="chartMsg.title.fontColor" @change="draw"></setting-color>
                        </div>
                        <div class="big-rule-box m-setting clearfloat chart-set-css" style="padding-top:6px">
                            <div class="tit fl" style="margin-left:23px">位置</div>
                            <div class="item fl" style="margin-left:18px">
                                <input type="number" min="0" v-model="chartMsg.title.x" @change="draw">
                            <div class="tt">X坐标</div>
                            </div>
                            <div class="item fl">
                                <input type="number" min="0" v-model="chartMsg.title.y" @change="draw">
                            <div class="tt">Y坐标</div>
                          </div>
                        </div>
                    </div>        
                </dd>
            </dl>
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>翻牌器</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="big-rule-box m-setting clearfloat chart-set-css" style="padding-top:6px">
                            <div class="tit fl" style="margin-left:23px">位置</div>
                            <div class="item fl" style="margin-left:18px">
                                <input type="number" min="0" v-model="chartMsg.flop.x" @change="draw">
                            <div class="tt">X坐标</div>
                            </div>
                            <div class="item fl">
                                <input type="number" min="0" v-model="chartMsg.flop.y" @change="draw">
                            <div class="tt">Y坐标</div>
                          </div>
                        </div>
                        <h3>前缀</h3>
                        <div class="item clearfloat">
                            <span class="left">内容</span>
                            <div class="right">
                                <input type="text" v-model="chartMsg.flop.prefix.content" @change="draw" style="margin-left:10px">
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">字号</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="500"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.prefix.fontSize"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="颜色" v-model="chartMsg.flop.prefix.fontColor" @change="draw"></setting-color>
                        </div>
                        <h3>数字</h3>
                        <div class="item clearfloat">
                            <span class="left">字号</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="500"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.number.fontSize"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="颜色" v-model="chartMsg.flop.number.fontColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">数字间隔</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="30"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.number.padding"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="背景颜色" v-model="chartMsg.flop.number.backgroundColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">背景圆角</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="100"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.number.backgroundRadius"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">分隔符背景</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.flop.number.separatorColor" @change="draw"></el-checkbox>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">默认位数</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="100"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.number.bit"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">四舍五入</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.flop.number.rounding" @change="draw"></el-checkbox>
                            </div>
                        </div>
                        <div class="item clearfloat" v-show="!chartMsg.flop.number.rounding">
                            <span class="left">小数点位数</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="10"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.number.decimal"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">千位分隔符</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.flop.number.thousandSeparator" @change="draw"></el-checkbox>
                            </div>
                        </div>
                        <h3>后缀</h3>
                        <div class="item clearfloat">
                            <span class="left">内容</span>
                            <div class="right">
                                <input type="text" v-model="chartMsg.flop.suffix.content" @change="draw" style="margin-left:10px">
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">字号</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="500"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.flop.suffix.fontSize"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="颜色" v-model="chartMsg.flop.suffix.fontColor" @change="draw"></setting-color>
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
    import layerPosition from '../../../components/layer-position.vue';
    import settingColor from '@/components/setting-color.vue';
    export default{
        data () {
            const activeLayer = this.$store.state.screen.activeLayer;
            return {
                xOpen : true,
                chartMsg : activeLayer.chartMsg
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

        components: {layerPosition, settingColor},

        methods:{
            draw () {
                this.$events.emit('redraw_chart');
            }
        }
    };

</script>

<style>
    #gif #m-setting{
        overflow: initial;
        overflow-x: initial;
    }
    #gif .el-slider__button-wrapper {
        top: -20px;
    }
    #gif .el-slider__runway.show-input {
        margin-right: 80px;
    }
    #gif .el-input-number--small {
        width: 60px;
    }
    #gif .el-input-number--small .el-input__inner {
        padding-right: 0;
        width: 60px;
        border-radius: 0;
    }
    .big-nav span.el-checkbox__input ,
    .big-nav span.el-checkbox__inner{
        display: inline-block;
        float: none;
    }
    #gif .right > div {
        margin-left: 10px;
    }
    #gif .m-setting .right.mr-30 {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>