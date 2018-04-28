import { publicChartOption,createDataLabelsOption } from './publicChartOption.js';

const option = publicChartOption();

option.type = 'column';
option.name = '条形图';
option.img = './static/images/column.png';
option.chartType = 'highchart';

option.chartMsg.extra = {
    defaultSeries : {
        type :'bar',
        value : 1,
        name  : '系列',
        pointWidth:null,
        color : '#327EC8',
        borderColor : '#327EC8',
        dataLabels: createDataLabelsOption(),
        borderWidth : 1
    },
    series : [
        {
            type :'bar',
            value : 1,
            name  : '东京',
            pointWidth:null,
            color : '#327EC8',
            borderColor : '#327EC8',
            dataLabels: createDataLabelsOption(),
            borderWidth : 1
            
        }
    ]
};

export default [ option ];