import commonProp from './commonProp';
import * as d3 from "d3";

class Marquee {
    constructor (id) {
        this._id = id;
        this._container = document.getElementById(id);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        while(this._container.hasChildNodes()) {  
            this._container.removeChild(div.firstChild);  
        }
        this._container.append(svg);
        this._text = d3.select(svg).append('text');
        this._text.append('tspan');
        this._text.append('animate');
    }
    setOption (option) {
        this._option = option;
        option.repeatCount = option.run? 'indefinite' : 0;
        option.duration = Number(option.duration);
        option.delay = Number(option.delay);
        this._text.select('tspan')
            .attr('fill', option.fontColor)
            .attr('font-size', option.fontSize)
            .attr('y', option.fontSize)
            .text(option.text);
        const len = Math.max(this._text.node().textLength.baseVal.value, this._container.clientWidth);
        const cutTime = option.duration / (option.duration + option.delay) / 2;

        this._text.select('animate')
            .attr('attributeName', 'x')
            .attr('dur', option.duration + option.delay + 'ms')
            .attr('keyTimes', '0;' + cutTime + ';' + (1-cutTime) + ';1')
            .attr('values', len + ';0;0;' + (-len) )
            .attr('repeatCount', option.repeatCount);
    }
    reflow () {
        const len = Math.max(this._text.node().textLength.baseVal.value, this._container.clientWidth);
        this._text.select('animate').attr('values', len + ';0;0;' + (-len) );
    }
}

// 图像默认值
const defaultFormat = [{
    ...commonProp('marquee', '跑马灯', './static/images/marquee.png', 'gif'),
    // gif无sourceData
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [{
            value: '跑马灯效果展示'
        }],
        data: [], // 存储具体数据
        individuationSerise: [],
        reflect: [{
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
    chartMsg: {
        fontSize: 32,
        fontColor: '#FFFFFF',
        run: true,
        duration: 5000,
        delay: 0,
        text: ''
    }
}];

// 画图
const draw = (layer) => {
    if(!layer.chart) {
        layer.chart = new Marquee(layer.id);
    }
    layer.chart.setOption(layer.chartMsg);
};

const setSeries = (layer) => {
    const valueName = layer.sourceData.reflect[0].reflectName;
    if(layer.sourceData.type === 'staticData') {    
        layer.chartMsg.text = layer.sourceData.sData[0][valueName];
    } else {
        layer.chartMsg.text = layer.sourceData.data[0][valueName];
    }
};

export default {
    defaultFormat,
    draw,
    setSeries
};