import { publicChartOption , createDataLabelsOption } from './publicChartOption.js';

const option = publicChartOption();

option.type = 'area';
option.name = '面积图';
option.img = './static/images/area.png';
option.chartType = 'highchart';

option.chartMsg.extra = {
    defaultSeries : {
        fillColorObj:{
            type : 'linear',
            color: '#327EC8',
            linear:{
                from : '#327EC8',
                to : '#336633',
                value : 0
            }
        },

        type : 'area', 
        dashStyle : 'Solid',
        value : 1,
        name  : '系列',
        color : '#327EC8',
        lineWidth:2 ,
        fillColor:'#327EC8',
        marker : {
            enabled: false,
            fillColor : '#327EC8',
            radius  : 5
        },
        dataLabels: createDataLabelsOption()
    },

    series : [
        {
            type : 'area', 
            dashStyle : 'Solid',
            value : 1,
            name  : '东京',
            color : '#327EC8',
            lineWidth:2 ,
            fillColorObj:{
                type : 'linear',
                color: '#327EC8',
                linear:{
                    from : '#327EC8',
                    to : '#336633',
                    value : 0
                }
            },
            fillColor:'#327EC8',
            marker : {
                enabled: false,
                fillColor : '#327EC8',
                radius  : 5
            },
            dataLabels: createDataLabelsOption()
        }
    ]
};

// option.chartMsg.plotOptions.area = {
//     stacking: 'normal'
// }
export default [ option ];