import commonProp from './commonProp';
import carouselImg from '../assist/carouselImg/index';

// 图像默认值
const defaultFormat = [{
    ...commonProp('carouselImg', '轮播图', './static/images/18.png', 'carousel'),
  // gif无sourceData
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [
            {
                description: "这是第一张图片的描述",
                url:"./static/images/1112.jpg"
            },
            {
                description: "这是第二张图片的描述",
                url:'./static/images/1113.jpg'
            }
        ],
        data: [], // 存储具体数据
        reflect: [
            {
                name: "url",
                reflectName: 'url',
                construction: 'url',
                state: true
            },{
                name: "描述",
                reflectName: 'description',
                construction: '描述',
                state: true
            }
        ], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },
    chartMsg: {
        src: [
            {
                description: "这是第一张图片的描述",
                url:"./static/images/13.png"
            },
            {
                description: "这是第二张图片的描述",
                url:'./static/images/12.png'
            },
            {
                description: "这是第三张图片的描述",
                url:'./static/images/11.png'
            }
        ],
        fontFamily:'微软雅黑',
        titleFontSize:'12',
        stopTime:2500,
        animationSpeed:1000,
        zoomMode:'等比例缩放宽度铺满',
        deg:90,
        efficiency:'水平滚动',
        col:4,
        row:6,
        beginColor:'rgba(19,68,88,0.25)',
        endColor:'rgba(231,229,229,0.9)',
        textColor:"#f50e0e",
        textLabelLength:"100",
        textLabelWidth:"10",
        marginTop:"0",
        marginLeft:"0",
        desEnabled:true,
        dotEnabled:true,
        colorStyleText:'渐变色',
        singleColor:'#000000',
        alignmentStyle:'居左',
        dotColor:'#ffffff',
        currentColor:'#70b075'
    }
}];


// 画图
const draw = (layer) => {
    if(!layer.chart) {
        layer.chart = new carouselImg(layer.id);
    }
    layer.chart.setOption(layer.chartMsg);
};


export default {
    defaultFormat,
    draw
};
