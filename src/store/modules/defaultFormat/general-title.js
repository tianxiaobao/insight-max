const commonProp = (type, name, imgsrc) => {
    return {
        id: '',
        type: type,
        name: name,
        chartType: 'highchart',
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
    ...commonProp('generalTitle', '通用标题', './static/images/4.png'),
    chartMsg: {
        credits: {
            enabled: false
        },
        // 全局
        chart: {
            backgroundColor: '',
            borderColor: '',
            borderWidth: 0
        },
        title: {
            text: '我是标题数据',
            showText: '我是标题数据',
            align: 'center',
            alignList: [
                {
                    value: 'center',
                    name: '居中对齐'
                },
                {
                    value: 'left',
                    name: '左对齐'
                },
                {
                    value: 'right',
                    name: '右对齐'
                }
            ],
            verticalAlign: 'middle',
            style: {
                color: '#FFFFFF',
                fontSize: '28',
                fontWeight: 'normal',
                fontFamily: '微软雅黑'
            },
            fontFamily: ['微软雅黑', '宋体', '黑体', '幼圆', '隶书', 'tahoma'],
            fontWeightList: ['normal', 'bold', 'bolder', 'lighter', 200, 600],
            href: '',
            blank: true
        }
    },
    sourceData: {
        type: 'staticData',
        sData: [
            {
                value: '我是标题数据'
            }
        ],
        data: [], // 存储具体数据
        reflect: [{
            name: "value",
            reflectName: '',
            construction: '类目',
            state: false
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    }
};

export default [generalTitle];