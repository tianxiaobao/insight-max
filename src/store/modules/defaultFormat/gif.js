import commonProp from './commonProp';

class Gif {
    constructor (id) {
        this._id = id;
        this._container = document.getElementById(id);
        this._img = document.createElement('img');
        this._img.style.height = this._container.clientHeight + 'px';
        this._img.style.width = this._container.clientWidth + 'px';
        while(this._container.hasChildNodes()) {
            this._container.removeChild(div.firstChild);
        }
        this._container.append(this._img);
    }
    setOption (option) {
        this._option = option;
        this._img.src = './static/images/gif/' + option.src + '.gif';
        this._img.style.opacity = option.opacity;
        this._img.style.height = this._container.clientHeight + 'px';
        this._img.style.width = this._container.clientWidth + 'px';
        let transform = "rotate(" + option.rotate + "deg)";
        if(option.mirrorX) transform += " scaleX(-1)";
        if(option.mirrorY) transform += " scaleY(-1)";
        this._img.style.transform
        = this._img.style.webkitTransform
        = transform;
    }
    reflow () {
        this._img.style.height = this._container.clientHeight + 'px';
        this._img.style.width = this._container.clientWidth + 'px';
    }
}

// 图像默认值
const defaultFormat = [{
    ...commonProp('gif', '装饰', './static/images/12.png', 'gif'),
    // gif无sourceData
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [],
        data: [], // 存储具体数据
        individuationSerise: [],
        reflect: [], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },
    chartMsg: {
        src: 'gif01',
        mirrorX: false,
        mirrorY: false,
        rotate: 0,
        opacity: 1
    }
}];

// 画图
const draw = (layer) => {
    if(!layer.chart) {
        layer.chart = new Gif(layer.id);
    }
    layer.chart.setOption(layer.chartMsg);
};

export default {
    defaultFormat,
    draw
};
