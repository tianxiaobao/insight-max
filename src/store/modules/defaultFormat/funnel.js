import commonProp from './commonProp';
const funnel = {
    ...commonProp('funnel', '漏斗图', './static/images/funnel.png', 'highchart'),
    chartMsg: {
        chart: {
            type: 'funnel',
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0,
            marginTop: 36,
            marginRight: 0,
            marginBottom: 20,
            marginLeft: 40
        },
        title: {
            text: '最终下载量',
            x: 1,
            y: 14,
            style: {
                color: '#fff',
                fontSize: 14
            }
        },
        subtitle: {
            x: 1,
            y: 40,
            text: '数据来源: DarK-AleX',
            style: {
                color: '#FFFFFF',
                fontSize: 14
            }
        },
        plotOptions: {
            funnel: {
                borderColor: '#EEE',
                borderWidth: 1,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b> ({point.y:,.0f})',
                    softConnector: true,
                    distance: 30,
                    style: {
                        color: '#FFF',
                        fontSize: 12
                    }
                },
                center: ['40%', '50%'],
                neckWidth: '30%',
                neckHeight: '25%',
                width: '80%'
            },
            series: {
                animation: false,
                events: {
                    legendItemClick: function () {
                // return false 即可禁止图例点击响应
                        return false;
                    }
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [
            {
                type: 'funnel',
                data: [
                    {
                        name: '下载产品',
                        y: 15654,
                        color: '#95ceff'

                    },
                    {
                        name: '询价',
                        y: 4064,
                        color: '#5c5c61'
                    },
                    {
                        name: '发送合同',
                        y: 1987,
                        color: '#f7a35c'
                    },
                    {
                        name: '成交',
                        y: 976,
                        color: '#999eff'
                    }
                ]
            }]
    },
    sourceData: {
        type: 'staticData',
        sData: [
            {
                "x": "下载产品",
                "y": 15654
            },
            {
                "x": '询价',
                "y": 4064
            },
            {
                "x": '发送合同',
                "y": 1987
            },
            {
                "x": '成交',
                "y": 976
            }
        ],
        data: [], // 存储具体数据
        reflect: [{
            name: "x",
            reflectName: 'x',
            construction: '类目',
            state: true
        },{
            name: "y",
            reflectName: 'y',
            construction: '值',
            state: true
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    }
};
export default [funnel];
