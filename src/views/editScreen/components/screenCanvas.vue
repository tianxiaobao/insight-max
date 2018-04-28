<template>
  <div>
    <div class="big-content" :class="{'switch-on': !showRight}" @mousedown="clearActiveLayer">
      <div style="display:none">{{trigger}}</div>
      <div class="big-sub-content "
           :style="{'height': canvas.height + 'px',
                         'width': canvas.width + 'px',
                         'background-image': `url(${canvas.bgUrl})`
                        }"
           @mousedown="clearActiveLayer">
        <div  class="item resizable"
              v-for="layer,$index in displayLayers"
              :style="{'z-index': layer.zIndex,
                             'height': layer.height + 'px',
                             'width': layer.width + 'px',
                             'left': layer.x + 'px',
                             'top': layer.y + 'px'
                            }"
              :index="$index"
              @mousedown="setActiveLayer($event, layer)"
              :class="{'active': activeLayer == layer,
                             'checked': layer.checked,
                             'selectBorder':layer.selectBorder,
                            }"
              v-show="layer.visiable && !layer.deleted"
              :data-type="layer.chartType">
                    <span class="layer-icon">
                        <i class="icon-eye" title="隐藏" @click="layer.visiable=false"></i>
                        <i class="icon-copy" title="复制" @click="iconCopyLayer(layer)"></i>
                        <i class="icon-trash" title="删除" @click="iconDeleteLayer(layer)"></i>
                    </span>
          <!-- <div class="white">{{ layer.id }}</div> -->
          <div :id="layer.id" class="layer-canvas"></div>
        </div>

        <!--div class="item">
            <div class="border pad20">
                <img src="../../../images/ad/ad10.png" width="320" height="225">
                <b></b>
                <span>
                    <i class="big-ci1"></i><i class="big-ci2"></i><i class="big-ci3"></i>
                </span>
            </div>
        </div-->
      </div>
    </div>
    <div class="big-bottom-content">
      <span class="canvas-slider-text">缩放比：{{ zoomDisplay }}</span>
      <div class="canvas-slider">
        <el-slider v-model="zoom" @change="changeZoom" :show-tooltip="false" :step="0.01" :max="3" :min="0.01"></el-slider>
      </div>
    </div>
  </div>
</template>
<script>
import highcharts from 'highcharts';
import { mapGetters } from 'vuex';
export default {
    name: 'screenCanvas',
    data () {
        return {
            // 暂存鼠标位置
            click: {
                x: null,
                y: null
            },
            zoom: 1, // 放大缩小比例
            displayLayers: [],
            trigger: false,
            timer: null,
            type: true,
            shiftClick: '',
            clickShiftList: [],
            activeLayerS: []
        };
    },
    mounted () {
        // 添加监听
        this.$events.on('initPage', this.initPage);
        this.$events.on('update_chart', this.updateChart);
        this.$events.on('redraw_chart', this.redrawChart);
        this.$events.on('addLayer', this.addLayer);
        this.$events.on('changeIndex', this.triggerIt);
        this.$events.on('toggleCheck', this.triggerIt);
        this.$events.on('deleteLayers', this.deleteLayers);
        document.addEventListener('keydown', this.moveGrid);
        document.addEventListener('keydown', this.clickShift);
        document.addEventListener('keyup', () => {
            this.shiftClick = false;
            $('.resizable').unbind("click");
            this.timer = setTimeout(() => {
                $('.big-content').off('scroll');
            }, 200);
        });
    },
    computed: {
        ...mapGetters(['layers', 'activeLayer', 'canvas', 'showRight']),
        zoomDisplay () {
            return this.zoom.toFixed(2);
        }
    },
    watch: {
        canvas: {
            handler: function () {
                this.setScale();
            },
            deep: true
        }
    },
    methods: {
        uid (len, radix) {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
                uuid = [];
            let i;

            radix = radix || chars.length;

            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                // rfc4122, version 4 form
                let r;

                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        },
        iconCopyLayer (layer) {
            const id = this.uid(8, 16);
            const newLayer = $.extend(true, {}, layer);
            newLayer.id = id;
            newLayer.zIndex = 100 + this.layers.length;
            newLayer.x += 50;
            newLayer.y += 50;
            newLayer.checked = false;
            newLayer.chart = null;
            if(newLayer.chartType === 'flop') newLayer.chartMsg.flop.number.oldNumber = 0;
            this.layers.unshift(newLayer);
            const changeLayer = Promise.resolve(this.displayLayers.push(newLayer));
            changeLayer.then(() => {
                this.initItem();
                this.drawLayer(newLayer);
            });
        },
        // 图层上的删除快捷键
        iconDeleteLayer (layerD) {
            this.layerConfirm('提示', '组件删除后无法恢复， 是否确认删除？',
                () => {
                    layerD.deleted = true;
                    const index = this.layers.indexOf(layerD);
                    this.layers.splice(index, 1);
                    this.trigger = !this.trigger;
                    layer.closeAll();
                }
            );
        },
        changeZoom () {
            const subContainer = $('.big-sub-content')[0];
            subContainer.style.transform = 'scale(' + this.zoom + ')';
        },
        updateChart () {
            this.$store.commit('setUpdated', true);
            const layer = this.activeLayer;
            if (layer.chartType === 'highchart') {
                layer.chart = highcharts.chart(layer.id, layer.chartMsg);
            }
            this.$store.commit('triggerChartCallback', layer);
        },

        redrawChart (layer = this.activeLayer) {
            this.$store.commit('setUpdated', true);
            this.drawLayer(layer);
        },
        drawLayer (layer) {
            this.clickShiftList = []; this.activeLayerS = [];
            for (let i = 0; i < this.displayLayers.length; i++) {
                if (this.displayLayers[i].checked == true) {
                    this.clickShiftList.push(i);
                    this.activeLayerS.push(this.displayLayers[i]);
                }
            }
            this.$store.commit('setSeries', layer);
            if (layer.chartType === 'highchart') {
                setTimeout(() => {
                    layer.chart = highcharts.chart(layer.id, layer.chartMsg);
                });
            }
            setTimeout(() => {
                this.$store.commit('triggerChartCallback', layer);
            });
        },
        initPage () {
            this.setScale();
            // $(window).resize(this.setScale);
            Promise.resolve(this.displayLayers = [...this.layers])
                .then(() => {
                    setTimeout(() => {
                        this.initItem();
                        this.reDrawAll();
                        this.$store.dispatch('setActiveLayer', this.layers[0]);
                    });
                });
        },
        deleteLayers (deleteLayers) {
            this.$store.commit('setUpdated', true);
            const obj = {};
            deleteLayers.forEach((id) => {
                obj[id] = true;
            });
            this.displayLayers.forEach((item) => {
                if (obj[item.id]) {
                    item.deleted = true;
                }
            });
            this.trigger = !this.trigger;
        },
        clearActiveLayer () {
            setTimeout(() => {
                this.$store.dispatch('setActiveLayer', null);
                this.$store.dispatch('setShiftClickLayers', []);
            }, 0);
        },
        triggerIt () {
            this.clickShiftList = []; this.activeLayerS = [];
            for (let i = 0; i < this.displayLayers.length; i++) {
                if (this.displayLayers[i].checked == true) {
                    this.clickShiftList.push(i);
                    this.activeLayerS.push(this.displayLayers[i]);
                }
            }
            this.trigger = !this.trigger;
        },
        reDrawAll () {
            this.layers.forEach(layer => this.drawLayer(layer));
        },
        // 1
        onResizeStart (e) {
            $(".resizable").unbind("click");
            this.click.x = e.clientX;
            this.click.y = e.clientY;
        },
        //      2
        onResize (e, el) {
            const original = el.originalSize;
            el.size = {
                width: (e.clientX - this.click.x) / this.zoom + original.width,
                height: (e.clientY - this.click.y) / this.zoom + original.height
            };
            el.element[0].style.width = el.size.width + 'px';
            el.element[0].style.height = el.size.height + 'px';
        },
        //       3
        onResizeEnd (e, el) {
            if (this.clickShiftList.length > 1 && this.activeLayer.selectBorder == true) {
                const resolveFunction = () => {
                    for (let i = 0; i < this.clickShiftList.length; i++) {
                        this.$store.commit('setUpdated', true);
                        this.activeLayerS[i].width += (e.clientX - this.click.x) / this.zoom;
                        this.activeLayerS[i].height += (e.clientY - this.click.y) / this.zoom;
                    }
                };
                Promise.resolve(resolveFunction()).then(() => {
                    for (let i = 0; i < this.clickShiftList.length; i++) {
                        this.activeLayerS[i].chart.reflow();
                    }
                });
            } else {
                this.$store.commit('setUpdated', true);
                const original = el.originalSize;
                el.size = {
                    width: (e.clientX - this.click.x) / this.zoom + original.width,
                    height: (e.clientY - this.click.y) / this.zoom + original.height
                };
                el.element[0].style.width = el.size.width + 'px';
                el.element[0].style.height = el.size.height + 'px';
                this.activeLayer.height = el.size.height;
                this.activeLayer.width = el.size.width;
                this.activeLayer.chart.reflow();
            }
            this.$forceUpdate();
            $(".resizable").bind("click");
        },
        //      1
        onDragStart (e) {
            $(".resizable").unbind("click");
            this.click.x = e.clientX;
            this.click.y = e.clientY;
        },
        //      2
        onDrag (e, el) {
            const original = el.originalPosition;
            const snap = this.canvas.snap;
            const L = (e.clientX - this.click.x + original.left) / this.zoom;
            const T = (e.clientY - this.click.y + original.top) / this.zoom;
            const shiftX = (L / snap).toFixed() * snap - this.activeLayer.x;
            const shiftY = (T / snap).toFixed() * snap - this.activeLayer.y;
            if (this.clickShiftList.length > 0 && this.activeLayer.selectBorder == true) {
                for (let i = 0; i < this.clickShiftList.length; i++) {
                    this.activeLayerS[i].y += shiftY;
                    this.activeLayerS[i].x += shiftX;
                }
            }
            el.position = {
                left: (L / snap).toFixed() * snap,
                top: (T / snap).toFixed() * snap
            };
        },
        //      3
        onDragEnd (e, el) {
            this.$store.commit('setUpdated', true);
            this.activeLayer.y = el.position.top;
            this.activeLayer.x = el.position.left;
            $(".resizable").bind("click");
        },
        // 让组件可移动，可调整大小
        initItem () {
            $(".resizable").each((index, item) => {
                $(item).resizable({
                    start: this.onResizeStart,
                    resize: this.onResize,
                    stop: this.onResizeEnd
                }).draggable({
                    start: this.onDragStart,
                    drag: this.onDrag,
                    stop: this.onDragEnd
                });
            });
        },
        // 栅格
        moveGrid (e) {
            if (!this.activeLayer) return;
            const $chart = $(`#${this.activeLayer.id}`).parent('.resizable');
            const snap = this.canvas.snap * 1;
            switch (e.keyCode) {
            case 37:
                $chart.css({ left: this.activeLayer.x -= snap });
                break;
            case 38:
                $chart.css({ top: this.activeLayer.y -= snap });
                break;
            case 39:
                $chart.css({ left: this.activeLayer.x += snap });
                break;
            case 40:
                $chart.css({ top: this.activeLayer.y += snap });
                break;
            }
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                this.timer && clearTimeout(this.timer);
                $('.big-content').scroll(function () {
                    $(this).scrollTop(top);
                });
            }
        },
        clickShift (e) {
            $('.resizable').unbind("click");
            const _this = this;
            if (!this.activeLayer) return;
            this.shiftClick = true;
            if (e.keyCode == 16 || e.keyCode == 17) {
                $('.resizable').click(function () {
                    for (let i = 0; i < _this.clickShiftList.length; i++) {
                        if (_this.clickShiftList[i] == $(this).index()) {
                            _this.displayLayers[$(this).index()].selectBorder = false;
                            _this.displayLayers[$(this).index()].checked = false;
                            _this.clickShiftList.splice(i, 1);
                            _this.activeLayerS.splice(i, 1);
                            _this.$forceUpdate();
                            return;
                        }
                    }
                    _this.clickShiftList.push($(this).index());
                    _this.displayLayers[$(this).index()].checked = true;
                    _this.activeLayerS.push(_this.displayLayers[$(this).index()]);
                    _this.displayLayers[$(this).index()].selectBorder = true;
                    _this.$forceUpdate();
                });
            }
        },
        addLayer () {
            this.$store.commit('setUpdated', true);
            const changeLayer = Promise.resolve(this.displayLayers.push(this.activeLayer));
            changeLayer.then(() => {
                setTimeout(() => { // Fixes can not be initialized on firefox.
                    this.initItem();
                }, 200);
                this.drawLayer(this.activeLayer);
            });
        },
        setActiveLayer (e, layer) {
            const clickCavansIndex = $(e.currentTarget).index();
            const _this = this;
            if (this.shiftClick == true) {
                this.$store.dispatch('setShiftClickLayers', this.activeLayerS);
                e.stopPropagation();
            } else if (this.shiftClick == false) {
                $('.resizable').click(function () {
                    _this.activeLayerS = [];
                    _this.clickShiftList = [];
                    for (let i = 0; i < _this.displayLayers.length; i++) {
                        if (i == clickCavansIndex) {
                            _this.displayLayers[i].selectBorder = true;
                            _this.displayLayers[i].checked = true;
                            _this.clickShiftList.push(i);
                            _this.activeLayerS.push(_this.displayLayers[i]);
                        } else {
                            _this.displayLayers[i].selectBorder = false;
                            _this.displayLayers[i].checked = false;
                        }
                    }
                });
            }
            this.$store.dispatch('setActiveLayer', layer);
            e.stopPropagation();
        },
        setScale () {
            const container = $('.big-content')[0];
            const subContainer = $('.big-sub-content')[0];
            this.zoom = container.clientWidth / (Number(this.canvas.width) + 50);
            subContainer.style.transform = 'scale(' + this.zoom + ')';
        }
    },
    destroy () {
        $(window).unbind('resize', this.setScale);
    }
};

</script>
<style>
.canvas-slider-text {
    float: right;
    line-height: 36px;
}

.big-bottom-content {
    position: fixed;
    bottom: 0;
    height: 36px;
    left: 172px;
    right: 310px;
    background-color: #fff;
    padding: 0 10px 0 20px;
    border: 1px solid #dce4eb;
}

.canvas-slider {
    width: 200px;
    float: right;
    padding-right: 20px;
}

.sub-sub {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
}

.big-content {
    min-width: auto;
    position: fixed;
    top: 50px;
    bottom: 38px;
    left: 180px;
    right: 320px;
    padding: 0;
    overflow: auto;
}

.big-content .big-sub-content {
    position: relative;
    transform-origin: left top;
    overflow: visible;
}

.big-content .item {
    border: 1px solid transparent;
    position: absolute;
}

.big-content .item>span {
    visibility: hidden;
}

.big-content .item span:hover {
    cursor: pointer;
}

.big-content .item:hover span {
    visibility: visible;
    z-index: 10;
    position: relative;
}

.big-content .item:hover {
    border: 1px solid #2cabff;
    cursor: move;
}

.big-content .ui-icon {
    background: url(../../../images/big-icon.png) no-repeat -159px -89px;
    visibility: hidden;
}

.big-content .item:hover .ui-icon, .big-content .item.active .ui-icon {
    visibility: visible;
}

.big-sub-content {
    height: 100%;
    background-size: cover;
}

.layer-canvas {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
}

.item.active {
    border: 1px solid #2cabff;
}

.selectBorder {
    border: 1px solid #2cabff !important;
}

.item.checked {
    background-color: rgba(0,0,0,0.1);
}

.white {
    color: #fff;
    font-size: 64px;
}

.el-silder__button,
  .el-slider__bar,
  .el-slider__button.dragging,
  .el-slider__button.hover,
  .el-slider__button:hover {
    background-color: #2cabff;
}

.item .layer-icon i.icon-trash {
    background: url(../../../../static/images/trash.svg) no-repeat;
    background-size: 100% 100%;
}

.item .layer-icon i.icon-eye {
    background: url(../../../../static/images/eye.svg) no-repeat;
    background-size: 100% 100%;
}

.item .layer-icon i.icon-copy {
    background: url(../../../../static/images/copy.svg) no-repeat;
    background-size: 100% 100%;
}

video::-internal-media-controls-download-button {
    display: none;
}

video::-webkit-media-controls-enclosure {
    overflow: hidden;
}
video::-webkit-media-controls-fullscreen-button {
    display: none;
}
video::-webkit-media-controls {
    overflow: hidden !important
}
video::-webkit-media-controls-enclosure {
    width: calc(100% + 32px);
    margin-left: auto;
}
</style>

