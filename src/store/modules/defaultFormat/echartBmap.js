// import echarts from 'echarts';
import commonProp from './commonProp';
import bmap from 'echarts/extension/bmap/bmap';

bmap;
const data = [
    {lng:116.46, lat:39.92, value:1000},
    {lng:120.33, lat:36.07, value:40}
];

// 数据转换
const setSeries = (layer) => {
    let data = [];
    data = layer.sourceData.sData;
    if(layer.sourceData.type !== 'staticData') data = layer.sourceData.data; 
    layer.chartMsg.series[0].data = formatData(data, layer.sourceData.reflect);
    individuateSerise(layer);
};

const formatData = (data, reflect) => {
    return data.map((item) => {
        const obj = {};
        obj.name = item.name;
        obj.value = [item[reflect[0].reflectName], item[reflect[1].reflectName], item[reflect[2].reflectName]];
        return obj;
    });
};
// 图像默认值
const defaultFormat = [{
    ...commonProp('echartBmap', '中国详细地图', './static/images/5.png', 'echarts'),

    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: data,
        data: [], // 存储具体数据
        individuationSerise: [],
        reflect: [{
            name: "lng",
            reflectName: 'lng',
            construction: '经度',
            state: true
        },{
            name: "lat",
            reflectName: 'lat',
            construction: '纬度',
            state: true
        },
        {
            name: "value",
            reflectName: 'value',
            construction: '值',
            state: true
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },
    overLay: []
}];
defaultFormat[0].chartMsg = {
    title: {
        text: '全国主要城市空气质量 - 百度地图',
        textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 20
        },
        subtext: 'data from PM25.in',
        subtextStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize: 12
        },
        left: 'center',
        top: 'auto'
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
        center: [104.114129, 37.550339],
        boundary: '无',
        zoom: 5,
        // roam: true,
        mapStyle: {
            style: 'dark',
            fillOpacity: 0.3,
            scaleRuler: true
        }
    },
    series : [
        {
            name: 'pm2.5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: formatData(data, defaultFormat[0].sourceData.reflect),
            symbolSize: 10,
            rippleEffect: {
                period: 1,
                scale: 10,
                brushType: 'fill'
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple'
                }
            }
        }
    ],
    individuationSerise: []
};

// 画图
const individuateSerise = (layer) => {
    layer.chartMsg.individuationSerise.forEach((item) => {
        setColor(layer, item);
    });
};

const setColor = (layer, item) => {
    layer.chartMsg.series[0].data.every((data) => {
        if(item.key === data.name) {
            const obj = {
                normal: {
                    color: item.color
                }
            };
            data.itemStyle = obj;
            return false;
        }
        return true;
    });
};
const clearOverlays = (layer) => {
    const map = layer.chart.getModel().getComponent('bmap').getBMap();
    layer.overLay.forEach((item) => {
        map.removeOverlay(item);
    });
};
const drawBoundary = (layer) => {
    const map = layer.chart.getModel().getComponent('bmap').getBMap();
    clearOverlays(layer);
    const bdary = new BMap.Boundary();
    bdary.get(layer.chartMsg.bmap.boundary, (rs) => {       // 获取行政区域
        // map.clearOverlays();               // 清除地图覆盖物 
        const count = rs.boundaries.length; // 行政区域的点有多少个
        if (count === 0) {
            // alert('未能获取当前输入行政区域');
            return ;
        }
        let pointArray = [];
        for (let i = 0; i < count; i++) {
            layer.overLay[i] = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, 
                strokeColor: "#ff0000",
                fillOpacity: layer.chartMsg.bmap.mapStyle.fillOpacity}); // 建立多边形覆盖物
            map.addOverlay(layer.overLay[i]);  // 添加覆盖物
            pointArray = pointArray.concat(layer.overLay[i].getPath());
        }
        // map.setViewport(pointArray);    // 调整视野       
    });
};
const drawMap = (layer) => {
    if(!layer.chart) {
        layer.chart = echarts.init(document.getElementById(layer.id));
    }
    // layer.chart.clear();
    if(window.location.href.includes('previewScreen'))layer.chartMsg.bmap.roam = true;
    layer.chart.setOption(layer.chartMsg);
    // 添加比例尺
    const map = layer.chart.getModel().getComponent('bmap').getBMap();
    if(layer.chartMsg.bmap.mapStyle.scaleRuler) {
        if(!layer.chart.scaleRuler) layer.chart.scaleRuler = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        map.addControl(layer.chart.scaleRuler); 
    } else if(layer.chart.scaleRuler) {
        map.removeControl(layer.chart.scaleRuler);
    }
    drawBoundary(layer);
};


export default {
    defaultFormat,
    drawMap,
    setSeries
};