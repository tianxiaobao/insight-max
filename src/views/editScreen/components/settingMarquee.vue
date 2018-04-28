<template>
<div class="setting" id="gif">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>跑马灯</h3></dt>
            </dl>

            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>文字样式</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <setting-color name="文字颜色" v-model="chartMsg.fontColor" @change="draw"></setting-color>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">字号</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="100"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.fontSize"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                    </div>        
                </dd>
            </dl>
            <dl>
                <dd class="open">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">轮播</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.run" @change="draw"></el-checkbox>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">动画时间</span>
                            <div class="right mr-30">
                                <input type="number"v-model="chartMsg.duration" @change="draw">
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">停留时间</span>
                            <div class="right mr-30">
                                <input type="number"v-model="chartMsg.delay" @change="draw">
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
                gifList : ['gif01','gif02','gif03','gif04'],
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
    .m-setting .right.mr-30 {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>