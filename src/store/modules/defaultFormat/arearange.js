import { publicChartOption ,createDataLabelsOption } from './publicChartOption.js';

const option = publicChartOption();

option.type = 'arearange';
option.name = '面积范围图';
option.img = './static/images/arearange.png';
option.chartType = 'highchart';

option.chartMsg.extra = {
    defaultSeries : {
        type : 'arearange', 
        value : 1,
        name  : '系列',
        color : '#327EC8',
        dataLabels: createDataLabelsOption()
    },

    series : [
        {
            type : 'arearange', 
            value : 1,
            name  : '东京',
            color : '#327EC8',
            dataLabels: createDataLabelsOption()
        }
    ]
};

option.sourceData.sData = [
    {
        "x": "一月",
        "y1": 2.0,
        "y2": 7.0,
        "s": "1"
    },
    {
        "x": "一月",
        "y1": 3,
        "y2": 5,
        "s": "2"
    },
    {
        "x": "二月",
        "y1": 3.4,
        "y2": 6.4,
        "s": "1"
    },
    {
        "x": "二月",
        "y1": 6.9,
        "y2": 12,
        "s": "2"
    },
    {
        "x": "三月",
        "y1": 2.5,
        "y2": 9.5,
        "s": "1"
    },
    {
        "x": "三月",
        "y1": 1.7,
        "y2": 5.7,
        "s": "2"
    },

    {
        "x": "四月",
        "y1": 4.5,
        "y2": 7.5,
        "s": "1"
    },
    {
        "x": "四月",
        "y1": 3.3,
        "y2": 8.3,
        "s": "2"
    }

];
option.sourceData.reflect = [{
    name: "x",
    reflectName: 'x',
    construction: '类目',
    state: true
},{
    name: "y1",
    reflectName: 'y1',
    construction: '值',
    state: true
},
{
    name: "y2",
    reflectName: 'y2',
    construction: '值',
    state: true
},
{
    name: "s",
    reflectName: 's',
    construction: '系列(可选)',
    state: true
}];


export default [ option ];