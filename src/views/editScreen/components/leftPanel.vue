<template>
<div class="big-left" :class="showLeft ? '':'switch-on'">
    <div class="mt">
        图层
        <span class="fr"><i :class="showLeft ? 'big-i4':'big-i3'" @click="showLeft=!showLeft"></i></span>
    </div>
    <div class="big-manage-wrap">
        <ul >
            <li ><i :class="[checkedLen >0 ? 'big-i5' : 'big-i5-1']" @click="upRecord"></i><div class="move">上移</div></li>
            <li><i :class="[checkedLen >0 ? 'big-i6' : 'big-i6-1']" @click="downRecord"></i><div class="move">下移</div></li>
            <li><i :class="[checkedLen >0 ? 'big-i7' : 'big-i7-1']" @click="toTop"></i><div class="move">置顶</div></li>
            <li><i :class="[checkedLen >0 ? 'big-i8' : 'big-i8-1']" @click="toBottom"></i><div class="move">置底</div></li>
            <li><i :class="[checkedLen >0 ? 'big-i9' : 'big-i9-1']" @click="deleteLayer"></i><div class="move">删除</div></li>
        </ul>
    </div>
    <div class="mc left-scroll">
      <div  class="clickArea">
        <div  class="lists"  @dragend="dropedend($event)" @ondrop ='droped($event)' @dragstart='drag($event)' @dragleave = 'dragLeave($event)' @dragenter='dropEnter($event)'   draggable="true" v-for="layer,$index in layers"   @click="setActiveLayer($index)" :style="{top: $index*40+'px'}" :id="$index">
            <i class="big-check mr10" :class="{'big-checked':layer.checked}" @click.stop="toggleCheck($index,$event)" ></i>
            <i class="big-i10 mr20" :class="{'big-i10-1':!layer.visiable}" @click.stop="layer.visiable=!layer.visiable"></i>
            <img :src="layer.img" width="50" height="30">
        </div>
        <div  @dragend="dropedend($event)" @ondrop ='droped($event)' @dragstart='drag($event)' @dragleave = 'dragLeave($event)' @dragenter='dropEnter($event)' class="dummy" style="position:absolute;height:100%;z-index:0;  "draggable="true">
        </div>
      </div>
    </div>
</div>
</template>
<script>

  // 为实现多选拖拽效果，在clickArea中新建一个dummydiv标签储存选中dom
import { mapGetters } from 'vuex';
let dom = null;
let cloneDom = null;
let drageIndex = null;
let domIndex = '';
let currentIndex= null;
export default {
      name: 'leftPanel',

      data () {
          return {
              checkedLayers: [],// 选中的layerId
              checkedLen: 0,// 选中的长度
              showLeft: true,// 显示左侧
              dom: ''
          };
      },
      mounted () {
          this.$events.on('addLayer', this.retCheck);
      },
      computed: {
          ...mapGetters(['layers', 'activeLayer','shiftClickLayers'])
      },
      watch: {
          checkedLen () {
              if (this.checkedLen == 1) {
//                this.$store.dispatch('setActiveLayer', this.layers[this.checkedLayers[0]]);
              } else {
                  this.$store.dispatch('setActiveLayer', null);
              }
              if (this.checkedLen >= 2) {
                  this.$store.commit('setShowAlign', true);
              } else {
                  this.$store.commit('setShowAlign', false);
              }
              if (this.checkedLen >= 3) {
                  this.$store.commit('setDistribute', true);
              } else {
                  this.$store.commit('setDistribute', false);
              }
          },

          shiftClickLayers (obj) {
              if(obj.__proto__.constructor!=Array) {
                  const arr =arr.push(obj);
                  obj =arr;
              }
              if(cloneDom == null)
                  cloneDom = $('.clickArea').find('.lists');
              this.checkedLen = 0;
              for (let i = 0; i < this.checkedLayers.length; i++) {
                  cloneDom = $('.dummy').find('.lists').eq(0);
                  $(cloneDom).attr("draggable", "true");
                  $('.clickArea').append(cloneDom);
              }
              this.checkedLayers = [];
              const indexPath = [];
              for (let i = 0; i < this.layers.length; i++) {
                  for(let j = 0; j < obj.length; j++) {
                      if (this.layers[i].id == obj[j].id) {
                          this.layers[i].checked = obj[j].checked;
                          this.checkedLen = this.checkedLen + 1;
                          this.checkedLayers.push(i);
                          indexPath.push(i);
                      }
                  }
              }
              for (let i = 0; i < this.layers.length; i++) {
                  for(let j = 0; j < indexPath.length; j++) {
                      if (cloneDom.eq(i).css('top') == (indexPath[j] * 40) + 'px') {
                          $(cloneDom).eq(i).attr("draggable", "flase");
                          $('.dummy').append(cloneDom.eq(i));
                      }
                  }
              }
          }

//          activeLayer (obj) {
//              if (!obj) return;
//              if(cloneDom == null)
//                  cloneDom = $('.clickArea').find('.lists');
//              this.checkedLen = 0;
//              for (let i = 0; i < this.checkedLayers.length; i++) {
//                  cloneDom = $('.dummy').find('.lists').eq(0);
//                  $(cloneDom).attr("draggable", "true");
//                  $('.clickArea').append(cloneDom);
//              }
//              this.checkedLayers = [];
//              let indexPath = 0;
//              for (let i = 0; i < this.layers.length; i++) {
//                  if (this.layers[i].id == obj.id) {
//                      this.layers[i].checked = true;
//                      this.checkedLen = this.checkedLen + 1;
//                      this.checkedLayers.push(i);
//                      indexPath = i;
//                  } else {
//                      this.layers[i].checked = false;
//                  }
//              }
//              for (let i = 0; i < this.layers.length; i++) {
//                  if (cloneDom.eq(i).css('top') == (indexPath * 40) + 'px') {
//                      $(cloneDom).eq(i).attr("draggable", "flase");
//                      $('.dummy').append(cloneDom.eq(i));
//                  }
//              }
//          }
      },
      methods: {
      // 设置active layer
          setActiveLayer (index) {
              cloneDom = $('.clickArea').find('.lists');
              for (let i = 0; i < this.layers.length; i++) {
                  if (index == i) {
                      this.layers[i].checked = true;
                      this.layers[i].selectBorder =true ;
                  } else {
                      this.layers[i].checked = false;
                      this.layers[i].selectBorder =false ;
                  }
          // 找到被选中的dom,插入dummyDIV中
                  if (cloneDom.eq(i).css('top') == (index * 40) + 'px') {
                      $(cloneDom).eq(i).attr("draggable", "flase");
                      $('.dummy').append(cloneDom.eq(i));
                  } else {
                      $(cloneDom).eq(i).attr("draggable", "ture");
                      $('.clickArea').append(cloneDom.eq(i));
                  }
              }
              this.checkLayers();
              this.$events.emit('toggleCheck');
          },

      // 勾选复选框
          toggleCheck (index, e) {
              this.layers[index].checked = !this.layers[index].checked;
              this.layers[index].selectBorder = !this.layers[index].selectBorder;
              if (this.layers[index].checked) {
                  cloneDom = e.currentTarget.parentNode;
                  $(cloneDom).attr("draggable", "flase");
                  $('.dummy').append(cloneDom);
              } else {
                  cloneDom = e.currentTarget.parentNode;
                  $(cloneDom).attr("draggable", "true");
                  $('.clickArea').append(cloneDom);
              }
              this.checkLayers();
              this.$events.emit('toggleCheck');
          },
      // 设置选中的layer id与选中的layer长度
          checkLayers () {
              this.checkedLen = 0;
              this.checkedLayers = [];
              for (let i = 0; i < this.layers.length; i++) {
                  if (this.layers[i].checked) {
                      this.checkedLen = this.checkedLen + 1;
                      this.checkedLayers.push(i);
                  }
              }
          },
      // 删除左侧layer
          deleteLayer () {
              if (!this.checkedLayers.length) {
                  return;
              }
              this.layerConfirm('提示', '组件删除后无法恢复， 是否确认删除？',
          () => {
              const arr = [];
              this.checkedLayers = this.checkedLayers.reverse();
              for (let i = 0; i < this.checkedLayers.length; i++) {
                  arr.push(this.layers[this.checkedLayers[i]].id);
                  this.layers.splice(this.checkedLayers[i], 1);
              }
            // 重置勾选
              this.checkedLayers = [];
              this.retCheck();
              this.checkLayers();
            // this.checkedLayers.push(0);
            // 触发给玉婷
              this.$events.emit('deleteLayers', arr);
              layer.closeAll();
          }
        );
          },
      // 交换位置
          swapItems (index1, index2) {
              this.layers[index1] = this.layers.splice(index2, 1, this.layers[index1])[0];
              this.setZIndex();
          },
      // 上移
          upRecord () {
              for (let i = 0; i < this.checkedLayers.length; i++) {
                  if (this.checkedLayers[i] != 0 && !this.layers[this.checkedLayers[i] - 1].checked) {
                      this.swapItems(this.checkedLayers[i], this.checkedLayers[i] - 1);
                      this.checkedLayers[i] = this.checkedLayers[i] - 1;
                  }
              }
          },
      // 下移
          downRecord () {
              for (let i = this.checkedLayers.length - 1; i >= 0; i--) {
                  if (this.checkedLayers[i] != this.layers.length - 1 && !this.layers[this.checkedLayers[i] + 1].checked) {
                      this.swapItems(this.checkedLayers[i], this.checkedLayers[i] + 1);
                      this.checkedLayers[i] = this.checkedLayers[i] + 1;
                  }
              }
          },
      // 置顶操作
          toTop () {
        // 正序放入头部
              for (let i = 0; i < this.checkedLayers.length; i++) {
                  if (this.checkedLayers[i] != 0 && !this.layers[this.checkedLayers[i] - 1].checked) {
                      this.swapItems(this.checkedLayers[i], i);
                      this.checkedLayers[i] = i;
                  }
              }
          },
      // 置底操作
          toBottom () {
        // 选中的layer长度
              const len = this.checkedLayers.length;
        // 倒序放入底部
              for (let i = len - 1; i >= 0; i--) {
                  if (this.checkedLayers[i] != this.layers.length - 1 && !this.layers[this.checkedLayers[i] + 1].checked) {
                      this.swapItems(this.checkedLayers[i], this.layers.length - (len - i));
                      this.checkedLayers[i] = this.layers.length - (len - i);
                  }
              }
          },
      // layers改变相应的Zindex改变
          setZIndex () {
              const len = this.layers.length;
              for (let i = 0; i < len; i++) {
                  this.layers[i].zIndex = 100 + len - i;
              }
        // 触发给玉婷
              this.$events.emit('changeIndex');
          },
      // 添加layer后重置
          retCheck () {
              const len = this.layers.length;
              for (let i = 0; i < len; i++) {
                  this.layers[i].zIndex = 100 + len - i;
                  this.layers[i].checked = false;
              }
              if (len > 0) {
//                  this.layers[0].checked = true;
              }
          },
          drag (e) {
              dom = e.currentTarget;
              drageIndex = $(dom).css('top');
        // 重要步骤
              $('.lists').css('z-index:1');
          },
          dropEnter (e) {
              const li = e.currentTarget;
              $(li).css('border', '1px solid #00c1de');
              domIndex = $(li);
              if (domIndex.attr('id') != undefined)
                  currentIndex = domIndex.attr('id');
          },
          dragLeave (e) {
              const li = e.currentTarget;
              $(li).css('border', ' 1px solid #dce4eb');
          },
      // 核心操作函数
          dropedend () {
              const loopLength = this.checkedLayers.length;
              const array = [];
              let bool = 'flase';
              for (let i = 0; i < loopLength; i++) {
                  if (drageIndex == '0px' && (this.checkedLayers[i] * 40) + 'px' != '0px') {
                      bool = 'ture';
                  }
              }
              if (bool == 'ture') {
                  for (let i = 0; i < loopLength; i++) {
                      array.push(this.layers[this.checkedLayers[i]]);
                      delete(this.layers[this.checkedLayers[i]]);
                  }
          // 把选中元素塞入layers,将dummyDOM树的元素删除。重新放入clickArea
                  for (let i = 0; i < array.length; i++) {
                      this.layers.splice(currentIndex, 0, array[i]);
                      cloneDom = $('.dummy').find('.lists').eq(0);
                      $(cloneDom).attr("draggable", "true");
                      $('.clickArea').append(cloneDom);
                  }
          // 删除空元素
                  for (let i = 0; i < this.layers.length; i++) {
                      if (this.layers[i] == null) {
                          this.layers.splice(i, 1);
                          i = i - 1;
                      }
                  }
          // 换位后,checkedLayers数组内容无变化，清空,重新插入下标
                  this.checkedLayers = [];
                  cloneDom = $('.clickArea').find('.lists');
                  for (let i = 0; i < this.layers.length; i++) {
                      if (this.layers[i].checked) {
              // checkedLayers插入下标
                          this.checkedLayers.push(i);
              // 找到所有Lists
                          for (let j = 0; j < this.layers.length; j++) {
                              cloneDom.eq(j).css('top');
                // 通过top的位置判断选中元素,重新插入dummy中,数据恢复原有状态。
                              if (cloneDom.eq(j).css('top') == (i * 40) + 'px') {
                                  $(cloneDom).eq(j).attr("draggable", "flase");
                                  $('.dummy').append(cloneDom.eq(j));
                              }
                          }
                      }
                  }
                  this.setZIndex();
              } else {
                  drageIndex = parseInt(drageIndex) / 40;
                  array.push(this.layers[drageIndex]);
                  delete(this.layers[drageIndex]);
          // 把选中元素塞入layers,将dummyDOM树的元素删除。重新放入clickArea

                  this.layers.splice(currentIndex, 0, array[0]);
                  for (let i = 0; i < this.checkedLayers.length; i++) {
                      cloneDom = $('.dummy').find('.lists').eq(0);
                      $(cloneDom).attr("draggable", "true");
                      $('.clickArea').append(cloneDom);
                  }

          // 删除空元素
                  for (let i = 0; i < this.layers.length; i++) {
                      if (this.layers[i] == null) {
                          this.layers.splice(i, 1);
                          i = i - 1;
                      }
                  }
          // 换位后,checkedLayers数组内容无变化，清空,重新插入下标
                  this.checkedLayers = [];
                  for (let i = 0; i < this.layers.length; i++) {
                      if (this.layers[i].checked) {
              // checkedLayers插入下标
                          this.checkedLayers.push(i);
              // 找到所有Lists
                          cloneDom = $('.clickArea').find('.lists');
                          for (let j = 0; j < this.layers.length; j++) {
                              cloneDom.eq(j).css('top');
                // 通过top的位置判断选中元素,重新插入dummy中,数据恢复原有状态。
                              if (cloneDom.eq(j).css('top') == (i * 40) + 'px') {
                                  $(cloneDom).eq(j).attr("draggable", "flase");
                                  $('.dummy').append(cloneDom.eq(j));
                              }
                          }
                      }
                  }
                  this.setZIndex();
              }
          }
      }

};



</script>
<style>
.left-scroll{
    overflow-y: auto;
    bottom: 0;
    position: absolute;
    top: 92px;
    width: 170px;
}
.move{
    position: absolute;
    top: 35px;
    left: -13px;
    width: 25px;
    height: 20px;
    line-height: 20px;
    background: #222;
    color: #fff;
    padding: 0 5px;
    z-index: 1112;
    font-size: 12px;
    border-radius: 3px;
    opacity: 0.9;
    display: none;
}
.move:before{
    position: absolute;
    top: -5px;
    width: 0;
    height: 0;
    left: 50%;
    margin-left: -5px;
    content: " ";
    border-bottom: 5px solid  #222 ;
    border-left: 5px solid transparent ;
    border-right: 5px solid transparent ;
}
.big-manage-wrap li{
    position: relative;
}
.big-manage-wrap li:hover .move{
    display: block;
}
.lists{
  position: absolute;
  width: 150px;
  border-bottom: 1px solid #dce4eb;
  line-height: 40px;
  height: 40px;
  overflow: hidden;
  padding-left: 20px;
  z-index: 1;

}
.dummy{
  border: 0px solid rgb(220, 228, 235)!important;
}
.clickArea{
   height: calc(100vh - 170px);
   position: relative;
 }
</style>
