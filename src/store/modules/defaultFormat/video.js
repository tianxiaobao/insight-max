import commonProp from './commonProp';

const video = {
    ...commonProp('video', '视频', './static/images/video.png', 'video'),
    chartMsg: {
        video: {
            url: '',
            autoplay: 'autoplay',
            loop: 'lopp'
        }
    },
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [
            {
                url: ''
            }
        ],
        data: [],
        reflect: [{
            name: "url",
            reflectName: 'url',
            construction: '视频地址',
            state: true
        }], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    }
};

export default [video];