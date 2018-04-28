import * as types from '../mutation-types';
import transform from './transform';
import pie from './defaultFormat/pie';
import line from './defaultFormat/line';
import area from './defaultFormat/area';
import areaStacking from './defaultFormat/areaStacking';
import arearange from './defaultFormat/arearange';
import percentArea from './defaultFormat/percentArea';
import bar from './defaultFormat/bar';
import column from './defaultFormat/column';
import jumap from './defaultFormat/jumap';
import generalTitle from './defaultFormat/general-title';
import border from './defaultFormat/border';
import chinaMap from './defaultFormat/china-map.js';
import bubble from './defaultFormat/bubble';
import singlePic from './defaultFormat/single-pic.js';
import lineBar from './defaultFormat/line-bar.js';
import stackedBar from './defaultFormat/stacked-bar.js';
import stackedColumn from './defaultFormat/stacked-column.js';
import percentColumn from './defaultFormat/percentColumn.js';
import columnRange from './defaultFormat/columnRange.js';
import negativeBar from './defaultFormat/negativeBar.js';
import waterFall from './defaultFormat/waterFall.js';
import api from '../../api';
import highcharts from 'highcharts';
import chinaJson from './defaultFormat/china-json.js';
import map from 'highcharts/modules/map';
import funneljs from 'highcharts/modules/funnel';
import funnel from './defaultFormat/funnel';
import highchartsMore from 'highcharts/highcharts-more';
import highcharts3D from 'highcharts/highcharts-3d';
import scatter from './defaultFormat/scatter';
import gif from './defaultFormat/gif';
import pieRing from './defaultFormat/pie-ring.js';
import pieSector from './defaultFormat/pie-sector.js';
import video from './defaultFormat/video';
import scaler from './defaultFormat/scaler';
import carouselImg from './defaultFormat/carouselImg';
import marquee from './defaultFormat/marquee';
import flop from './defaultFormat/flop';
import threeDPie from './defaultFormat/threeDPie';
import threeDRing from './defaultFormat/threeDRing';
import Radar from './defaultFormat/radar';

highchartsMore(highcharts);
highcharts3D(highcharts);
map(highcharts);
funneljs(highcharts);
const state = {
    activeLayer: null, // null|| layers[0],
    shiftClickLayers:[],
    layers: [],
    defaultFormat: {
        pie: pie,
        line: line,
        bar: bar,
        column,
        generalTitle,
        border,
        chinaMap,
        bubble,
        area,
        areaStacking,
        arearange,
        percentArea,
        lineBar:lineBar,
        stackedBar:stackedBar,
        stackedColumn:stackedColumn,
        percentColumn:percentColumn,
        columnRange:columnRange,
        negativeBar:negativeBar,
        waterFall:waterFall,
        singlePic,
        jumap: jumap.defaultFormat,
        scatter,
        funnel,
        pieRing,
        pieSector,
        gif: gif.defaultFormat,
        video,
        carouselImg:carouselImg.defaultFormat,
        scaler: scaler.defaultFormat,
    // ...
        scaler: scaler.defaultFormat,
        marquee: marquee.defaultFormat,
        flop: flop.defaultFormat,
        threeDPie,
        threeDRing,
        Radar
    }, // 存储图例默认样式，新建时从这里取
    canvas: {
        height: 1280,
        width: 1920,
        bgUrl: '',
        scale: null,
        snap: 1
    },
    screenBasicMsg: {
        id: null,
        bsUrl: '',
        coverImg: ''
    },
    updated: false,
    push: null,
    isPassword:false,// 发布密码
    showRight: true, // 右侧菜单
    showAlign:false,// 右侧对齐
    showDistribute:false// 右侧分布
};
const getters = {
    activeLayer: state => state.activeLayer,
    shiftClickLayers: state => state.shiftClickLayers,
    layers: state => state.layers,
    defaultFormat: state => state.defaultFormat,
    canvas: state => state.canvas,
    coverData: state => state.coverData,
    screenBasicMsg: state => state.screenBasicMsg,
    updated: state => state.updated,
    push: state => state.push,
    isPassword:state => state.isPassword,
    showRight: state => state.showRight,
    showAlign: state => state.showAlign,
    showDistribute: state => state.showDistribute
};
const mutations = {
    [types.ADD_LAYER] (state, payload) {
        state.layers.unshift(payload);
    },
    [types.SET_LAYERS] (state, payload) {
    /* 兼容旧的数据格式*/
        const layers = payload;
        layers.forEach(function (item,index,arr) {
            if(item.chartType == 'highchart' && state.defaultFormat.hasOwnProperty(item.type)) {
                arr[index] = $.extend(true,{},state.defaultFormat[item.type][0],item);
        // 解决静态数据保存后被覆盖的问题
                arr[index].sourceData.sData = item.sourceData.sData;
            }
        });
        state.layers = layers;
    },
    [types.SET_ACTIVE_LAYER] (state, payload) {
        state.activeLayer = payload;
    },
    [types.SET_SHIFT_LAYER] (state, payload) {
        state.shiftClickLayers = payload;
    },
    [types.SET_CANVAS] (state, payload) {
        state.canvas = Object.assign(state.canvas, payload);
    },
    [types.SET_SHOW_RIGHT] (state, payload) {
        state.showRight = payload;
    },
    setScreenBg (state, payload) {
        state.canvas.bgUrl = payload;
    },
    setPush (state, payload) {
        state.push = payload;
    },

    setIsPassword (state, payload) {
        state.isPassword = payload;
    },

    setShowAlign (state, payload) {
        state.showAlign = payload;
    },

    setDistribute (state, payload) {
        state.showDistribute = payload;
    },

    setUpdated (state, payload) {
        state.updated = payload;
    },
    setScreenBasicMsg (state, payload) {
        state.screenBasicMsg = Object.assign(state.screenBasicMsg, payload);
    },
    setCoverImg (state, payload) {
        state.screenBasicMsg.coverImg = payload;
    },
    setScale (state, payload) {
        state.canvas.scale = payload;
    },

    setChartMsg (state, payload) {
        if(state.activeLayer) {
            state.activeLayer.chartMsg = payload;
        }
    },

    setLayerPosition (state, payload) {
        state.activeLayer.x = payload.x;
        state.activeLayer.y = payload.y;
        state.activeLayer.width = payload.width;
        state.activeLayer.height = payload.height;
    },

    setSeries (state, layer=state.activeLayer) {
        const type = layer.type;
        if(transform.hasOwnProperty(type)) {
            transform[type](layer);
        }
    },

    setReflect (state, layer=state.activeLayer) {
        setReflect.call(this, layer);
    },
    setReflectState (state, payload) {
        state.activeLayer.sourceData.reflect[payload.index] = payload.value;
    },
    triggerChartCallback (state, layer=state.activeLayer, flags=[]) {
        const type = layer.type;
        if(chartCallback.hasOwnProperty(type)) {
            chartCallback[type].call(this, layer, ...flags);
      // chartCallback[type](layer, flag);
        }
    }
};

const mapJson = {
    china : chinaJson
};

// 自建图层callback
const chartCallback = {
    singlePic (layer) {
        const sourceData = layer.sourceData;
        const dataType = sourceData.type;
        const sData = sourceData['sData'];
        const reflect = sourceData.reflect;
        let data = sourceData.data;
        if(dataType == 'staticData') {
            data = sData;
        }
        const img = reflect[0];
    // 解决数据库绑定图片
    // if(img.state&&data.length>0&&data[0].img) {
        if(img.state&&data.length>0&&data[0][img.reflectName]) {
            for (let i = 0; i < data.length; i++) {
                layer.chartMsg.chart.plotBackgroundImage = data[i][img.reflectName];
            }
        }
        layer.chart = highcharts.chart(layer.id, layer.chartMsg);
        const chart = layer.chart;
        const container = chart.container;
        $(container)[0].style.height = layer.height + 'px';
        $(container)[0].style.width = layer.width + 'px';
        const $svg = $(container).find('svg');
    // $(container).find('.highcharts-background').css("fill","#333");
        const image= $svg.find('image').get(0);
        if(image) {
            image.setAttribute('style', 'width:100%;height:100%;x:0;y:0;');
            const style = image && image.getAttribute('style');
            const href = image && image.getAttribute('href');
            const newImg = `<img src="${href}" style="${style}" />`;
            image.remove();
            $(container).prepend(newImg);
        }
    },
    generalTitle (layer) {
        layer.chart = highcharts.chart(layer.id, layer.chartMsg);
        const chart = layer.chart;
        const container = chart.container;
        const $svg = $(container).find('svg');
        const title = layer.chartMsg.title;
        const blank = title.blank;
        const href = title.href;
        const text= $svg.find('text').get(0);
        const style = text && text.getAttribute('style');
        $('#tempa' + layer.id).remove();
        const a = blank ? `<a id="tempa${layer.id}" href="${href}" target="_blank"></a>` : `<a id="tempa${layer.id}" href="${href}"></a>`;

        if(href !== '') {
            $svg.append(a);
            text && text.setAttribute('style', `cursor: pointer;${style}`);
            $svg.on('click', 'text', () => {
                const tempa = document.getElementById('tempa' + layer.id);
                tempa && tempa.click();
            });
        } else {
            $('#tempa' + layer.id).remove();
            text && text.setAttribute('style', `${style}`);
        }
    },
    chinaMap (layer) {
        const extra = layer.chartMsg.extra;
        let mapdata = null;
        if(mapJson[extra.map]&&extra.mapChild=='') {
            mapdata = mapJson[extra.map];
            initMap();
        }else{
            mapdata = mapJson[extra.map] = extra.mapdata;
            initMap();
        }

        function initMap () {
            const arr = extra.colorArr.concat();

            for (let i = 0; i < extra.areaArr.length; i++) {
                const item = extra.areaArr[i];
                let isHave = false;
                for (let j = 0; j < arr.length; j++) {
                    const item2 = arr[j];
                    if(item.name == item2.name) {
                        item.color = item2.color;
                        arr.splice(j,1);
                        isHave = true;
                        break;
                    }
                }
                if(!isHave) {
                    item.color = null ;
                }
            }

            let series = [{
                mapData : mapdata,
                joinBy: 'name',
                data : extra.areaArr
            }];

            let qipaoSeries = [];

            const sourceData = layer.sourceData;
            const sData = sourceData['sData'];
            let data = sourceData.data;
            const dataType = sourceData.type;
            const reflect = sourceData.reflect;

            if(dataType == 'staticData') {
                data = sData;
            }
            const lon = reflect[0];
            const lat = reflect[1];
            const z = reflect[2];
            const type = reflect[3];

            if(lat.state && lon.state && z.state && type.state) {
                qipaoSeries = transform.seriesLatLonType(extra.series,data,lat.reflectName,lon.reflectName,z.reflectName,type.reflectName);
            }else if(lat.state && lon.state && z.state && !type.state) {
                if(extra.series.length) {
                    extra.series = [extra.series[0]];
                }else{
                    extra.series = [$.extend(true, {}, layer.chartMsg.extra.serie)];
                }
                qipaoSeries = transform.seriesLatLon(extra.series,data,lat.reflectName,lon.reflectName,z.reflectName);
            }
            series = series.concat(qipaoSeries);
            layer.chartMsg.series = series;
            layer.chart = highcharts.mapChart(layer.id,layer.chartMsg);
        }
    },
    jumap (layer) {
        jumap.drawMap(layer);
    },
    gif (layer) {
        gif.draw(layer);
    },
    carouselImg (layer) {
        const sourceData = layer.sourceData;
        const dataType = sourceData.type;
        if(dataType == 'staticData') {
            layer.chartMsg.src = sourceData.sData;
        }
        carouselImg.draw(layer);
    },
    scaler (layer) {
        scaler.draw(layer);
    },
    marquee (layer) {
        marquee.draw(layer);
    },
    flop (layer) {
        flop.draw(layer);
    },
    bubble (layer) {
        const plotId = layer.id;
        if(!layer.chart) return;
        const chart = layer.chart.yAxis[0];
        const plotLine = layer.chartMsg.yplotLine;

        chart.removePlotLine(plotId);
        chart.addPlotLine({
            value: plotLine.value,
            color: plotLine.color,
            width: plotLine.width,
            id: plotId
        });
    },
    video (layer) {
        const videoInfo = layer.chartMsg.video;
        const {autoplay, loop, url} = videoInfo;
        const videoTemp = `
            <video src="${url}" ${autoplay ? 'autoplay' : ''} ${loop ? 'loop' : ''} ${url ? 'controls' : '' } width="100%" height="99%">
                your browser does not support the video tag
            </video>`;
        $(`#${layer.id}`).html(videoTemp);
    }
};


const getDataBySql = (layer) => {
    return api.layerGetData(layer.id).then(res => {
        if(res.code == 0) {
            layer.sourceData.data = res.data.data;
        } else {
            throw new Error(res.message);
        }
    });
};

const setReflect = (layer) => {
    const sourceData = layer.sourceData;
    sourceData.reflect.forEach((item) => {
        item.state = false;
        const reflectArr = item.reflectName.split(",");
        for(let i = 0; i < reflectArr.length; i++) {
            if (sourceData.data[0] && sourceData.data[0].hasOwnProperty(reflectArr[i])) {
                item.state = true;
            }
        }
    });
};

const actions = {
    setActiveLayer ({ commit }, payload) {
        commit(types.SET_ACTIVE_LAYER, payload);
    },
    setShiftClickLayers ({ commit }, payload) {
        commit(types.SET_SHIFT_LAYER, payload);
    },
    setLayers ({ commit }, payload) {
        commit(types.SET_LAYERS, payload);
    },
    addLayer ({ commit }, payload) {
        commit(types.ADD_LAYER, payload);
    },
    setCanvas ({ commit }, payload) {
        commit(types.SET_CANVAS, payload);
    },
    async refreshSqlData ({ commit }, layer) {
        await getDataBySql(layer);
        commit('setReflect', layer);
        commit('setSeries', layer);
        if(layer.chartType === 'highchart') layer.chart = highcharts.chart(layer.id, layer.chartMsg);
        commit('triggerChartCallback', layer);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
