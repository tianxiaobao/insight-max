import commonProp from './commonProp';

const generalTitle = {
    ...commonProp('singlePic', '单张图片', './static/images/singlePic.png'),
    chartMsg: {
        credits: {
            enabled: false
        },
        // 全局
        chart: {
            backgroundColor: '',
            plotBackgroundImage: ''
        },
        title: {
            text: ''
        }
    },
    sourceData: {
        type: 'staticData',
        sData: [
            {
                img: ''
            }
        ],
        data: [], // 存储具体数据
        reflect: [{
            name: "img",
            reflectName: 'img',
            construction: '类目',
            state: true
        }], // 映射关系
        sql: '',
        layerUrl:'',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    }
};

export default [generalTitle];