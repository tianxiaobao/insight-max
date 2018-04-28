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
</style>

<template>
  <div class="setting">
    <div class="big-buildCon" id="con-detail-1">
      <div class="big-nav">
        <dl class="fore">
          <dt><h3>环形饼图</h3></dt>
        </dl>
        <!--  图表 -->
        <dl class="style-item">
          <dt><b class="unfold"></b><h3>图表</h3></dt>
          <dd>
            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <span class="left">背景颜色</span>
                <div class="right">
                  <set-color :color="bgkColor" @change="updateBGK"></set-color>
                </div>
              </div>
            </div>

            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <span class="left">边框颜色</span>
                <div class="right">
                  <set-color :color="brcColor" @change="updateBRC"></set-color>
                </div>
              </div>
            </div>
            <div class="big-rule-box m-setting">
              <input-number :prop="borSize" @change="updateBorSize"></input-number>
            </div>
            <div class="big-rule-box m-setting clearfloat">
            <div class="item">
                <input-number :prop="stomach" @change="updatestomach"></input-number>
            </div>
            </div>


            <div class="big-rule-box m-setting">
              <h3>边距</h3>
              <input-number :prop="margin.top" @change="updateMargin"></input-number>
              <input-number :prop="margin.bottom" @change="updateMargin"></input-number>
              <input-number :prop="margin.left" @change="updateMargin"></input-number>
              <input-number :prop="margin.right" @change="updateMargin"></input-number>
            </div>
          </dd>
        </dl>
        <!-- 主标题 -->
        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>主标题</h3></dt>
          <dd>
            <set-title :title="title.name" :fontSize="title.fontSize" :color="title.color" :x="title.x" :y="title.y" @change="updateTitle"></set-title>
          </dd>
        </dl>
        <!-- 副标题 -->
        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>副标题</h3></dt>
          <dd>
            <set-title :title="subTitle.name" :fontSize="subTitle.fontSize" :color="subTitle.color" :x="subTitle.x" :y="subTitle.y" @change="updateSubTitle"></set-title>
          </dd>
        </dl>
        <!-- 数据 -->
        <dl class="style-item">
          <dt><b class="unfold close"></b><h3>数据</h3></dt>
          <dd>
            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <span class="left">边框颜色</span>
                <div class="right">
                  <set-color :color="data.borColor" @change="updateDataBRC"></set-color>
                </div>
              </div>
            </div>

            <div class="big-rule-box m-setting clearfloat">
              <input-number :prop="data.borw" @change="updateDataBorSize"></input-number>
            </div>

            <div class="big-rule-box m-setting clearfloat" v-for="(serie, index) of data.serie">
              <div class="item">
                <span class="left">{{`系列${index+1}颜色`}}</span>
                <div class="right">
                  <set-color :color="serie" :type="index" @change="updateDataSerie"></set-color>
                </div>
              </div>
            </div>
          </dd>
        </dl>
        <!-- 数据标签 -->
        <dl class="style-item">
          <dt>
            <b class="unfold close"></b><h3>数据标签</h3>
          <div class="fun-show" @click.stop="dataLabelShow"><i class="check" :class="{checked: dataLabel.show}"></i>显示</div>
          </dt>
          <dd>
            <div class="big-rule-box m-setting">
              <input-number :prop="dataLabel.fontSize" @change="updateDataLabelFontSize"></input-number>
            </div>

            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <span class="left">字体颜色</span>
                <div class="right">
                  <set-color :color="dataLabel.fontColor.color" :type="dataLabel.fontColor.type" @change="updateDataLabelFontColor"></set-color>
                </div>
              </div>
            </div>

            <div class="big-rule-box m-setting">
                <set-type :prop = "tipType" @change="updateType"></set-type>
            </div>

            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <span class="left">标签距中心</span>
                <div class="right">
                  <div class="slider-wrap">
                    <el-slider v-model="distance" :max="100" :min="-100" @change="updateDistance"></el-slider>
                  </div>
                </div>
              </div>
            </div>

            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <span class="left">小数点数</span>
                    <div class="right">
                      <div class="slider-wrap">
                      <el-slider v-model="float" :max="9" :min="0" @change="updateFloat"></el-slider>
                    </div>
                </div>
            </div>
            </div>
          </dd>
        </dl>
        <!-- 图例 -->
        <dl class="style-item">
          <dt>
            <b class="unfold close"></b><h3>图例</h3>
          <div class="fun-show" @click.stop="legendShow"><i class="check" :class="{checked: legend.show}"></i>显示</div>
          </dt>
          <dd>
            <!-- <div class="big-rule-box m-setting clearfloat">
              <div class="fl radio-box">水平对齐</div>
              <div class="fl radio-box" @click="legendAlign('left')"><i class="radio mr5 " :class="{'radio-check': legend.align === 'left'}"></i>左</div>
              <div class="fl radio-box" @click="legendAlign('center')"><i class="radio mr5" :class="{'radio-check': legend.align === 'center'}"></i>中</div>
              <div class="fl radio-box" @click="legendAlign('right')"><i class="radio mr5" :class="{'radio-check': legend.align === 'right'}"></i>右</div>
            </div>

            <div class="big-rule-box m-setting clearfloat">
              <div class="fl radio-box">垂直对齐</div>
              <div class="fl radio-box" @click="legendVertical('top')"><i class="radio mr5" :class="{'radio-check': legend.verticalAlign === 'top'}"></i>上</div>
              <div class="fl radio-box" @click="legendVertical('middle')"><i class="radio mr5" :class="{'radio-check': legend.verticalAlign === 'middle'}"></i>中</div>
              <div class="fl radio-box" @click="legendVertical('bottom')"><i class="radio mr5" :class="{'radio-check': legend.verticalAlign === 'bottom'}"></i>下</div>
            </div> -->

            <div class="big-rule-box m-setting">
              <input-number :prop="legend.fontSize" @change="updateLegendFontSize"></input-number>
            </div>

            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <span class="left">字体颜色</span>
                <div class="right">
                  <set-color :color="legend.fontColor.color" @change="updateLegendFontColor"></set-color>
                </div>
              </div>
            </div>

            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <span class="left">背景颜色</span>
                <div class="right">
                  <set-color :color="legend.background.color" @change="updateLegendBG"></set-color>
                </div>
              </div>
            </div>

            <div class="big-rule-box m-setting">
              <input-number :prop="legend.border" @change="updateLegendBorderWH"></input-number>
            </div>

            <div class="big-rule-box m-setting clearfloat">
              <div class="item">
                <span class="left">边框颜色</span>
                <div class="right">
                  <set-color :color="legend.borderColor.color" @change="updateLegendBORBG"></set-color>
                </div>
              </div>
            </div>
            <div class="big-rule-box m-setting clearfloat">
                <legend-orientation @updatePositon = "updateOrientation"></legend-orientation>
            </div>

            <div class="big-rule-box m-setting clearfloat">
                <part-position :position="chartMsg.legend" v-on:updatePositon="message()"></part-position>
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
                <div class="tt">高度</div>
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
  import pie from '@/store/modules/defaultFormat/pie';
  import setColor from '@/components/set-color.vue';
  import inputNumber from '@/components/input-number.vue';
  import setType from '@/components/setting-type.vue';
  import setTitle from '@/components/title/index.vue';
  import partPosition from '../../../components/part-position.vue';
  import legendOrientation from '../../../components/legend-orientation.vue';

  export default {
      name: 'base-pie',
      components: {
          setColor,
          inputNumber,
          setTitle,
          setType,
          partPosition,
          legendOrientation
      },
      data () {
          return {
              bgkColor: '',
              brcColor: '',
              borSize: {title: '边框宽度', value: 1 },
              stomach :{title: '空心度', value: 60},
              margin: {
                  top: {title: '顶部', value: 0 },
                  bottom: {title: '底部', value: 0 },
                  left: {title: '左侧', value: 0 },
                  right: {title: '右侧', value: 0 }
              },
              title: {name: '', fontSize: '', color: '#000', x: 0, y: 18 },
              subTitle: {name: '', fontSize: '', color: '#ccc', x: 0, y: 0 },

              data: {borColor: '#FF0', borw: {title: '边框宽度', value: 40 }, serie: [] },
              dataLabel: {
                  show: true,
                  format: '',
                  fontSize: {title: '字号', value: 30 },
                  fontColor: {color: '#FFF', type: 'label' }
              },
              labelCategory: {
                  show: true,
                  fontSize: {title: '字号', value: 30 },
                  fontColor: {color: '#FFF', type: 'category' }
              },
              float: 1,
              tipType: {
                  title: '样式',
                  data:[
                    {key: 3, val: '两者'},
                    {key: 1, val: '类别'},
                    {key: 2, val: '资料值'}
                  ]
              },
              tipFlag:3,
              floatFloat: '',
              distance: 30,
              legend: {
                  show: true,
                  align: '',
                  verticalAlign: '',
                  fontSize: {title: '字号', value: 0 },
                  fontColor: {color: '#FFF', type: '' },
                  background: {color: '', type: '' },
                  borderColor: {color: '', type: '' },
                  border: {title: '边框宽高', value: 0 }
              },
              chart: {width: 0, height: 0, x: 0, y: 0 }
          };
      },
      mounted () {
          this.$nextTick(() => {
              this.initData(this.chartMsg);
              this.toggleItem();
          });
      },
      computed: {
          ...mapGetters(['layers','activeLayer']),
          chartMsg () {
              const newChartMsg = $.extend(true, {}, pie[0].chartMsg, this.activeLayer.chartMsg);
              return newChartMsg;
          }
      },
      watch: {
      // 'activeLayer.chartMsg': function (n) {
      //     this.initData(n);
      // },
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
          initData (chartMsg) {
              this.bgkColor = chartMsg.chart.backgroundColor;
              this.brcColor = chartMsg.chart.borderColor;
              this.borSize.value = chartMsg.chart.borderWidth;
              this.margin.top.value = chartMsg.chart.margin[0];
              this.margin.bottom.value = chartMsg.chart.margin[2];
              this.margin.left.value = chartMsg.chart.margin[3];
              this.margin.right.value = chartMsg.chart.margin[1];

              this.title = {
                  name: regs.escapeHtml(chartMsg.title.text),
                  fontSize: chartMsg.title.style.fontSize,
                  color: chartMsg.title.style.color,
                  x: chartMsg.title.x,
                  y: chartMsg.title.y
              };

              this.subTitle = {
                  name: regs.escapeHtml(chartMsg.subtitle.text),
                  fontSize: chartMsg.subtitle.style.fontSize,
                  color: chartMsg.subtitle.style.color,
                  x: chartMsg.subtitle.x,
                  y: chartMsg.subtitle.y
              };

              this.data.borColor = chartMsg.plotOptions.pie.borderColor;
              this.data.borw.value = chartMsg.plotOptions.pie.borderWidth;

              chartMsg.series.forEach((item) => {
                  const serie = item.data;
                  serie.forEach((s) => {
                      const color = s.color || '';
                      this.data.serie.push(color);
                  });
              });

              this.dataLabel.show = chartMsg.plotOptions.pie.dataLabels.enabled;
              this.dataLabel.format = chartMsg.plotOptions.pie.dataLabels.format;
              this.dataLabel.fontColor.color = chartMsg.plotOptions.pie.dataLabels.style.color;
              this.dataLabel.fontSize.value = chartMsg.plotOptions.pie.dataLabels.style.fontSize;

              this.legend.show = chartMsg.plotOptions.pie.showInLegend;
              this.legend.align = chartMsg.legend.align;
              this.legend.verticalAlign = chartMsg.legend.verticalAlign;
              this.legend.fontSize.value = chartMsg.legend.itemStyle.fontSize;
              this.legend.fontColor.color = chartMsg.legend.itemStyle.color;
              this.legend.background.color = chartMsg.legend.backgroundColor;
              this.legend.borderColor.color = chartMsg.legend.borderColor;
              this.legend.border.value = chartMsg.legend.borderWidth;

              this.float = chartMsg.tooltip.valueDecimals;
              this.distance = chartMsg.plotOptions.pie.dataLabels.distance;

              this.chart.width = parseInt(this.activeLayer.width);
              this.chart.height = parseInt(this.activeLayer.height);
              this.chart.x = parseInt(this.activeLayer.x);
              this.chart.y = parseInt(this.activeLayer.y);
          },
          message () {
              this.$store.commit('setChartMsg', this.chartMsg);
              this.$events.emit('update_chart');
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
          updateBGK (c) {
              this.bgkColor = c.color;
              this.chartMsg.chart.backgroundColor = this.bgkColor;
              this.message();
          },
          updateBRC (c) {
              this.brcColor = c.color;
              this.chartMsg.chart.borderColor = this.brcColor;
              this.message();
          },
          updateBorSize (value) {
              this.borSize.value = value;
              this.chartMsg.chart.borderWidth = value;
              this.message();
          },
          updatestomach (value) {
              this.stomach.value = value;
              this.chartMsg.series[0].innerSize = value;
              this.message();
          },
          updateMargin (value, prop) {
              switch(prop.title) {
              case '顶部' :
                  this.margin.top.value = value;
                  break;
              case '底部' :
                  this.margin.bottom.value = value;
                  break;
              case '左侧' :
                  this.margin.left.value = value;
                  break;
              case '右侧' :
                  this.margin.right.value = value;
                  break;
              }
              this.chartMsg.chart.margin = [this.margin.top.value, this.margin.right.value, this.margin.bottom.value, this.margin.left.value];
              this.message();
          },
          updateTitle (prop) {
              this.chartMsg.title.text = regs.htmlEscape(prop.title);
              this.chartMsg.title.style.fontSize = prop.fontSize;
              this.chartMsg.title.style.color = prop.color;
              this.chartMsg.title.x = parseInt(prop.x);
              this.chartMsg.title.y = parseInt(prop.y);
              this.message();
          },
          updateSubTitle (prop) {
              this.chartMsg.subtitle.text = regs.htmlEscape(prop.title);
              this.chartMsg.subtitle.style.fontSize = prop.fontSize;
              this.chartMsg.subtitle.style.color = prop.color;
              this.chartMsg.subtitle.x = parseInt(prop.x);
              this.chartMsg.subtitle.y = parseInt(prop.y);
              this.message();
          },
          updateDataBRC (c) {
              this.chartMsg.plotOptions.pie.borderColor = c.color;
              this.message();
          },
          updateDataBorSize (value) {
              this.chartMsg.plotOptions.pie.borderWidth = value;
              this.message();
          },
          updateDataSerie (c) {
              this.chartMsg.series.forEach((item) => {
                  const serie = item.data;
                  serie[c.type].color = c.color;
              });
              this.message();
          },
          updateDataLabelFontSize (value) {
              this.chartMsg.plotOptions.pie.dataLabels.style.fontSize = value;
              this.message();
          },
          updateDataLabelFontColor (c) {
              this.chartMsg.plotOptions.pie.dataLabels.style.color = c.color;
              this.message();
          },
          dataLabelShow () {
              this.dataLabel.show = !this.dataLabel.show;
              this.chartMsg.plotOptions.pie.dataLabels.enabled = this.dataLabel.show;
              this.message();
          },
          legendShow () {
              this.legend.show = !this.legend.show;
              this.chartMsg.plotOptions.pie.showInLegend = this.legend.show;
              this.message();
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
              this.message();
          },
          // legendAlign (value) {
          //     this.legend.align = value;
          //     this.chartMsg.legend.align = value;
          //     this.message();
          // },
          // legendVertical (value) {
          //     this.legend.verticalAlign = value;
          //     this.chartMsg.legend.verticalAlign = value;
          //     this.message();
          // },
          updateType (val) {
              this.tipFlag = parseInt(val);
              switch (parseInt(val)) {
              case 1: {
                  this.chartMsg.plotOptions.pie.dataLabels.format = `<b>{point.name}</b>`;
                  break;
              }
              case 2: {
                  this.chartMsg.plotOptions.pie.dataLabels.format = `<span>{point.percentage:.${this.floatFloat || 1}f}%</span>`;
                  break;
              }
              case 3: {
                  this.chartMsg.plotOptions.pie.dataLabels.format = `<b>{point.name}</b>: <span>{point.percentage:.${this.floatFloat || 1}f}%</span>`;
                  break;
              }
              }
              this.message();
          },
          updateDistance () {
              this.chartMsg.plotOptions.pie.dataLabels.distance = this.distance;
              this.message();
          },
          updateFloat () {
              this.floatFloat = this.float;
              const value = this.float;
              switch (this.tipFlag) {
              case 1: break;
              case 2: {
                  this.chartMsg.plotOptions.pie.dataLabels.format = `<span>{point.percentage:.${value}f}%</span>`;
                  this.chartMsg.tooltip.valueDecimals = value;
                  this.message();
                  break;
              }
              case 3: {
                  this.chartMsg.plotOptions.pie.dataLabels.format = `<b>{point.name}</b>: <span>{point.percentage:.${value}f}%</span>`;
                  this.chartMsg.tooltip.valueDecimals = value;
                  this.message();
                  break;
              }
              }
          },
          updateLegendFontSize (value) {
              this.chartMsg.legend.itemStyle.fontSize = value;
              this.message();
          },
          updateLegendFontColor (c) {
              this.chartMsg.legend.itemStyle.color = c.color;
              this.message();
          },
          updateLegendBG (c) {
              this.chartMsg.legend.backgroundColor = c.color;
              this.message();
          },
          updateLegendBORBG (c) {
              this.chartMsg.legend.borderColor = c.color;
              this.message();
          },
          updateLegendBorderWH (value) {
              this.chartMsg.legend.borderWidth = value;
              this.message();
          },
          setChartW () {
              this.activeLayer.width = this.chart.width;
              this.$events.emit('redraw_chart');
          },
          setChartH () {
              this.activeLayer.height = this.chart.height;
              this.$events.emit('redraw_chart');
          },
          setChartX () {
              this.activeLayer.x = this.chart.x;
              this.$events.emit('redraw_chart');
          },
          setChartY () {
              this.activeLayer.y = this.chart.y;
              this.$events.emit('redraw_chart');
          }
      }
  };
</script>
