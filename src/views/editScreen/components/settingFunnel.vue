<template>
  <div class="setting">
    <div class="big-buildCon" id="con-detail-1">
      <div class="big-nav">
        <dl class="fore">
          <dt><h3>漏斗图</h3></dt>
        </dl>
        <dl class="style-item">
          <dt><b class="unfold"></b><h3>图表</h3></dt>
          <dd>
            <div class="big-rule-box m-setting">
              <setting-color name="背景颜色" v-model="chartMsg.chart.backgroundColor" @change="updateChart"></setting-color>
            </div>
            <div class="big-rule-box m-setting">
              <setting-color name="边框颜色" v-model="chartMsg.chart.borderColor" @change="updateChart"></setting-color>
            </div>
            <div class="big-rule-box m-setting">
              <setting-number name="边框宽度" v-model="chartMsg.chart.borderWidth" @change="updateChart"></setting-number>
            </div>
            <div class="big-rule-box m-setting">
              <setting-number name="颈部宽度" v-model="chartMsg.plotOptions.funnel.neckWidth" @change="updateChart"></setting-number>
            </div>
            <div class="big-rule-box m-setting">
              <setting-number name="颈部高度" v-model="chartMsg.plotOptions.funnel.neckHeight" @change="updateChart"></setting-number>
            </div>

            <div class="big-rule-box m-setting">
              <h3>边距</h3>
              <setting-number name="顶部" v-model="chartMsg.chart.marginTop" @change="updateChart"></setting-number>
              <setting-number name="底部" v-model="chartMsg.chart.marginBottom" @change="updateChart"></setting-number>
              <setting-number name="左侧" v-model="chartMsg.chart.marginLeft" @change="updateChart"></setting-number>
              <setting-number name="右侧" v-model="chartMsg.chart.marginRight" @change="updateChart"></setting-number>
            </div>
          </dd>
        </dl>

        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>主标题</h3></dt>
          <dd>
            <div class="big-rule-box m-setting">
              <setting-text name="标题名称" v-model="titleText" @change="updateTitle"></setting-text>
              <setting-number name="字号" v-model="chartMsg.title.style.fontSize" @change="updateChart"></setting-number>
              <setting-color name="颜色" v-model="chartMsg.title.style.color" @change="updateChart"></setting-color>
              <div class="item coordinate cl">
                <div class="fl mr10"> 位置 </div>
                <div class="fl mr10">
                  <input type="number" v-model.number="chartMsg.title.x" @change="updateChart">
                  <div class="center">横坐标</div>
                </div>
                <div class="fl mr10">
                  <input type="number" v-model.number="chartMsg.title.y" @change="updateChart">
                  <div class="center">纵坐标</div>
                </div>
              </div>
            </div>
          </dd>
        </dl>

        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>副标题</h3></dt>
          <dd>
            <div class="big-rule-box m-setting">
              <setting-text name="标题名称" v-model="titleSubtext" @change="updateSubTitle"></setting-text>
              <setting-number name="字号" v-model="chartMsg.subtitle.style.fontSize" @change="updateChart"></setting-number>
              <setting-color name="颜色" v-model="chartMsg.subtitle.style.color" @change="updateChart"></setting-color>
              <div class="item coordinate cl">
                <div class="fl mr10"> 位置 </div>
                <div class="fl mr10">
                  <input type="number" v-model.number="chartMsg.subtitle.x" @change="updateChart">
                  <div class="center">横坐标</div>
                </div>
                <div class="fl mr10">
                  <input type="number" v-model.number="chartMsg.subtitle.y" @change="updateChart">
                  <div class="center">纵坐标</div>
                </div>
              </div>
            </div>
          </dd>
        </dl>

        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>数据</h3></dt>
          <dd>
            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <div class="big-rule-box m-setting">
                <setting-color name="边框颜色" v-model="chartMsg.plotOptions.funnel.borderColor" @change="updateChart"></setting-color>
                </div>
                <div class="big-rule-box m-setting">
                  <setting-number name="边框宽度" v-model="chartMsg.plotOptions.funnel.borderWidth" @change="updateChart"></setting-number>
                </div>
                <div class="big-rule-box m-setting" v-for="(data, index) of chartMsg.series[0].data">
                  <setting-color :name="'系列'+(index+1)+'颜色'"  v-model="data.color" @change="updateChart"></setting-color>
                </div>
              </div>
            </div>
          </dd>
        </dl>

        <dl class="style-item">
          <dt>
            <b class="unfold close"></b><h3>数据标签</h3>
          <div class="fun-show" @click.stop="dataLabelShow"><i class="check" :class="{checked: chartMsg.plotOptions.funnel.dataLabels.enabled}"></i>显示</div>
          </dt>
          <dd>
            <div class="big-rule-box m-setting">
              <setting-number name="字号"  v-model="chartMsg.plotOptions.funnel.dataLabels.style.fontSize" @change="updateChart"></setting-number>
            </div>
            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
               <setting-color name="字体颜色" v-model="chartMsg.plotOptions.funnel.dataLabels.style.color"  @change="updateChart"></setting-color>
              </div>
            </div>

            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <span class="left">标签距中心</span>
                <div class="right">
                  <div class="slider-wrap">
                    <el-slider v-model="chartMsg.plotOptions.funnel.dataLabels.distance" :max="100" :min="-100" @change="updateChart"></el-slider>
                  </div>
                </div>
              </div>
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
                <div class="tt">高度</div>o
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
  import { mapGetters } from 'vuex';
  import regs from '@/utils/regs';
  import funnel from '@/store/modules/defaultFormat/funnel';
  import settingColor from '@/components/setting-color.vue';
  import settingNumber from '@/components/setting-number.vue';
  import settingText from '@/components/setting-text.vue';

  export default {
      name: 'scatter',
      components: {
          settingColor,
          settingNumber,
          settingText
      },
      data () {
          return {
              chartMsg: {},
              titleText: '',
              titleSubtext: '',
              plotLines: {
                  value: 0,
                  width: 0,
                  color: ''
              },
              legend: {
                  align: '',
                  verticalAlign: ''
              },
              size: {
                  max: '',
                  min: ''
              },
              chart: {width: 0, height: 0, x: 0, y: 0 },
              data:{serie:[]}
          };
      },
      computed: {
          ...mapGetters(['layers','activeLayer'])
      },
      created () {
          this.initChartMsg(this.activeLayer.chartMsg);
      },
      mounted () {
          this.$nextTick(() => {
              this.titleText = regs.escapeHtml(this.chartMsg.title.text);
              this.titleSubtext = regs.escapeHtml(this.chartMsg.subtitle.text);
              this.chart.width = parseInt(this.activeLayer.width);
              this.chart.height = parseInt(this.activeLayer.height);
              this.chart.x = parseInt(this.activeLayer.x);
              this.chart.y = parseInt(this.activeLayer.y);
              this.toggleItem();
          });
      },
      watch: {
          layers () {
              this.initChartMsg({});
          },
          activeLayer (n) {
              this.initChartMsg(n.chartMsg);
          },
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
          initChartMsg (chartMsg) {
              this.chartMsg = $.extend(true, {}, funnel[0].chartMsg, chartMsg);
          },
          updateChart () {
              this.$store.commit('setChartMsg',this.chartMsg);
              this.$events.emit('update_chart');
          },
          updateDataSerie (c) {
              this.chartMsg.series.forEach((item) => {
                  const serie = item.data;
                  serie[c.type].color = c.color;
              });
              this.updateChart();
          },
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
          updateTitle () {
              this.chartMsg.title.text = regs.htmlEscape(this.titleText);
              this.updateChart();
          },
          updateSubTitle () {
              this.chartMsg.subtitle.text = regs.htmlEscape(this.titleSubtext);
              this.updateChart();
          },
          updateDataSerie (c) {
              this.chartMsg.series.forEach((item) => {
                  const serie = item.data;
                  serie[c.type].color = c.color;
              });
              this.updateChart();
          },
          dataLabelShow () {
              this.chartMsg.plotOptions.funnel.dataLabels.enabled = !this.chartMsg.plotOptions.funnel.dataLabels.enabled;
              this.updateChart();
          },
          setChartW () {
              this.activeLayer.width = this.chart.width;
              this.$nextTick(() => {
                  this.$events.emit('redraw_chart');
              });
          },
          setChartH () {
              this.activeLayer.height = this.chart.height;
              this.$nextTick(() => {
                  this.$events.emit('redraw_chart');
              });
          },
          setChartX () {
              this.activeLayer.x = this.chart.x;
              this.$nextTick(() => {
                  this.$events.emit('redraw_chart');
              });
          },
          setChartY () {
              this.activeLayer.y = this.chart.y;
              this.$nextTick(() => {
                  this.$events.emit('redraw_chart');
              });
          }
      }

  };
</script>
