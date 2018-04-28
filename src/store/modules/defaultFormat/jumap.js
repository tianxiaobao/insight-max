import jumap from '../jumap';
import commonProp from './commonProp';

const data = [
    {
        lat: 121.491,
        lng: 31.233,
        value: 6,
        type: 1
    },
    {
        lat: 118.1,
        lng: 24.46,
        value: 8,
        type: 1
    },
    {
        lat: 120.95,
        lng: 31.39,
        value: 5,
        type: 2
    }
    // {lat: 121, lng:13, value: 2, type: 1},               
    // {lat: 120, lng:33, value: 2, type: 1},               
    // {lat: 122, lng:22, value: 2, type: 1},             
    // {lat: 120, lng:13, value: 2, type: 1},               
    // {lat: 118, lng:84, value: 2, type: 1},               
    // {lat: 120, lng:33, value: 2, type: 1},               
    // {lat: 121, lng:53, value: 2, type: 1},               
    // {lat: 102, lng:10, value: 2, type: 1},           
    // {lat: 118, lng:52, value: 2, type: 1},               
    // {lat: 120, lng:53, value: 2, type: 1},               
    // {lat: 119, lng:43, value: 2, type: 1},               
    // {lat: 119, lng:93, value: 2, type: 1},               
    // {lat: 121, lng:13, value: 2, type: 1},               
    // {lat: 91, lng:19, value: 2, type: 1},              
    // {lat: 112, lng:12, value: 2, type: 1},               
    // {lat: 116, lng:14, value: 2, type: 1},              
    // {lat: 122, lng:13, value: 2, type: 1},              
    // {lat: 121, lng:43, value: 2, type: 1},               
    // {lat: 122, lng:17, value: 2, type: 1},              
    // {lat: 117, lng:94, value: 2, type: 1},               
    // {lat: 118, lng:14, value: 2, type: 1},              
    // {lat: 115, lng:32, value: 2, type: 1},            
    // {lat: 116, lng:62, value: 2, type: 1},               
    // {lat: 124, lng:34, value: 2, type: 1},               
    // {lat: 121, lng:11, value: 2, type: 1},              
    // {lat: 103, lng:72, value: 2, type: 1},               
    // {lat: 121, lng:33, value: 2, type: 1},               
    // {lat: 119, lng:36, value: 2, type: 1},              
    // {lat: 120, lng:43, value: 2, type: 1},               
    // {lat: 123, lng:94, value: 2, type: 1},               
    // {lat: 102, lng:52, value: 2, type: 1},               
    // {lat: 113, lng:53, value: 2, type: 1},               
    // {lat: 119, lng:93, value: 2, type: 1},         
    // {lat: 120, lng:10, value: 2, type: 1},              
    // {lat: 116, lng:62, value: 2, type: 1},               
    // {lat: 120, lng:93, value: 2, type: 1},               
    // {lat: 121, lng:52, value: 2, type: 1},               
    // {lat: 110, lng:33, value: 2, type: 1},          
    // {lat: 116, lng:32, value: 2, type: 1},               
    // {lat: 122, lng:43, value: 2, type: 1},               
    // {lat: 120, lng:73, value: 2, type: 1},               
    // {lat: 113, lng:72, value: 2, type: 1},               
    // {lat: 114, lng:62, value: 2, type: 1},               
    // {lat: 119, lng:13, value: 2, type: 1},              
    // {lat: 119, lng:92, value: 2, type: 1},              
    // {lat: 108, lng:32, value: 2, type: 1},               
    // {lat: 122, lng:14, value: 2, type: 1},               
    // {lat: 114, lng:43, value: 2, type: 1},              
    // {lat: 120, lng:23, value: 2, type: 1},               
    // {lat: 120, lng:73, value: 2, type: 1},              
    // {lat: 113, lng:62, value: 2, type: 1},               
    // {lat: 109, lng:43, value: 2, type: 1},              
    // {lat: 112, lng:53, value: 2, type: 1},               
    // {lat: 113, lng:92, value: 2, type: 1},              
    // {lat: 113, lng:32, value: 2, type: 1},               
    // {lat: 102, lng:72, value: 2, type: 1},               
    // {lat: 118, lng:73, value: 2, type: 1},               
    // {lat: 122, lng:27, value: 2, type: 1},        
    // {lat: 113, lng:23, value: 2, type: 1},               
    // {lat: 114, lng:22, value: 2, type: 1},               
    // {lat: 113, lng:52, value: 2, type: 1},              
    // {lat: 118, lng:33, value: 2, type: 1},              
    // {lat: 108, lng:73, value: 2, type: 1},               
    // {lat: 109, lng:13, value: 2, type: 1},               
    // {lat: 119, lng:93, value: 2, type: 1},               
    // {lat: 113, lng:12, value: 2, type: 1},               
    // {lat: 110, lng:32, value: 2, type: 1},               
    // {lat: 113, lng:32, value: 2, type: 1},               
    // {lat: 117, lng:53, value: 2, type: 1},               
    // {lat: 112, lng:42, value: 2, type: 1},               
    // {lat: 121, lng:63, value: 2, type: 1},               
    // {lat: 111, lng:56, value: 2, type: 1},              
    // {lat: 120, lng:63, value: 2, type: 1},               
    // {lat: 123, lng:34, value: 2, type: 1},              
    // {lat: 120, lng:63, value: 2, type: 1},               
    // {lat: 110, lng:82, value: 2, type: 1},               
    // {lat: 120, lng:73, value: 2, type: 1},               
    // {lat: 125, lng:34, value: 2, type: 1},               
    // {lat: 120, lng:33, value: 2, type: 1},            
    // {lat: 106, lng:23, value: 2, type: 1},               
    // {lat: 121, lng:14, value: 2, type: 1},               
    // {lat: 115, lng:82, value: 2, type: 1},               
    // {lat: 109, lng:44, value: 2, type: 1},              
    // {lat: 109, lng:59, value: 2, type: 1},            
    // {lat: 104, lng:74, value: 2, type: 1},              
    // {lat: 126, lng:54, value: 2, type: 1},               
    // {lat: 111, lng:92, value: 2, type: 1},               
    // {lat: 105, lng:32, value: 2, type: 1},               
    // {lat: 101, lng:73, value: 2, type: 1},               
    // {lat: 104, lng:52, value: 2, type: 1},               
    // {lat: 104, lng:33, value: 2, type: 1},               
    // {lat: 113, lng:30, value: 2, type: 1},              
    // {lat: 119, lng:43, value: 2, type: 1},              
    // {lat: 110, lng:22, value: 2, type: 1},               
    // {lat: 119, lng:83, value: 2, type: 1},               
    // {lat: 109, lng:12, value: 2, type: 1},               
    // {lat: 108, lng:93, value: 2, type: 1},               
    // {lat: 119, lng:53, value: 2, type: 1},               
    // {lat: 118, lng:43, value: 2, type: 1},               
    // {lat: 106, lng:97, value: 2, type: 1},              
    // {lat: 120, lng:53, value: 2, type: 1},               
    // {lat: 119, lng:43, value: 2, type: 1},               
    // {lat: 119, lng:93, value: 2, type: 1},               
    // {lat: 119, lng:16, value: 2, type: 1},              
    // {lat: 106, lng:52, value: 2, type: 1},               
    // {lat: 121, lng:47, value: 2, type: 1},               
    // {lat: 118, lng:73, value: 2, type: 1},               
    // {lat: 118, lng:63, value: 2, type: 1},               
    // {lat: 106, lng:72, value: 2, type: 1},               
    // {lat: 120, lng:23, value: 2, type: 1},               
    // {lat: 123, lng:74, value: 2, type: 1},              
    // {lat: 109, lng:54, value: 2, type: 1},              
    // {lat: 107, lng:13, value: 2, type: 1},               
    // {lat: 113, lng:23, value: 2, type: 1},               
    // {lat: 119, lng:13, value: 2, type: 1},               
    // {lat: 116, lng:43, value: 2, type: 1},               
    // {lat: 117, lng:24, value: 2, type: 1},              
    // {lat: 115, lng:73, value: 2, type: 1},               
    // {lat: 110, lng:45, value: 2, type: 1},              
    // {lat: 104, lng:73, value: 2, type: 1},               
    // {lat: 117, lng:53, value: 2, type: 1},               
    // {lat: 120, lng:13, value: 2, type: 1},               
    // {lat: 118, lng:93, value: 2, type: 1},               
    // {lat: 122, lng:84, value: 2, type: 1},               
    // {lat: 119, lng:43, value: 2, type: 1},               
    // {lat: 114, lng:33, value: 2, type: 1},              
    // {lat: 114, lng:33, value: 2, type: 1},               
    // {lat: 117, lng:36, value: 2, type: 1},              
    // {lat: 104, lng:33, value: 2, type: 1},               
    // {lat: 120, lng:62, value: 2, type: 1},               
    // {lat: 115, lng:92, value: 2, type: 1},               
    // {lat: 114, lng:43, value: 2, type: 1},              
    // {lat: 119, lng:73, value: 2, type: 1},               
    // {lat: 103, lng:73, value: 2, type: 1},               
    // {lat: 116, lng:83, value: 2, type: 1},               
    // {lat: 118, lng:33, value: 2, type: 1},               
    // {lat: 106, lng:16, value: 2, type: 1},              
    // {lat: 117, lng:29, value: 2, type: 1},              
    // {lat: 119, lng:93, value: 2, type: 1},               
    // {lat: 117, lng:13, value: 2, type: 1},               
    // {lat: 120, lng:22, value: 2, type: 1},               
    // {lat: 113, lng:63, value: 2, type: 1},               
    // {lat: 115, lng:93, value: 2, type: 1},               
    // {lat: 118, lng:33, value: 2, type: 1},               
    // {lat: 118, lng:33, value: 2, type: 1},               
    // {lat: 114, lng:43, value: 2, type: 1},               
    // {lat: 116, lng:23, value: 2, type: 1},               
    // {lat: 116, lng:53, value: 2, type: 1},               
    // {lat: 112, lng:27, value: 2, type: 1},              
    // {lat: 111, lng:30, value: 2, type: 1},              
    // {lat: 120, lng:32, value: 2, type: 1},               
    // {lat: 119, lng:92, value: 2, type: 1},               
    // {lat: 112, lng:43, value: 2, type: 1},              
    // {lat: 113, lng:12, value: 2, type: 1},               
    // {lat: 117, lng:63, value: 2, type: 1},               
    // {lat: 111, lng:62, value: 2, type: 1},               
    // {lat: 115, lng:43, value: 2, type: 1},               
    // {lat: 112, lng:92, value: 2, type: 1},               
    // {lat: 119, lng:62, value: 2, type: 1},               
    // {lat: 113, lng:42, value: 2, type: 1},               
    // {lat: 113, lng:22, value: 2, type: 1},              
    // {lat: 118, lng:82, value: 2, type: 1},               
    // {lat: 116, lng:79, value: 2, type: 1},              
    // {lat: 115, lng:46, value: 2, type: 1},              
    // {lat: 117, lng:23, value: 2, type: 1},               
    // {lat: 114, lng:33, value: 2, type: 1},               
    // {lat: 125, lng:64, value: 2, type: 1}
];

// 图像默认值
const defaultFormat = [{
    ...commonProp('jumap', '中国详细地图', './static/images/5.png', 'jumap'),

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
        },{
            name: "type",
            reflectName: 'type',
            construction: '值',
            state: true
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },
    chartMsg: {
        title: [
            {
                name: '主标题',
                text: '全国主要城市空气质量',
                color: '#fff',
                fontSize: 14,
                left: 0,
                top: 20,
                open: false
            },
            {
                name: '副标题',
                text: '全国主要城市空气质量',
                color: '#fff',
                fontSize: 12,
                left: 0,
                top: 40,
                open: false
            }
        ],
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: false,
            opacity: 1,
            visibility: true,
            mapStyle: 'waterDark',
            boundary: {
                key: null,
                strokeWeight: 1,
                strokeColor: '#ff0000',
                fillOpacity: 0.1,
                prov: 35,
                city: 45055,
                region: 535
            },
            ruler: false,
            showChecked: false
        },
        style: {
            scale: 2, // 呼吸范围 0-20
            speed: 0.9, // 动效速度 0-1
            opacity: 1, // 透明度 0-1
            maxSize: 20, // 最大尺寸
            minSize: 1 // 最小尺寸
        },
        series : [{
            type: 'bubble',
            key: '1',
            itemStyle: {
                color: '#FBF320',
                animation: 'breathe'
            },
            data: data
        }],
        bubbleStyle: [
            {
                key: 1,
                color: '#FBF320',
                animation: 'breathe'
            }
        ]
    }
}];

// 画图
const drawMap = (layer) => {
    if(!layer.chart) {
        layer.chart = jumap.init(layer.id);
    }
    if(window.location.href.includes('previewScreen'))layer.chartMsg.bmap.roam = true;
    layer.chart.setOption(layer.chartMsg);
};

const _getSeriseIndex = (type, series) => {
    let returnIndex = null;
    series.every((item, index) => {
        if(item.key == type) {
            returnIndex = index;
            return false;
        }
        return true;
    });
    return returnIndex;
};

const _getBubbleStyle = (type, bubbleStyle) => {
    let style = null;
    bubbleStyle.some((item) => {
        if(item.key == type) {
            style = {
                color: item.color,
                animation: item.animation
            };
            return true;
        }
        return false;
    });
    return style;
};

const setSeries = (layer) => {
    let data = layer.sourceData.sData;
    const reflect = layer.sourceData.reflect;
    const series = [];
    if(layer.sourceData.type !== 'staticData') data = layer.sourceData.data;
    data.forEach((item) => {
        const type = item[reflect[3].reflectName];
        const seriesIndex = _getSeriseIndex(type, series);
        const obj = {
            lng: item[reflect[0].reflectName],
            lat: item[reflect[1].reflectName],
            value: item[reflect[2].reflectName]
        };
        //
        if(seriesIndex !== null) {
            series[seriesIndex].data.push(obj);
        } else {
            const bubbleStyle = _getBubbleStyle(type, layer.chartMsg.bubbleStyle);
            if(bubbleStyle) {
                const seriesObj = {
                    type: 'bubble',
                    key: type,
                    itemStyle: bubbleStyle,
                    data: [obj]
                };
                series.push(seriesObj);
            }
        }
    });
    layer.chartMsg.series = series;
};

export default {
    defaultFormat,
    drawMap,
    setSeries
};