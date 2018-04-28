export default [{

    id: '',
    type: 'border',
    name: '边框',
    chartType: 'highchart',
    x: 100,  // x坐标
    y: 100,  // y坐标
    height: 300,
    width: 500,
    visiable: true,
    img: './static/images/border.png', // 缩略图信息

    checked:false,
    zIndex : 100,
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData:[],
        data: [], // 存储具体数据
        reflect: [], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },
    chartMsg: {

        credits: {
            enabled: false
        },

        title:{
            text : ''
        },

        chart:{
            borderRadius : 10,
            backgroundColor : '',
            borderWidth  : 1,
            borderColor  : '335cad'
        }
    }
}];