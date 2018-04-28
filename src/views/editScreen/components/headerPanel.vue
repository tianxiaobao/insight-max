<style lang="less" scoped>
    .big-hasSub {
        cursor: default;
    }
    .big-topSub {
        display: block;
        z-index: 99;
        min-width: 250px;
        max-height: 490px;
        overflow: hidden;
        overflow-y: auto;

      li {
          margin-left: 5px;
          height: 90px;
        }
    }
    .big-topSub::-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
      /*display: none;*/
    }
    .big-topSub::-webkit-scrollbar-track{
      background-color: #434343;
    }
    /*定义滑块，内阴影及圆角*/
    .big-topSub::-webkit-scrollbar-thumb{
      /*width: 10px;*/
      background-color: #727272;
    }
    .big-chart-menu {
        img {
            display: inline-block;
            margin-top: 10px;
        }
        .chart-tt {
            text-align: center;
        }
    }
    .clickAreaCheck{
      background:#434343;
    }
    .width95{
        width: 95px;
    }
    .selectCheck{
      border: 0.5px solid #2cabff
    }
    li img{
      padding: 1px;
    }
</style>
<template>
<div class="big-navbar">
    <h1 class="fl">
        <!--router-link class="big-back" /*:to="{path: '/console/myScreen'*/}"></router-link-->
        <a href="" class="big-back" @click.prevent="goBack" title="返回"></a>
    </h1>
    <div class="big-topLeft">
        <ul>
            <li class="big-hasSub"  v-for="(pannel, index) of pannelList" @click="showPannel($event, pannel.type,index)" :class="[pannel.type=='supportGraphics'||pannel.type=='text'?'width95':'',pannelType == pannel.type?'clickAreaCheck':'']">
                <i :class="[pannel.iconClass]"></i>{{pannel.name}}
                <div class="big-topSub" v-show="pannelType == pannel.type">
                    <ul class="big-chart-menu">
                        <li v-for="(item, index) of pannel.list" v-if="item.name" >
                            <a href="#" :title="item.name" @click.prevent="addLayer($event, item)" >
                                <img class="toggClick"  :src="item.img" >
                                <p class="chart-tt">{{item.name}}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
    <div class="big-topRight">
        <a href="#" @click.prevent="save" class="mr10 blueLink">保存</a>
        <a href="#" @click.prevent="preview" class="mr10 blueLink">预览</a>
        <a href="#" @click="publish" class="mr10 blueLink" v-if="push">发布(开)</a>
        <a href="#" @click="publish" class="mr10 blueLink" v-if="!push">发布(关)</a>
        <!-- <a href="#"><i class="big-i1"></i></a> -->
        <a href="#" @click.prevent="refresh" title="刷新"><i class="big-i1"></i></a>
    </div>

    <!-- 发布弹窗开始 -->
    <div class="popup pubScreen" style="display: none;">
        <ul class="listItem">
            <li class="first">
                <p class="tit">发布：</p>
                <p class="con"><i class="switch" :class="push?'on':'off'" id="parameter" @click="switchBtn"></i></p>
            </li>
            <li>
                <p class="tit">链接：</p>
                <p class="con"><input type="text" class="inputMode" v-model="pubLink"><span class="i41 mt10" title="复制" @click="copyTxt"><i class="i44"></i></span></p>
                <p class="tips">发布后将链接发给使用者，身份验证后即可查看！</p>
            </li>
            <li>
                <p class="tit">密码：</p>
                <p class="con"><i class="switch mr10" :class="isPassword?'on':'off'" @click="switchPass"></i><input type="text" class="inputMode w160" v-model="pubPassword"></p>
                <p class="tips ml60">请设置查看密码</p>
            </li>
        </ul>
    </div>
    <!-- 发布弹窗结束 -->
</div>
</template>
<script>
import api from '@/api/index.js';
import { mapGetters } from 'vuex';

export default {
    name: 'headerPanel',
    data () {
        return {
            pannelType: '',
            pannelList: [],
            pubPassword:'', // 发布密码
            tag:'1',
            clientX:'',
            clientY:'',
            clientXold:0,
            clientYold:0

        };
    },
    computed: {
        ...mapGetters(['defaultFormat', 'screenBasicMsg', 'updated', 'push']),
        // 发布链接
        pubLink: function () {
            const url = window.location.href.replace('editScreen', 'previewScreen');
            return url;
        },
        isPassword () {
            return this.$store.state.screen.isPassword;
        }
    },
    mounted () {
        document.addEventListener('click', () => {
            this.pannelType = '';
        });
        this.pannelList.push(this.getLayers());
        this.pannelList.push(this.getMaps());
        this.pannelList.push(this.getTitles());
        this.pannelList.push(this.getSinglePic());

        // 设置间隔10分钟的计时器监听用户是否在编辑，防止后端session过期
        const _this = this;
        $(document).mousemove(function (_event) {
            _event = window.event || _event;
            _this.clientX = _event.clientX;
            _this.clientY = _event.clientY;
        });
        const int = setInterval(function () {
            if(_this.clientXold != _this.clientX || _this.clientYold != _this.clientY) {
                _this.clientXold = _this.clientX;
                _this.clientYold = _this.clientY;
                api.refresh().then(res => {
                    if(!res.data) {
                        window.clearInterval(int);
                        window.location.reload();
                    }
                });
            }
        },600000);
    },
    methods: {
        goBack () {
            if(this.updated) {
                this.layerSaveConfirm('提示','是否保存当前编辑内容？',
                () => {
                    this.save().then((saveState) => {
                        if(saveState === 0) {
                            window.location.href = '/console/myScreen';
                            layer.closeAll();
                        } else {
                            this.layerMsg('保存失败');
                        }
                    });
                },
                () => {
                    this.$router.replace({path:'/myScreen',query:{id:this.screenBasicMsg.id}});
                    // window.location.href = '/console/myScreen';
                    layer.closeAll();
                },
                () => {
                    layer.closeAll();
                });
            } else {
                this.$router.replace({path:'/myScreen',query:{id:this.screenBasicMsg.id}});
                // window.location.href = '/console/myScreen';
            }
        },
        getLayers () {
            const {
                pie,
                line,
                bar,
                bubble,
                column,
                area,
                areaStacking,
                arearange,
                percentArea,
                lineBar,
                scatter,
                stackedBar,
                stackedColumn,
                funnel,
                percentColumn,
                columnRange,
                pieRing,
                pieSector,
                negativeBar,
                waterFall,
                threeDPie,
                threeDRing,
                Radar
            } = this.defaultFormat;

            const all = [].concat(line,arearange, area, areaStacking,percentArea, column,stackedBar,columnRange, lineBar,negativeBar, bar,stackedColumn,percentColumn,waterFall, pie,pieRing,pieSector,threeDPie,threeDRing, bubble, scatter,funnel,Radar);

            return {
                iconClass: 'big-menuIcon-icon',
                type: 'chart',
                name: '图表',
                list: all
            };
        },
        getTitles () {
            const {generalTitle, scaler, marquee, flop} = this.defaultFormat;
            const all = [].concat(generalTitle, scaler, marquee, flop);

            return {
                iconClass: 'big-menuIcon-text',
                type: 'text',
                name: '文字指标',
                list: all
            };
        },
        getMaps () {
            const {chinaMap, jumap} = this.defaultFormat;
            const all = [].concat(chinaMap, jumap);

            return {
                iconClass: 'big-menuIcon-map',
                type: 'map',
                name: '地图',
                list: all
            };
        },

        // 单张图片
        getSinglePic () {
            const {singlePic, border, gif,carouselImg, video} = this.defaultFormat;
            const all = [].concat(singlePic, border, gif,carouselImg, video);

            return {
                iconClass: 'big-menuIcon-graph',
                type: 'supportGraphics',
                name: '辅助图形',
                list: all
            };
        },
        refresh () {
            const screen = this.$store.state.screen;
            const layers = screen.layers;
            layers.forEach((layer) => {
                if(layer.sourceData.type === 'database') {
                    this.$store.dispatch('refreshSqlData', layer);
                }
            });
        },
        showPannel (event, type,index) {
            const screen = this.$store.state.screen;
            const layers = screen.layers;
            for(let i = 0;i<this.pannelList[index].list.length;i++) {
                $(event.currentTarget).find('.toggClick').eq(i).removeClass('selectCheck');
                for(let j=0;j<layers.length;j++) {
                    if(layers[j].name == this.pannelList[index].list[i].name) {
                        $(event.currentTarget).find('.toggClick').eq(i).addClass('selectCheck');
                    }
                }
            }
            if(this.pannelType =="") {
                this.pannelType = type;
                this.tag = type;
            } else {
                this.pannelType = '';
                this.tag = '1';
            }
            event.stopPropagation();
        },
        addLayer (event, layer) {
            const uid = this.uid(8, 16);
            const copyChart = $.extend(true, {}, layer);
            copyChart.id = uid;
            this.$store.dispatch('addLayer', copyChart);
            this.$store.dispatch('setActiveLayer', copyChart);
            this.$events.emit('addLayer');
            this.pannelType = '';
            event.stopPropagation();
        },
        uid (len, radix) {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
                uuid = [];
            let i;

            radix = radix || chars.length;

            if (len) {
              // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
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
                        r = 0 | Math.random()*16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        },
        save () {
            const screen = this.$store.state.screen;
            const layers = screen.layers;
            const layersInfo = [];
            for (let i = 0; i < layers.length; i++) {
                const item = $.extend(true, {}, layers[i]);
                item.chart = null;
                // 翻牌器翻拍效果，不能删除
                if(item.chartType === 'flop') item.chartMsg.flop.number.oldNumber = 0;
                const obj = {
                    data :{
                        "id": item.id,
                        "sql": item.sourceData.sql,
                        "databaseId": item.sourceData.databaseId,
                        "layerUrl":  item.sourceData.layerUrl || '',
                        "refreshState": item.sourceData.refreshState,
                        "reflectFrequency": item.sourceData.reflectFrequency,
                        "type": item.sourceData.type
                    },
                    layout : JSON.stringify(item)
                };
                layersInfo.push(obj);
            }

            const postJson ={
                "bigScreenInfo": {
                    "id": screen.screenBasicMsg.id,
                    // "isPassword":  null,
                    // "password": null,
                    "bsUrl": screen.screenBasicMsg.bsUrl,
                    "bgPicUrl": screen.canvas.bgUrl,
                    "layout": JSON.stringify(screen.canvas)
                },
                "layersInfo": layersInfo
            };
            return api.updateBigScreen(postJson).
            then(res => {
                if(res.code == 0) {
                    this.layerMsg('保存成功',1);
                    this.$store.commit('setUpdated', false);
                    // 保存成功返回标志0
                    return 0;
                }
                // 保存失败返回标志1
                return 1;
            },() => {
                return 1;
            });
        },
        preview () {
            const url = window.location.href.replace('editScreen', 'previewScreen');
            if(this.updated) {
                this.layerConfirm('提示','尚未保存，确认预览？',
                () => {
                    window.open(url+'&pre=1');
                    layer.closeAll();
                });
            } else {
                window.open(url+'&pre=1');
            }
        },
        // 发布
        publish () {
            const push = this.push;
            this.layerPubScreen((layero, index) => {
                const params = {bsId:this.screenBasicMsg.id,isPush:this.push,bsUrl:this.pubLink,isPassword:this.isPassword,password:this.pubPassword};
                api.publish(params).then(res => {
                    if(res.code == 0) {
                        this.layerMsg("操作成功！");
                        layer.close(index);
                    } else {
                        this.layerMsg(res.message);
                    }
                });
            }, () => {
                this.$store.commit('setPush', push);
            });
        },
        switchBtn () {
            this.$store.commit('setPush', !this.push);
        },
        switchPass () {
            this.$store.commit('setIsPassword', !this.isPassword);
        },
        // 复制功能
        copyTxt () {
            $(".pubScreen .inputMode")[0].select();
            document.execCommand("Copy");
        }
    }
};
</script>
<style>
.big-navbar{
    z-index: 101;
    position: static;
}
.listItem .tit, .listItem .largetit{
    color: #333;
}
</style>
