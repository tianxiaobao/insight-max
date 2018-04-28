<template>
<div class="setting">
    <div class="big-buildCon" >
        <div class="big-nav" id="m-setting">
            <dl class="fore">
                <dt><h3>平面地图</h3></dt>
            </dl>
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
                        <b class="unfold"></b><h3>地图选择</h3>
                    </a>
                </dt>
                <dd :class="{ open: xOpen }">
                    <div class="big-rule-box m-setting">
                        <select class="u-select w97 ml10">
                            <option value="">中国</option>
                        </select>
                        <select class="u-select w97" v-model="chartMsg.extra.map" @change="switchMap('second')">
                            <option value="china">省市</option>
                            <option v-for="item in mapList" :value="item.drilldown" >
                                {{item.name}}
                            </option>
                        </select>
                        <select class="u-select w97" v-model="chartMsg.extra.mapChild" @change="switchMap('third')">
                            <option value="">区县</option>
                            <option v-for="item in chartMsg.extra.areaArrChild" :value="item.drilldown" >
                                {{item.name}}
                            </option>
                        </select>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <a class="fl" href="#" @click.prevent="overallOpen = !overallOpen">
                        <b class="unfold"></b><h3>地图层设置</h3>
                    </a>
                </dt>
                <dd :class="{ open: overallOpen }">
                    <div class="big-rule-box m-setting">
                        <h3>边框</h3>
                        <setting-color name="背景颜色" v-model="chartMsg.chart.backgroundColor" @change="updateChart()"></setting-color>
                        <setting-number name="边框宽度" v-model="chartMsg.chart.borderWidth" @change="updateChart()"></setting-number>
                        <setting-color name="边框颜色" v-model="chartMsg.chart.borderColor" @change="updateChart()"></setting-color>
                    </div>
                    <div class="big-rule-box m-setting">
                        <h3>边距</h3>
                        <setting-number name="顶部" v-model="chartMsg.chart.marginTop" @change="updateChart()"></setting-number>
                        <setting-number name="底部" v-model="chartMsg.chart.marginBottom" @change="updateChart()"></setting-number>
                        <setting-number name="左侧" v-model="chartMsg.chart.marginLeft" @change="updateChart()"></setting-number>
                        <setting-number name="右侧" v-model="chartMsg.chart.marginRight" @change="updateChart()"></setting-number>
                    </div>
                    <div class="big-rule-box m-setting">
                        <h3>边界</h3>
                        <div class="item clearfloat">
                            <span class="left">边界类型</span>
                            <div class="right">
                                <select class="u-select w100" v-model="chartMsg.plotOptions.map.dashStyle" @change="updateChart()">
                                    <option v-for="item in dashStyle" :value="item">{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <setting-number name="边界宽度" v-model="chartMsg.plotOptions.map.borderWidth" @change="updateChart()"></setting-number>
                        <setting-color name="边界宽度" v-model="chartMsg.plotOptions.map.borderColor" @change="updateChart()"></setting-color>
                    </div>
                    <div class="big-rule-box m-setting">
                        <h3>文字</h3>
                        <setting-color name="字体颜色" v-model="chartMsg.plotOptions.map.dataLabels.color" @change="updateChart()"></setting-color>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <a href="#" @click.prevent="legendOpen = !legendOpen">
                        <b class="unfold"></b>
                        <h3>地图颜色设置</h3>
                    </a>
                </dt>
                <dd :class="{ open: legendOpen }">
                    <div class="g-series">
                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">区域</span>
                                <div class="right">整个地图</div>
                            </div>
                            <setting-color name="颜色" v-model="chartMsg.plotOptions.map.color" @change="updateChart()"></setting-color>
                        </div>
                    </div>
                    <div v-for="(item,index) in chartMsg.extra.colorArr" class="g-series">
                        <div class="big-rule-box m-setting">
                            <div class="item clearfloat">
                                <span class="left">区域</span>
                                <div class="right">
                                    <select class="u-select w100" v-model="item.name" @change="updateChart()">
                                        <option v-for="item2 in chartMsg.extra.areaArr" :value="item2.name">{{item2.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <setting-color name="颜色" v-model="item.color" @change="updateChart()"></setting-color>
                        </div>
                    </div>
                    <a href="#" class="u-addcolor" @click.prevent="addColor">添加</a>
                </dd>
            </dl>
            <dl>
                <dt>
                    <a href="#" @click.prevent="sOpen = !sOpen">
                        <b class="unfold"></b>
                        <h3>气泡层设置</h3>
                    </a>
                </dt>
                <dd :class="{ open: sOpen }">
                   <div class="big-rule-box m-setting">
                        <setting-number name="气泡最大尺寸" v-model="chartMsg.plotOptions.mapbubble.maxSize" @change="updateChart()"></setting-number>
                        <setting-number name="气泡最小尺寸" v-model="chartMsg.plotOptions.mapbubble.minSize" @change="updateChart()"></setting-number>
                    </div>
                    <div class="big-rule-box m-setting">
                        <span class="u-addseries" @click.stop="addSeries">添加</span>
                        <h3>气泡类型</h3>
                    </div>
                    <div v-for="(item,index) in chartMsg.extra.series" :class="{'g-series': index != chartMsg.extra.series.length-1}">
                       <div class="big-rule-box m-setting">
                           <h3>气泡类型{{index + 1}}  <a href="#" @click.prevent="removeSeries(index)" class="u-deleteseries">删除</a></h3>
                           <setting-text name="KEY" v-model="item.value" @change="updateChart()"></setting-text>
                           <setting-color name="颜色" v-model="item.color" @change="updateChart()"></setting-color>
                       </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><a href="#" @click.prevent="titleOpen = !titleOpen"><b class="unfold"></b><h3>主标题</h3></a></dt>
                <dd :class="{ open: titleOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-text name="名称" v-model="chartMsg.title.text" @change="updateChart()"></setting-text>
                        <setting-number name="字号" v-model="chartMsg.title.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="颜色" v-model="chartMsg.title.style.color" @change="updateChart()"></setting-color>
                        <setting-number name="X" v-model="chartMsg.title.x" @change="updateChart()"></setting-number>
                        <setting-number name="Y" v-model="chartMsg.title.y" @change="updateChart()"></setting-number>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><a href="#" @click.prevent="subtitleOpen = !subtitleOpen"><b class="unfold"></b><h3>副标题</h3></a></dt>
                <dd :class="{ open: subtitleOpen }">
                    <div class="big-rule-box m-setting">
                        <setting-text name="名称" v-model="chartMsg.subtitle.text" @change="updateChart()"></setting-text>
                        <setting-number name="字号" v-model="chartMsg.subtitle.style.fontSize" @change="updateChart()"></setting-number>
                        <setting-color name="颜色" v-model="chartMsg.subtitle.style.color" @change="updateChart()"></setting-color>

                        <setting-number name="X" v-model="chartMsg.subtitle.x" @change="updateChart()"></setting-number>
                        <setting-number name="Y" v-model="chartMsg.subtitle.y" @change="updateChart()"></setting-number>
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
    import settingText from '../../../components/setting-text.vue';
    import settingColor from '../../../components/setting-color.vue';
    import layerPosition from '../../../components/layer-position.vue';

    const mapData = {
        province: [{"name":"北京",drilldown:"beijing"},{"name":"天津",drilldown:"tianjin"},{"name":"河北",drilldown:"hebei"},{"name":"山西",drilldown:"shanxi"},{"name":"内蒙古",drilldown:"neimenggu"},{"name":"辽宁",drilldown:"liaoning"},{"name":"吉林",drilldown:"jilin"},{"name":"黑龙江",drilldown:"heilongjiang"},{"name":"上海",drilldown:"shanghai"},{"name":"江苏",drilldown:"jiangsu"},{"name":"浙江",drilldown:"zhejiang"},{"name":"安徽",drilldown:"anhui"},{"name":"福建",drilldown:"fujian"},{"name":"江西",drilldown:"jiangxi"},{"name":"山东",drilldown:"shandong"},{"name":"河南",drilldown:"henan"},{"name":"湖北",drilldown:"hubei"},{"name":"湖南",drilldown:"hunan"},{"name":"广东",drilldown:"guangdong"},{"name":"广西",drilldown:"guangxi"},{"name":"海南",drilldown:"hainan"},{"name":"重庆",drilldown:"chongqing"},{"name":"四川",drilldown:"sichuan"},{"name":"贵州",drilldown:"guizhou"},{"name":"云南",drilldown:"yunnan"},{"name":"西藏",drilldown:"xizang"},{"name":"陕西",drilldown:"shanxi2"},{"name":"甘肃",drilldown:"gansu"},{"name":"青海",drilldown:"qinghai"},{"name":"宁夏",drilldown:"ningxia"},{"name":"新疆",drilldown:"xinjiang"},{"name":"香港",drilldown:"xianggang"},{"name":"澳门",drilldown:"aomen"}],
        china : [{"name":"北京"},{"name":"天津"},{"name":"河北"},{"name":"山西"},{"name":"内蒙古"},{"name":"辽宁"},{"name":"吉林"},{"name":"黑龙江"},{"name":"上海"},{"name":"江苏"},{"name":"浙江"},{"name":"安徽"},{"name":"福建"},{"name":"江西"},{"name":"山东"},{"name":"河南"},{"name":"湖北"},{"name":"湖南"},{"name":"广东"},{"name":"广西"},{"name":"海南"},{"name":"重庆"},{"name":"四川"},{"name":"贵州"},{"name":"云南"},{"name":"西藏"},{"name":"陕西"},{"name":"甘肃"},{"name":"青海"},{"name":"宁夏"},{"name":"新疆"},{"name":"台湾"},{"name":"香港"},{"name":"澳门"},{"name":"南海诸岛"}]
    };

    export default{
        data () {
            const activeLayer = this.$store.state.screen.activeLayer;
            return {
                mapList : mapData.province,
                dashStyle : [
                    'Solid',
                    'ShortDash',
                    'ShortDot',
                    'ShortDashDot',
                    'ShortDashDotDot',
                    'Dot',
                    'Dash',
                    'LongDash',
                    'DashDot',
                    'LongDashDot',
                    'LongDashDotDot'
                ],
                overallOpen : true,
                titleOpen : false,
                subtitleOpen : false,
                legendOpen : false,
                xOpen : true,
                sOpen : false,
                chartMsg : activeLayer.chartMsg
            };
        },

        computed: {
            ...mapGetters(['activeLayer'])
        },

        watch:{
            activeLayer () {
                this.chartMsg = this.$store.state.screen.activeLayer.chartMsg;
            },
            "activeLayer.chartMsg.extra.series":function (v) {
                this.chartMsg.extra.series = v;
            }
        },

        components: {settingNumber,settingColor,settingText,layerPosition},

        created () {
            if(this.chartMsg.extra.map=='china')
                this.chartMsg.extra.areaArr = mapData[this.chartMsg.extra.map];
        },
        methods:{
            addColor () {
                this.chartMsg.extra.colorArr.push({
                    name : this.chartMsg.extra.areaArr[0].name,
                    color: this.chartMsg.plotOptions.map.color
                });
            },
            // 变换级联菜单
            switchMap (cas) {
                this.chartMsg.extra.colorArr = [];
                const _this = this;
                // 判断变换的第几级
                const cascade = cas=='second'?this.chartMsg.extra.map:this.chartMsg.extra.mapChild;
                if(cas=='second') {
                    _this.chartMsg.extra.areaArrChild = [];
                }
                const url = 'https://data.jianshukeji.com/jsonp?callback=?&token=105654cc87f2e8a12c70f6296d5bc84c&filename=geochina/' + cascade + '.json';
                $.ajax({
                    dataType: 'jsonp',
                    url : url
                }).done(function (data) {
                    _this.chartMsg.extra.mapdata = data;
                    const dataList = [];
                    $.each(data.features, function (index,md) {
                        const tmp = {
                            name: md.properties.name,
                            fullname: md.properties.fullname
                        };
                        if(md.properties.drilldown) {
                            tmp.drilldown = md.properties.drilldown;
                        }
                        dataList.push(tmp);
                    });
                    _this.chartMsg.extra.areaArr = dataList;
                    if(cas=='second') {
                        _this.chartMsg.extra.areaArrChild = dataList;
                        _this.chartMsg.extra.mapChild = '';
                    }
                    _this.$store.commit('setChartMsg',_this.chartMsg);
                    _this.$store.commit('triggerChartCallback');
                });
            },

            updateChart () {
                this.$store.commit('setChartMsg',this.chartMsg);
                this.$store.commit('triggerChartCallback');
                // this.$events.emit('update_chart');
            },

            addSeries () {
                const series = this.chartMsg.extra.series;
                const serie = this.chartMsg.extra.serie;
                const msg = $.extend(true, {}, serie);
                series.push(msg);
                this.updateChart();
            },

            removeSeries (index) {
                const s = this.chartMsg.extra.series;
                s.splice(index, 1 );
                this.updateChart();
            }
        }
    };
</script>
<style type="text/css">
    .w97{width: 97px;}
</style>