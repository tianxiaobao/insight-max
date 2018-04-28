import commonProp from './commonProp';
import * as d3 from "d3";

class Flop {
    constructor (id) {
        this._id = id;
        this._container = document.getElementById(id);
        const title = document.createElement('div');
        title.className = 'title';
        title.style.position = 'relative';
        const flop = document.createElement("div");
        flop.className = 'flop';
        flop.style.position = 'relative';
        while(this._container.hasChildNodes()) {  
            this._container.removeChild(div.firstChild);  
        }
        this._container.append(title);
        this._container.append(flop);
        const flopD3 = d3.select(flop);
        flopD3.append('span').attr('class', 'prefix');
        this._numberContanier = flopD3.append('div').style('display', 'inline-block');
        d3.select(flop).append('span').attr('class', 'suffix');
    }
    _drawTitle () {
        const title = this._option.title;
        d3.select(this._container)
            .select('.title')
            .text(title.display)
            .style('color', title.fontColor)
            .style('font-size', title.fontSize + 'px')
            .style('left', title.x + 'px')
            .style('top', title.y + 'px');
    }
    _drawFlop () {
        const flop = this._option.flop;
        // 前缀
        d3.select(this._container)
            .select('.flop')
            .style('left', flop.x + 'px')
            .style('top', flop.y + 'px')
            .select('.prefix')
            .text(flop.prefix.display)
            .style('color', flop.prefix.fontColor)
            .style('font-size', flop.prefix.fontSize + 'px');
        // 后缀
        d3.select(this._container)
            .select('.flop')
            .select('.suffix')
            .text(flop.suffix.display)
            .style('color', flop.suffix.fontColor)
            .style('font-size', flop.suffix.fontSize + 'px');
        this._drawFlopNumber();
    }
    _drawFlopNumber () {
        const nOption = this._option.flop.number;
        nOption.content = Number(nOption.content);
        const step = (nOption.content - nOption.oldNumber) * 80 / 876;
        if(step !== 0) {
            if(this._interval) window.clearInterval(this._interval);
            this._interval = window.setInterval(this._animateNumber.bind(this), 80, nOption, step);
            return;
        }
        nOption.oldNumber = nOption.content;
        this._drawFlopNumberSpan(nOption.content);
    }
    _drawFlopNumberSpan (number) {
        const nOption = this._option.flop.number;
        const numberArray = this._doDecimal(number);
        this._doBit(numberArray, nOption.bit);
        if(nOption.thousandSeparator) this._doThousandSeparator(numberArray);
        this._drawSpan(numberArray);
    }
    _animateNumber (nOption, step) {
        nOption.oldNumber += step;
        if(Math.abs(nOption.content - nOption.oldNumber) <= Math.abs(step)) {
            // || (step > 0 && nOption.oldNumber <= nOption.content)
            // || (step < 0 && nOption.oldNumber >= nOption.content)) {
            nOption.oldNumber = nOption.content;
            window.clearInterval(this._interval);
        }
        this._drawFlopNumberSpan(nOption.oldNumber);
    }
    _drawSpan (numberArray) {
        const nOption = this._option.flop.number;
        const span = this._numberContanier.selectAll('span');
        const update = span.data(numberArray);
        const enter = update.enter();
        const exit = update.exit();
        update.text((d) => d)
            .style('color', nOption.fontColor)
            .style('font-size', nOption.fontSize + 'px')
            .style('margin-left', nOption.padding + 'px')
            .style('margin-right', nOption.padding + 'px')
            .style('padding', '5px')
            .style('background-color', (d) => d!==','||nOption.separatorColor?nOption.backgroundColor:'rgba(0,0,0,0)')
            .style('border-radius', nOption.backgroundRadius + 'px')
            .style('line-height', nOption.fontSize + 'px');

        enter.append('span')
            .text((d) => d)
            .style('color', nOption.fontColor)
            .style('font-size', nOption.fontSize + 'px')
            .style('display', 'inline-block')
            .style('margin-left', nOption.padding + 'px')
            .style('margin-right', nOption.padding + 'px')
            .style('padding', '5px')
            .style('background-color', nOption.backgroundColor)
            .style('border-radius', nOption.backgroundRadius + 'px');
        exit.remove();
    }
    _doBit (numberArray, bit) {
        const len = numberArray.length;
        if (bit > 0) {
            if (bit > len) {
                const prefix = new Array(bit - len).fill(0);
                numberArray = prefix.concat(numberArray);
            } else if (bit < len) {
                numberArray = numberArray.splice(0, bit - len);
            }
        }
    }
    _doThousandSeparator (numberArray) {
        let index = numberArray.indexOf('.');
        if(index === -1) index = numberArray.length;
        index -= 3;
        while(index > 0) {
            numberArray.splice(index, 0, ',');
            index -= 3;
        }
    }
    _doDecimal (number) {
        const nOption = this._option.flop.number;
        let numberArray = [];
        if(nOption.rounding) {
            numberArray = Math.round(number).toString().split('');
        } else {
            numberArray = number.toFixed(nOption.decimal).split('');
        }
        return numberArray;
    }
    setOption (option) {
        this._option = option;
        this._drawTitle();
        this._drawFlop();
    }
    reflow () {
    }
}

// 图像默认值
const defaultFormat = [{
    ...commonProp('flop', '翻牌器', './static/images/flop.png', 'flop'),
    // gif无sourceData
    sourceData: {
        type: 'staticData', // 数据来源类型，静态数据或数据库
        sData: [{
            value: 2332.124
        }],
        data: [], // 存储具体数据
        individuationSerise: [],
        reflect: [
            {
                name: "name",
                reflectName: '',
                construction: '标题',
                state: true
            },
            {
                name: "value",
                reflectName: 'value',
                construction: '翻牌器数值',
                state: true
            },
            {
                name: "prefix",
                reflectName: '',
                construction: '翻牌器前缀',
                state: true
            },
            {
                name: "suffix",
                reflectName: '',
                construction: '翻牌器后缀',
                state: true
            }
        ], // 映射关系
        sql: '',
        databaseId: '',
        refreshState: false, // 是否定时更新
        reflectFrequency: 60 // 更新频率(s)
    },
    chartMsg: {
        title: {
            fontColor: '#fff',
            fontSize: 32,
            x: 0,
            y: 10,
            display: 'title',
            content: 'title'
        },
        flop: {
            x: 0,
            y: 50,
            prefix: {
                content: '￥',
                display: '￥',
                fontColor: '#fff',
                fontSize: 32
            },
            number: {
                fontColor: '#FFF600',
                fontSize: 32,
                padding: 0.2,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                backgroundRadius: 2,
                separatorBgColor: true,
                bit: 100,
                rounding: true,
                separatorColor: false,
                thousandSeparator: true,
                content: 23133,
                oldNumber: 0,
                decimal: 2
            },
            suffix: {
                content: '元',
                display: '元',
                fontColor: '#fff',
                fontSize: 32
            }
        }
    }
}];

// 画图
const draw = (layer) => {
    if(!layer.chart) {
        layer.chart = new Flop(layer.id);
    }
    layer.chart.setOption(layer.chartMsg);
};

const setSeries = (layer) => {
    const titleName = layer.sourceData.reflect[0].reflectName;
    const valueName = layer.sourceData.reflect[1].reflectName;
    const prefixName = layer.sourceData.reflect[2].reflectName;
    const suffixName = layer.sourceData.reflect[3].reflectName;
    const key = layer.sourceData.type === 'staticData'? 'sData' : 'data'; 
    layer.chartMsg.title.display = layer.sourceData[key][0][titleName] || layer.chartMsg.title.content;
    layer.chartMsg.flop.number.content = layer.sourceData[key][0][valueName] || 0;
    layer.chartMsg.flop.prefix.display = layer.sourceData[key][0][prefixName] || layer.chartMsg.flop.prefix.content;
    layer.chartMsg.flop.suffix.display = layer.sourceData[key][0][suffixName] || layer.chartMsg.flop.suffix.content;
};

export default {
    defaultFormat,
    draw,
    setSeries
};