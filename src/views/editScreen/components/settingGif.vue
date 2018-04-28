<template>
<div class="setting" id="gif">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>装饰</h3></dt>
            </dl>
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>全局</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <div class="item clearfloat">
                            <span class="left">装饰元素</span>
                            <div class="right">
                                <select class="u-select w100" v-model="chartMsg.src" @change="draw">
                                    <option v-for="item in gifList" :value="item">{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">透明度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="1"
                                    :min="0"
                                    :step="0.01"
                                    v-model="chartMsg.opacity"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">旋转角度</span>
                            <div class="right mr-30">
                                <el-slider
                                    :max="360"
                                    :min="0"
                                    :step="1"
                                    v-model="chartMsg.rotate"
                                    @change="draw"
                                    show-input>
                                </el-slider>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">X轴翻转</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.mirrorX" @change="draw"></el-checkbox>
                            </div>
                        </div>
                        <div class="item clearfloat">
                            <span class="left">Y轴翻转</span>
                            <div class="right mr-30">
                                <el-checkbox v-model="chartMsg.mirrorY" @change="draw"></el-checkbox>
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

        components: {layerPosition},

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
