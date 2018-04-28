<template>
<div class="setting" id="gif">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>条形占比图</h3></dt>
            </dl>

            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>图表</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <setting-color name="背景颜色" v-model="chartMsg.backgroundColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="边框颜色" v-model="chartMsg.borderColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">边框宽度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="10"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.borderWidth"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                    </div>        
                </dd>
                <dt>
                    <a class="fl" href="#" @click.prevent="dOpen = !dOpen">
                        <b class="unfold"></b><h3>数据</h3>
                    </a>
                </dt>
                <dd :class="{ open: dOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">字号</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="100"
                                    :min="10"
                                    :step="1"
                                    v-model="chartMsg.tips.fontSize"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="颜色" v-model="chartMsg.tips.color" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">保留小数位</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="4"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.tips.decimal"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                    </div>        
                </dd>
                <dt>
                    <a class="fl" href="#" @click.prevent="bOpen = !bOpen">
                        <b class="unfold"></b><h3>百分比条</h3>
                    </a>
                </dt>
                <dd :class="{ open: bOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <setting-color name="开始颜色" v-model="chartMsg.startColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <setting-color name="结束颜色" v-model="chartMsg.endColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">密度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="50"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.density"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">总值</span>
                            <div class="right mr-30">
                                <input type="number"v-model="chartMsg.total" @change="draw">
                            </div>
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
                xOpen: true,
                bOpen: true,
                dOpen: true, 
                chartMsg: activeLayer.chartMsg
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
    .m-setting .right.mr-30 {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>