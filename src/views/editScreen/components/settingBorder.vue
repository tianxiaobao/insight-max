<template>
<div class="setting">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>边框</h3></dt>
            </dl>
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="overallOpen = !overallOpen">
                        <b class="unfold"></b><h3>边框样式</h3>
                    </a>
                </dt>
                <dd :class="{ open: overallOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-color name="背景颜色" v-model="chartMsg.chart.backgroundColor" @change="updateChart()"></setting-color>
                        <setting-color name="边框颜色" v-model="chartMsg.chart.borderColor" @change="updateChart()"></setting-color>
                        <setting-number name="边框宽度" v-model="chartMsg.chart.borderWidth" @change="updateChart()"></setting-number>
                        <setting-number name="边框圆角" v-model="chartMsg.chart.borderRadius" @change="updateChart()"></setting-number>
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
    import settingColor from '../../../components/setting-color.vue';
    import layerPosition from '../../../components/layer-position.vue';

    export default{
        data () {
            const activeLayer = this.$store.state.screen.activeLayer;
            return {
                overallOpen:true,
                chartMsg : activeLayer.chartMsg
            };
        },

        components: {settingNumber,settingColor,layerPosition},

        computed: {
            ...mapGetters(['activeLayer'])
        },

        watch:{
            activeLayer () {
                this.chartMsg = this.$store.state.screen.activeLayer.chartMsg;
            }
        },

        mounted () {
        },
        methods:{
            updateChart () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$events.emit('update_chart');
            }
        }
    };

</script>