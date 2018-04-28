<template>
  <div class="setting" id="gif">
    <div class="big-buildCon" >
      <div class="big-nav" id="m-setting">
        <dl class="fore">
          <dt><h3>轮播图</h3></dt>
        </dl>
        <dl>
          <dt>
            <a class="fl" href="#" @click.prevent="xOpen = !xOpen">
              <b class="unfold"></b><h3>全局样式</h3>
            </a>
          </dt>
          <dd :class="{ open: xOpen }">
            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <span class="left">字体</span>
                <div class="right">
                  <select class="u-select w100" v-model="chartMsg.fontFamily" @change="draw">
                    <option v-for="item in fontFamilyList" :value="item">{{item}}</option>
                  </select>
                </div>
                <setting-number name="字号" v-model="chartMsg.titleFontSize" @change="draw"></setting-number>
              </div>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>
            <a class="fl" href="#" @click.prevent="animation = !animation">
              <b class="unfold"></b><h3>动画</h3>
            </a>
          </dt>
          <dd :class="{ open: animation }">
            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <setting-number name="停顿(ms)" v-model="chartMsg.stopTime" @change="draw"></setting-number>
                <setting-number name="速度(ms)" v-model="chartMsg.animationSpeed" @change="draw"></setting-number>
                <span class="left">特效</span>
                <div class="right">
                  <select class="u-select w100" v-model="chartMsg.efficiency" @change="draw">
                    <option v-for="item in efficiency" :value="item">{{item}}</option>
                  </select>
                </div>
                <setting-number name="行" v-model="chartMsg.col" @change="draw" v-show = "chartMsg.efficiency == '马赛克'"></setting-number>
                <setting-number name="列" v-model="chartMsg.row" @change="draw" v-show = "chartMsg.efficiency == '马赛克'"></setting-number>
              </div>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>
            <a class="fl" href="#" @click.prevent="picOpen = !picOpen">
              <b class="unfold"></b><h3>图片</h3>
            </a>
          </dt>
          <dd :class="{ open: picOpen }">
            <span class="gui-field-name">背景图</span>
              <div class="gui-field-component">
                <label class="gui-label-file">
                  <img class="gui-image-value">
                  <span>点击上传图片</span>
                </label>
                <form id="upfile" >
                  <input type="file" name="file" class="gui-input-file" @change="upload()" id='file'>
                  <!--<input type="hidden" name="layerId" :value="activeLayer.id">-->
                  <!--<input type="hidden" name="bigScreenId" :value="screenBasicMsg.id">-->
                </form>
              </div>
            <dt>
             <h3>缩放方式</h3>
            </dt>
              <div class="big-rule-box m-setting">
                <div class="item clearfloat">
                  <div class="scales" v-for="(item,index) in scales">
                    <label @click="selectScale(item,index)"><i class="radio mr5" :class="{'radio-check': scaleIndex === index} "></i>{{item}}</label>
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        <dl>
          <dt>
            <a class="fl" href="#" @click.prevent="descriptionl =!descriptionl">
              <b class="unfold"></b><h3>描述</h3>
            </a>
          <div class="fun-show"@click.stop="isShow()" ><i class="check" :class="{checked: chartMsg.desEnabled}"></i>显示</div>
          </dt>
          <dd :class="{ open: descriptionl }">
            <div class="big-rule-box m-setting">
              <div class="item clearfloat">
                <span class="left">背景颜色</span>
                <div class="right">
                  <select class="u-select w100" v-model="chartMsg.colorStyleText" @change="toggle(chartMsg.colorStyleText)">
                    <option v-for="item in colorStyle" :value="item">{{item}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div v-show="showColor" class="big-rule-box m-setting">
              <setting-color name="开始颜色" v-model="chartMsg.beginColor" @change="draw"></setting-color>
              <setting-color name="结束颜色" v-model="chartMsg.endColor" @change="draw"></setting-color>
              <setting-number name="角度" v-model="chartMsg.deg"  @change="draw"></setting-number>
            </div>
            <div v-show="!showColor" class="big-rule-box m-setting">
              <setting-color name="颜色" v-model="chartMsg.singleColor" @change="draw"></setting-color>
            </div>
            <div class="big-rule-box m-setting">
              <setting-color name="文字颜色" v-model="chartMsg.textColor" @change="draw"></setting-color>
              <setting-number name="长度%" v-model="chartMsg.textLabelLength "  @change="draw"></setting-number>
              <setting-number name="高度%" v-model="chartMsg.textLabelWidth"  @change="draw"></setting-number>
              <setting-number name="上边距" v-model="chartMsg.marginTop "  @change="draw"></setting-number>
              <setting-number name="左边距" v-model="chartMsg.marginLeft"  @change="draw"></setting-number>
              <div class="big-rule-box m-setting">
                <div class="item clearfloat">
                  <span class="left">对齐方式</span>
                  <div class="right">
                    <select class="u-select w100" v-model="chartMsg.alignmentStyle" @change="draw">
                      <option v-for="item in alignment" :value="item">{{item}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </dd>
        </dl>
        <dl>
          <dt>
            <a class="fl" href="#" @click.prevent="dots =!dots">
              <b class="unfold"></b><h3>圆点</h3>
            </a>
          <div class="fun-show"@click.stop="dotShow()" ><i class="check" :class="{checked: chartMsg.dotEnabled}"></i>显示</div>
          </dt>
          <dd :class="{ open: dots }">
            <div class="big-rule-box m-setting">
              <setting-color name="圆点颜色" v-model="chartMsg.dotColor" @change="draw"></setting-color>
              <setting-color name="当前颜色" v-model="chartMsg.currentColor" @change="draw"></setting-color>
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
  import settingNumber from '../../../components/setting-number.vue';
  import settingText from '../../../components/setting-text.vue';
  import settingColor from '../../../components/setting-color.vue';
  export default{
      data () {
          const activeLayer = this.$store.state.screen.activeLayer;
          return {
              fontFamilyList : ['微软雅黑','宋体','黑体','隶书','幼圆','tahoma'],
              efficiency:['水平滚动','垂直滚动','淡入淡出','马赛克'],
              colorStyle:['单色','渐变色'],
              alignment:['居左','居中','居右'],
              xOpen : true,
              animation:true,
              picOpen:true,
              descriptionl:true,
              dots:true,
              scales: ['等比例缩放宽度铺满','等比例缩放高度铺满','全屏铺满'],
              titleBackGroundColor:['单色','渐变色'],
              chartMsg : activeLayer.chartMsg,
              scaleIndex: 0,
              showColor:true
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

      components: {layerPosition,settingNumber,settingText,settingColor},

      methods:{
          draw () {
              this.$events.emit('redraw_chart');
          },
          selectScale (item,index) {
              this.scaleIndex = index;
              this.chartMsg.zoomMode = item;
              this.draw ();
          },
          isShow () {
              this.chartMsg.desEnabled =!this.chartMsg.desEnabled;
              this.draw();
          },
          dotShow () {
              this.chartMsg.dotEnabled =!this.chartMsg.dotEnabled;
              this.draw();
          },
          toggle (item) {
              if(item=='单色')
                  this.showColor= false;
              else
                  this.showColor= true;
              this.draw ();
          },
          upload () {
              const file= document.getElementById('file').files[0];
              const isJPG = file.type === 'image/jpeg';
              const isPNG = file.type === 'image/png';
              const isLt1M = file.size / 1024 / 1024 < 1;
              if (!isJPG && !isPNG) {
                  this.$message.error('上传图片只能是 JPG/PNG 格式!');
                  return;
              }
              if (!isLt1M) {
                  this.$message.error('上传背景图片大小不能超过 1MB!');
                  return;
              }
              const _this = this;
              const form = new FormData(document.getElementById("upfile"));
              $.ajax({
                  url:"/layer/uploadCarouselPic/"+_this.activeLayer.id,
                  type:"post",
                  data:form,
                  processData:false,
                  contentType:false,
                  dataType:"json",
                  success:function (data) {
                      const layerUrl = data.data;
                      const Url ='layer'+layerUrl;
                      const item = {};
                      item.description = '';
                      item.url = Url;
                      _this.chartMsg.src.unshift(item);
                      _this.draw();
                  }
              });
          }

      }
  };

</script>

<style>
  #gif #m-setting{
    overflow: initial;
    overflow-x: initial;
  }
  .scales{
    line-height: 40px;
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
  .big-nav{

  }
</style>
