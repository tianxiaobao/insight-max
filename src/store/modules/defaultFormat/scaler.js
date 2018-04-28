import commonProp from './commonProp';
import Scaler from '../scaler';

const defaultFormat = [{
    ...commonProp('scaler', '条形占比图', './static/images/scaler.png', 'scaler'),
    // gif无sourceData
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [{
            value: 75
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
        total: 100,
        data: 75,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: '#28FFF2',
        borderWidth: 0,
        density: 32,
        startColor: '#00FFF0',
        endColor: '#FFFD00',
        tips: {
            fontSize: 32,
            color: '#28FFF2',
            decimal: 0
        }
    }
}];

const draw = (layer) => {
    if(!layer.chart) {
        layer.chart = new Scaler(layer.id);
    }
    layer.chart.setOption(layer.chartMsg);
};

const setSeries = (layer) => {
    const valueName = layer.sourceData.reflect[0].reflectName;
    if(layer.sourceData.type === 'staticData') {
        layer.chartMsg.data = layer.sourceData.sData[0][valueName];
    } else {
        layer.chartMsg.data = layer.sourceData.data[0][valueName];
    }
};

export default {
    defaultFormat,
    draw,
    setSeries
};
