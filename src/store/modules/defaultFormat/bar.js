import { publicChartOption,createDataLabelsOption } from './publicChartOption.js';

const option = publicChartOption();

option.type = 'bar';
option.name = '柱状图';
option.img = './static/images/bar.png';
option.chartType = 'highchart';

option.chartMsg.extra = {
    defaultSeries : {
        type  :'column',
        value : 1,
        name  : '系列',
        pointWidth:null,
        color : '#327EC8',
        borderColor : '#327EC8',
        dataLabels  : createDataLabelsOption(),
        borderWidth : 1
    },
    series : [
        {
            type  :'column',
            value : 1,
            name  : '东京',
            pointWidth:null,
            color : '#327EC8',
            borderColor : '#327EC8',
            dataLabels  : createDataLabelsOption(),
            borderWidth : 1

        },
        {
            type  :'column',
            value : 2,
            name  : '纽约',
            pointWidth:null,
            color : '#6CF5F2',
            borderColor : '#6CF5F2',
            dataLabels  : createDataLabelsOption(),
            borderWidth : 1
        }
    ]
};

export default [ option ];
