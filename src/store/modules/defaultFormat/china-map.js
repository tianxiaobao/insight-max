const commonProp = (type, name, imgsrc) => {
    return {
        id: '',
        type: type,
        isMap : true,
        name: name,
        x: 100,  // x坐标
        y: 100,  // y坐标
        height: 300,
        width: 500,
        visiable: true,
        img: imgsrc, // 缩略图信息
        checked: false
    };
};

const generalTitle = {
    ...commonProp('chinaMap', '中国边界地图', './static/images/11.png'),
    chartMsg: {
        extra : {
            map : 'china',
            mapChild : '',// 第三级选择的值
            colorArr : [],
            series: [
                {
                    type: 'mapbubble',
                    value : '1',
                    color : '#ee4433'
                }
            ],
            serie:{
                type: 'mapbubble',
                value : '1',
                color : '#ee4433'
            },
            areaArr:[],
            areaArrChild : [],// 第三级数组
            mapdata:null // 存储查询数据，减少请求
        },
        loading:{
            labelStyle: {
                fontSize : '36px'
            }
        },
        credits:{
            enabled:false
        },
        chart:{
            backgroundColor : '',
            borderColor:'#335cad', // 边框颜色
            borderWidth: 0,        // 边框宽度
            marginLeft: 0,         // 左侧
            marginRight: 0,        // 右侧
            marginTop: 10,         // 顶部
            marginBottom: 10       // 底部
        },
        title: {
            text: '中国地图', // 标题名称
            style:{
                color    :   "#ffffff",  // 颜色
                fontSize :   "18"     // 字号
            },
            x: 0, // x 偏移
            y: 18 // y 偏移
        },
        subtitle: {
            text: '数据来源: jcloud.com', // 标题名称
            style:{
                color    :   "#ffffff", // 颜色
                fontSize :   "12" // 字号
            },
            x: 0, // x 偏移
            y: 38 // y 偏移
        },
        tooltip: {
            enabled: false
        },
        legend:{
            enabled : false
        },
        plotOptions:{
            series: {
                enableMouseTracking: false
            },
            map:{
                dashStyle: 'Solid',
                borderWidth : 1,
                borderColor : '#cccccc',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    format: '{point.properties.fullname}'
                },
                color: '#ffffff'
            },
            mapbubble:{
                minSize: 8,
                maxSize: 20
            }
        },
        series: [
            {
                data: [],
                mapData: [],
                joinBy: 'name' // 根据 name 属性进行关联
            },
            {
                // Specify points using lat/lon
                type: 'mapbubble',
                data: [{
                    lat: 39.997222,
                    lon: 116.44444,
                    z: 7
                }, {
                    lat: 38.997222,
                    lon: 110.44444,
                    z: 10
                }, {
                    lat: 28.997222,
                    lon: 100.44444,
                    z: 8
                }, {
                    lat: 24.997222,
                    lon: 115.44444,
                    z: 9
                }]
            }
        ]
    },
    sourceData: {
        type: 'staticData',
        sData: [
            {
                lon: 116.44444,
                lat: 39.997222,
                value: 7,
                type : 1
            }, {
                lon: 110.44444,
                lat: 38.997222,
                value: 10,
                type : 2
            }, {
                lon: 100.44444,
                lat: 28.997222,
                value: 8,
                type : 1
            }, {
                lon: 115.44444,
                lat: 24.997222,
                value: 9,
                type : 2
            }
        ],
        data: [], // 存储具体数据
        reflect: [{
            name: "lon",
            reflectName: 'lon',
            construction: '经度',
            state: true
        },
        {
            name: "lat",
            reflectName: 'lat',
            construction: '维度',
            state: true
        },
        {
            name: "z",
            reflectName: 'value',
            construction: '值大小',
            state: true
        },
        {
            name: "type",
            reflectName: 'type',
            construction: '气泡类型(可选)',
            state: true
        }
        ], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: true, // 是否定时更新
        reflectFrequency: 50 // 更新频率(ms)
    }
};
export default [generalTitle];