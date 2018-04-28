<template>
    <div>
        <dl v-for="item in title">
            <dt>
                <a class="fl" href="#" @click.prevent="item.open = !item.open">
                    <b class="unfold"></b><h3>{{item.name}}</h3>
                </a>
            </dt>
            <dd :class="{ open: item.open }">
                <div class="big-rule-box m-setting">
                    <div class="item clearfloat">
                        <span class="left">名称</span>
                        <div class="right mr-30">
                            <input type="text" v-model="item.text" @change="drawChart">
                        </div>
                    </div>
                </div>
                <div class="big-rule-box m-setting">
                    <div class="item clearfloat">
                        <span class="left">字号</span>
                        <div class="right mr-30">
                            <input type="text" v-model="item.fontSize" @change="drawChart">
                        </div>
                    </div>
                </div> 
                <div class="big-rule-box m-setting">
                    <div class="item clearfloat color">
                        <setting-color name="颜色" v-model="item.color" @change="drawChart"></setting-color>
                    </div>
                </div>
                <div class="big-rule-box m-setting">
                    <div class="item clearfloat">
                        <span class="left">位置(x):</span>
                        <div class="right mr-30">
                            <input type="text" v-model="item.left" @change="drawChart">
                        </div>
                    </div>
                </div>
                <div class="big-rule-box m-setting">
                    <div class="item clearfloat">
                        <span class="left">位置(y):</span>
                        <div class="right mr-30">
                            <input type="text" v-model="item.top" @change="drawChart">
                        </div>
                    </div>
                </div>  
            </dd>
        </dl>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    import settingColor from './setting-color.vue';
    export default {
        name: 'jumap-title',
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
<style>
    #m-setting > div > dl > dd.open {
        display: block;
    }
    #m-setting > div > dl > dd {
        display: none;
    }
</style>