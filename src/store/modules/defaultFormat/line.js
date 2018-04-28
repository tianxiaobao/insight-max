import { publicChartOption,createDataLabelsOption } from './publicChartOption.js';

const option = publicChartOption();

option.type = 'line';
option.name = '折线图';
option.img = './static/images/line.png';
option.chartType = 'highchart';

option.chartMsg.extra = {
    defaultSeries : {
        type : 'line',
        dashStyle : 'Solid',
        value : 1,
        name  : '系列',
        color : '#327EC8',
        lineWidth:2 ,
        marker : {
            enabled:true,
            fillColor : '#327EC8',
            radius  : 5
        },
        dataLabels: createDataLabelsOption()
    },

    series : [
        {
            type : 'line',
            dashStyle : 'Solid',
            value : 1,
            name  : '东京',
            color : '#327EC8',
            lineWidth:2 ,
            marker : {
                enabled:true,
                fillColor : '#327EC8',
                radius  : 5
            },
            dataLabels: createDataLabelsOption()
        },
        {
            type : 'line',
            dashStyle : 'Solid',
            value : 2,
            name  : '纽约',
            color : '#6CF5F2',
            lineWidth:2 ,
            marker : {
                enabled:true,
                fillColor : '#6CF5F2',
                radius  : 5
            },
            dataLabels: createDataLabelsOption()
        }
    ]
};

export default [ option ];
