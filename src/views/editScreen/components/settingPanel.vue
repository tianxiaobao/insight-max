<style lang="less">
    .radio-box {
        margin: 0 10px 0 8px;
        cursor: default;
    }
    .slider-wrap {
        width: 150px;
        margin: 4px 0 0 7px;
        .el-slider__button-wrapper {
            top: -20px;
        }
    }

    #m-setting{
        /*overflow: auto;
        overflow-x:hidden;*/
        min-height:600px;
    }

    #m-setting>dl>dd{
        display: none;
    }

    #m-setting>dl>dd.open{
        display: block;
    }

    #m-setting .u-addseries{
        display: block;
        cursor: pointer;
    }
    .m-setting .piece{
        margin-right:20px;
    }

    .u-linear{
        width:10px;
        height:69px;
        background:-webkit-linear-gradient(top,#ccc,#000);
    }

    .g-ml24{
        margin-left:24px;
    }

    .g-pad5{
        padding-left:5px;
    }

    .g-w60{
        width:60px;
    }

    .g-w90b{
        width:90%;
    }

    .m-setting .g-w90b{
        width:90%;
    }

    .m-setting .el-slider__button-wrapper{
        top:-20px;
        z-index:901;
    }
    .u-numdes{
        line-height:18px;
        text-align:center;
    }
    .u-deleteseries{
        margin-left: 10px;
    }
    .g-series{
        border-bottom: 1px solid #DCDEE3
    }
    .u-select{
        border: 1px solid #e7e7e7;
        height: 30px;
        line-height: 30px;
        outline: 0;
        color: #333;
    }
   .big-nav .u-addcolor{
        display: block;
        float: none;
        margin-left: 30px;
    }

</style>

<template>

<div  class="scroll-wrap">
	<div  class="scroll-box" v-if="activeLayer">
		<div class="mt" >
            <span class="fl"><i :class="showRight ? 'big-i3':'big-i4'" @click="$store.commit('SET_SHOW_RIGHT', !showRight)"></i></span>
            <ul>
                <!--<i class="big-i3 fl ml10"></i> <i class="big-i4 fl"></i> -->
                <li :class="{hover:tab=='tab1'}" @click="tab='tab1'"><p class="w55">样式设置</p></li>
                <li :class="{hover:tab=='tab2'}"  @click="tab='tab2'"><p class="w55">数据设置</p></li>

            </ul>

        </div>
        <!-- 切换内容（样式设置）begin -->


        <component v-if="tab == 'tab1'" v-bind:is="currentView">
            <!-- 组件在 vm.currentview 变化时改变！ -->
        </component>


        <!-- 切换内容（数据设置）begin -->
        <setting-data v-if="tab == 'tab2'"></setting-data>

	</div>
    <setting-align v-else-if="showAlign"></setting-align>
    <default-panel v-else></default-panel>
</div>

</template>


<script>
    import { mapGetters } from 'vuex';
    import defaultPanel from './defaultPanel.vue';
    import settingAlign from './settingAlign.vue';
    import settingData from './settingData.vue';
    import settingLine from './settingLine.vue';
    import settingArea from './settingArea.vue';
    import setArearange from './setArearange.vue';
    import settingBar from './settingBar.vue';
    import settingPie from './settingPie.vue';
    import settingLineBar from './settingLineBar.vue';
    import stackedBar from './stackedBar.vue';
    import stackedColumn from './stackedColumn.vue';
    import percentColumn from './percentColumn.vue';
    import columnRange from './columnRange.vue';
    import negativeBar from './negativeBar.vue';
    import waterFall from './waterFall.vue';
    import generalTitle from './general-title.vue';
    import settingBorder from './settingBorder.vue';
    import singlePic from './single-pic.vue';
    import settingChinaMap from './settingChinaMap.vue';
    import settingBubble from './settingBubble.vue';
    import settingEchartBmap from './settingEchartBmap.vue';
    import settingJumap from './settingJumap.vue';
    import settingScatter from './settingScatter.vue';
    import settingFunnel from './settingFunnel.vue';
    import settingGif from './settingGif.vue';
    import settingPieRing from './settingPieRing.vue';
    import settingPieSector from './settingPieSector.vue';
    import settingVideo from './settingVideo.vue';
    import settingScaler from './settingScaler.vue';
    import settingCarouselImg from './settingCarouselImg.vue';
    import settingMarquee from './settingMarquee.vue';
    import settingFlop from './settingFlop.vue';
    import threeDPie from './threeDPie.vue';
    import threeDRing from './threeDRing.vue';
    import settingRadar from './settingRadar.vue';
    export default{
        name: 'settingPanel',
        computed: {
            ...mapGetters(['layers', 'activeLayer', 'showRight','showAlign'])
        },
        data () {
            return {
                currentView: 'defaultPanel',
                tab : 'tab1'
            };
        },
        components: {
            defaultPanel,
            settingAlign,
            settingLine,
            settingArea,
            setArearange,
            settingData,
            settingPie,
            settingBar,
            stackedBar,
            stackedColumn,
            percentColumn,
            columnRange,
            negativeBar,
            waterFall,
            settingLineBar,
            generalTitle,
            settingBorder,
            settingChinaMap,
            settingBubble,
            singlePic,
            settingEchartBmap,
            settingJumap,
            settingScatter,
            settingFunnel,
            settingGif,
            settingPieRing,
            settingPieSector,
            settingVideo,
            settingScaler,
            settingCarouselImg,
            settingMarquee,
            settingFlop,
            threeDPie,
            threeDRing,
            settingRadar
        },
        watch: {
            activeLayer (n) {
                if(n) {
                    const type = n.type;
                    switch(type) {
                    case 'pie' :
                        this.currentView = 'settingPie';
                        break;
                    case 'pieRing':
                        this.currentView = 'settingPieRing';
                        break;
                    case 'pieSector':
                        this.currentView = 'settingPieSector';
                        break;
                    case 'line' :
                        this.currentView = 'settingLine';
                        break;
                    case 'area' :
                    case 'areaStacking' :
                    case 'percentArea' :
                        this.currentView = 'settingArea';
                        break;
                    case 'arearange' :
                        this.currentView = 'setArearange';
                        break;
                    case 'bar' :
                        this.currentView = 'settingBar';
                        break;
                    case 'column':
                        this.currentView = 'columnRange';
                        break;
                    case 'generalTitle' :
                        this.currentView = 'generalTitle';
                        break;
                    case 'chinaMap' :
                        this.currentView = 'settingChinaMap';
                        break;
                    case 'bubble' :
                        this.currentView = 'settingBubble';
                        break;
                    case 'singlePic' :
                        this.currentView = 'singlePic';
                        break;
                    case 'lineBar' :
                        this.currentView = 'settingLineBar';
                        break;
                    case 'stackedBar' :
                        this.currentView = 'stackedBar';
                        break;
                    case 'stackedColumn' :
                        this.currentView = 'stackedColumn';
                        break;
                    case 'percentColumn' :
                        this.currentView = 'percentColumn';
                        break;
                    case 'columnRange' :
                        this.currentView = 'columnRange';
                        break;
                    case 'jumap' :
                        this.currentView = 'settingJumap';
                        break;
                    case 'scatter' :
                        this.currentView = 'settingScatter';
                        break;
                    case 'border' :
                        this.currentView = 'settingBorder';
                        break;
                    case 'funnel' :
                        this.currentView = 'settingFunnel';
                        break;
                    case 'carouselImg':
                        this.currentView = 'settingCarouselImg';
                        break;
                    case 'gif' :
                        this.currentView = 'settingGif';
                        break;
                    case 'video' :
                        this.currentView = 'settingVideo';
                        break;
                    case 'negativeBar' :
                        this.currentView = 'negativeBar';
                        break;
                    case 'waterFall' :
                        this.currentView = 'waterFall';
                        break;
                    case 'scaler' :
                        this.currentView = 'settingScaler';
                        break;
                    case 'marquee' :
                        this.currentView = 'settingMarquee';
                        break;
                    case 'flop' :
                        this.currentView = 'settingFlop';
                        break;
                    case 'threeDPie' :
                        this.currentView = 'threeDPie';
                        break;
                    case 'threeDRing' :
                        this.currentView = 'threeDRing';
                        break;
                    case 'Radar':
                        this.currentView = 'settingRadar';
                        break;
                    }
                }
            }
        }
    };


</script>
