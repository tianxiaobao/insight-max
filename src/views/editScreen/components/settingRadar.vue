<template>
  <div class="setting" id="radar">
    <div class="big-buildCon" id="con-detail-1">
      <div class="big-nav">
        <dl class="fore">
          <dt><h3>雷达图</h3></dt>
        </dl>
        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>图表</h3></dt>
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
              <div class="item clearfloat">
                <span class="left">形状</span>
                <div class="right">
                  <select class="u-select w100" v-model="circle" @change="updateCircle(circle)">
                    <option v-for="item in colorStyle" :value="item">{{item}}</option>
                  </select>
                </div>
              </div>
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
          <dt><b class="unfold close"></b><h3>角度轴</h3></dt>
          <dd>
            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <div class="big-rule-box m-setting">
                  <setting-number name="文本字号" v-model="chartMsg.xAxis.labels.style.fontSize" @change="updateChart"></setting-number>
                </div>
                <div class="big-rule-box m-setting">
                  <setting-color name="文本颜色" v-model="chartMsg.xAxis.labels.style.color" @change="updateChart"></setting-color>
                </div>
                <div class="big-rule-box m-setting">
                  <setting-color name="轴线颜色" v-model="chartMsg.yAxis.gridLineColor" @change="updateChart"></setting-color>
                </div>
                <div class="big-rule-box m-setting">
                  <setting-number name="轴线宽度" v-model="chartMsg.yAxis.gridLineWidth" @change="updateChart"></setting-number>
                </div>
                <div class="item clearfloat">
                  <span class="left">旋转角度</span>
                  <div class="right mr-30">
                    <el-slider
                      :max="360"
                      :min="0"
                      :step="5"
                      v-model="chartMsg.pane.startAngle"
                      @change="updateChart"
                      show-input>
                    </el-slider>
                  </div>
                </div>

              </div>
            </div>
          </dd>
        </dl>

        <dl class="style-item">
          <dt>
            <b class="unfold close"></b><h3>数据系列</h3>
            <a href="" style="float:right;margin-right:30px" @click.prevent="addRadar">添加</a>
          </dt>
          <dd>
            <div class="big-rule-box m-setting" v-for="(data, index) of chartMsg.extra.series">
              <div class="delete-wrap">系列{{index + 1}} <a href="" @click.prevent="removeRadar(index)">删除</a></div>
              <setting-text name="系列值" v-model="data.value" @change="updateChart"></setting-text>
              <setting-text name="系列名" v-model="data.name" @change="updateChart"></setting-text>
              <setting-color name="描边颜色" v-model="data.lineColor" @change="updateChart"></setting-color>
              <setting-number name="描边粗细" v-model="data.lineWidth" @change="updateChart"></setting-number>
              <setting-color name="填充颜色" v-model="data.color" @change="updateChart"></setting-color>
              <div class="item clearfloat">
                <span class="left">显示数值</span>
                <div class="right">
                  <i @click="setDataLabels(data.dataLabels)" class="check" :class="{checked: data.dataLabels.enabled}"></i>
                </div>
              </div>
              <setting-number name="字号" v-model="data.dataLabels.style.fontSize" @change="updateChart"></setting-number>
              <setting-color name="颜色" v-model="data.dataLabels.color" @change="updateChart"></setting-color>
            </div>
          </dd>
        </dl>
        <dl class="style-item">
          <dt>
            <b class="unfold close"></b><h3>图例</h3>
            <div class="fun-show" @click.stop="isShow"><i class="check" :class="{checked: chartMsg.legend.enabled}"></i>显示</div>
          </dt>
          <dd >
            <div class="big-rule-box m-setting">
              <setting-number name="文本字号" v-model="chartMsg.legend.itemStyle.fontSize" @change="updateChart()"></setting-number>
              <setting-color name="文本颜色" v-model="chartMsg.legend.itemStyle.color" @change="updateChart()"></setting-color>
              <setting-color name="背景颜色" v-model="chartMsg.legend.backgroundColor" @change="updateChart()"></setting-color>
              <setting-number name="边框宽度" v-model="chartMsg.legend.borderWidth" @change="updateChart()"></setting-number>
              <setting-color name="边框颜色" v-model="chartMsg.legend.borderColor" @change="updateChart()"></setting-color>
              <legend-orientation @updatePositon = "updateOrientation"></legend-orientation>
              <part-position :position="chartMsg.legend" v-on:updatePositon="updateChart()"></part-position>
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
  import radar from '@/store/modules/defaultFormat/radar';
  import settingColor from '@/components/setting-color.vue';
  import settingNumber from '@/components/setting-number.vue';
  import settingText from '@/components/setting-text.vue';
  import partPosition from '../../../components/part-position.vue';
  import legendOrientation from '../../../components/legend-orientation.vue';

  export default {
      name: 'scatter',
      components: {
          settingColor,
          settingNumber,
          settingText,
          partPosition,
          legendOrientation
      },
      data () {
          return {
              chartMsg: {},
              titleText: '',
              colorStyle:['圆形','多边形'],
              circle:'圆形',
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
              this.chartMsg = $.extend(true, {}, radar[0].chartMsg, chartMsg);
          },
          updateChart () {
              this.$store.commit('setChartMsg',this.chartMsg);
              this.$events.emit('redraw_chart');
          },
          updateDataSerie (c) {
              this.chartMsg.series.forEach((item) => {
                  const serie = item.data;
                  serie[c.type].color = c.color;
              });
              this.updateChart();
          },
          removeRadar (index) {
              if (this.chartMsg.extra.series.length) {
                  this.chartMsg.extra.series.splice(index, 1);
                  this.updateChart();
              }
          },
          addRadar () {
              const option = {
                  type : 'area',
                  dashStyle : 'Solid',
                  value : 1,
                  name  : '预算拨款',
                  color : '#327EC8',
                  lineWidth:2 ,
                  lineColor:'#327EC8',
                  pointPlacement: 'between',
                  dataLabels: {
                      enabled: false,
                      color: '',
                      style: {
                          fontSize: 11
                      }
                  }
              };
              this.chartMsg.extra.series.push(option);
              this.updateChart();
          },
          isShow () {
              this.chartMsg.legend.enabled =!this.chartMsg.legend.enabled;
              this.updateChart();
          },
          updateCircle (circle) {
              if(circle=='圆形') {
                  this.chartMsg.yAxis.gridLineInterpolation = 'circle';
              }else{
                  this.chartMsg.yAxis.gridLineInterpolation = 'polygon';
              }
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
              $styleItem.on('click', 'h3', function () {
                  $(this).toggleClass('close');
                  $(this).parent().siblings('dd').toggle();
              });
          },
          setDataLabels (item) {
              item.enabled = !item.enabled;
              this.updateChart();
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
          updateOrientation (val) {
              this.chartMsg.legend.x = 0;
              this.chartMsg.legend.y = 0;
              switch (parseInt(val)) {
              case 1: {
                  this.chartMsg.legend.align = "left";
                  this.chartMsg.legend.verticalAlign = "top";
                  this.chartMsg.legend.layout = "horizontal";
                  break;
              }
              case 2: {
                  this.chartMsg.legend.align = "left";
                  this.chartMsg.legend.verticalAlign = "bottom";
                  this.chartMsg.legend.layout = "horizontal";
                  break;
              }
              case 3: {
                  this.chartMsg.legend.align = "left";
                  this.chartMsg.legend.verticalAlign = "top";
                  this.chartMsg.legend.layout = "vertical";
                  break;
              }
              case 4: {
                  this.chartMsg.legend.align = "right";
                  this.chartMsg.legend.verticalAlign = "top";
                  this.chartMsg.legend.layout = "vertical";
                  break;
              }
              }
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

<style>
  #radar .el-input-number--small {
    width: 70px;
  }
  #radar .el-input-number--small .el-input__inner {
    padding-right: 0;
    width: 60px;
    border-radius: 0;
  }
  #radar .el-slider__button-wrapper {
    top: -20px;
  }
  #radar .el-slider__runway.show-input {
    margin-right: 80px;
  }
  .highcharts-credits {
    display: none;
  }
</style>
