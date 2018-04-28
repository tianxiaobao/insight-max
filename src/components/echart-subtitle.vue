<template>
    <dl>
        <dt>
            <a class="fl" href="#" @click.prevent="titleOpen = !titleOpen">
                <b class="unfold"></b><h3>副标题</h3>
            </a>
        </dt>
        <dd :class="{ open: titleOpen }">
            <div class="big-rule-box m-setting">
                <div class="item clearfloat">
                    <span class="left">名称</span>
                    <div class="right mr-30">
                        <input type="text" v-model="title.subtext" @change="drawChart">
                    </div>
                </div>
            </div>
            <div class="big-rule-box m-setting">
                <div class="item clearfloat">
                    <span class="left">字号</span>
                    <div class="right mr-30">
                        <input type="text" v-model="title.subtextStyle.fontSize" @change="drawChart">
                    </div>
                </div>
            </div> 
            <div class="big-rule-box m-setting">
                <div class="item clearfloat color">
                    <setting-color name="颜色" v-model="title.subtextStyle.color" @change="drawChart"></setting-color>
                </div>
            </div>
            <!--div class="big-rule-box m-setting">
                <div class="item clearfloat">
                    <span class="left">位置(x):</span>
                    <div class="right mr-30">
                        <input type="text" v-model="title.left" @change="drawChart">
                    </div>
                </div>
            </div>
            <div class="big-rule-box m-setting">
                <div class="item clearfloat">
                    <span class="left">位置(y):</span>
                    <div class="right mr-30">
                        <input type="text" v-model="title.top" @change="drawChart">
                    </div>
                </div>
            </div-->  
        </dd>
    </dl>
</template>
<script>
    import { mapGetters } from 'vuex';
    import settingColor from './setting-color.vue';
    export default {
        name: 'echart-subtitle',
        components: {settingColor},
        data () {
            return {
                titleOpen: false
            };
        },
        computed: {
            ...mapGetters(['activeLayer']),
            title () {
                return this.activeLayer.chartMsg.title;
            }
        },
        methods: {
            drawChart () {
                this.$events.emit('redraw_chart');
            }
        }
    };
</script>