import * as d3 from "d3";

class Scaler {
    constructor (id) {
        this._id = id;
        this._container = document.getElementById(id);
        this._height = this._container.clientHeight;
        this._width = this._container.clientWidth;
    }
    setOption (option) {
        this._option = option;
        this._height = this._container.clientHeight;
        this._width = this._container.clientWidth;
        // 清空图例
        this._removeDom('.percentage-bar');
        // 格式转换
        option.data = Number(option.data);
        option.total = Number(option.total);
        if(typeof option.data === 'number'
            && !isNaN(option.data)
            && typeof option.total === 'number'
            && !isNaN(option.total)) {
            // 计算百分比
            this._percent = (100).toFixed(option.tips.decimal) + '%';
            if(option.data <= option.total)
                this._percent = (option.data/option.total*100).toFixed(option.tips.decimal) + '%';
            // 画图
            d3.select(this._container)
                .append('div')
                .attr('class', 'percentage-bar');
            this._drawTips();
            this._drawPercentBar();
        }
    }
    reflow () {
        this._height = this._container.clientHeight;
        this._width = this._container.clientWidth;
        this._removeDom('.percentage-svg');
        this._drawPercentBar();
    }
    _removeDom (key) {
        d3.select(this._container)
            .select(key)
            .remove();
    }
    _drawTips () {
        const option = this._option;
        this._removeDom('.percentage-tips');
        const box = d3.select(this._container).select('.percentage-bar');
        box.append('div')
            .attr('class', 'percentage-tips')
            .style('height', option.tips.fontSize + 'px')
            .style('padding', '10px')
            .append('span')
            .style('line-height', option.tips.fontSize + 'px')
            .style('font-size', option.tips.fontSize + 'px')
            .style('color', option.tips.color)
            .style('position', 'relative')
            .style('left', this._percent)
            .text(this._percent);
    }
    _drawPercentBar () {
        const option = this._option;
        const svgHeight = this._height - option.tips.fontSize - 40;
        if(svgHeight > 0) {
            const box = d3.select(this._container).select('.percentage-bar');
            const svg = box.append('div')
                .attr('class', 'percentage-svg')
                .style('height', svgHeight + 'px')
                .style('padding', '10px')
                .style('background-color', option.backgroundColor)
                .style('border', option.borderWidth + 'px' + ' solid ' + option.borderColor)
                .append('svg');
            const defs = svg.style('height', '100%')
                .style('width', '100%')
                .append('defs');
            this._drawLinearGradient(defs);
            this._drawClipPath(defs);
            this._drawRect(svg);
        }
    }
    _drawRect (svg) {
        svg.append('rect')
            .attr('height', '100%')
            .attr('width', this._percent)
            .attr('fill', 'url(#linearGradient' + this._id + ')')
            .attr('clip-path', 'url(#clipPath' + this._id + ')');
    }
    _drawClipPath (defs) {
        const option = this._option;
        const width = this._width / option.density;
        const count = Math.ceil(this._width * option.data / option.total / width);
        const data = new Array(count);
        const lastWidth = this._width * option.data / option.total - width * (count-1);
        return defs.append("clipPath")
            .attr('id', 'clipPath' + this._id)
            .selectAll("rect")
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * width)
            .attr('y', 0)
            .attr('width', (d, i) => i===count-1? lastWidth:width-1)
            .attr('height', "100%");
    }
    _drawLinearGradient (defs) {
        const data = [this._option.startColor, this._option.endColor];
        return defs.append("linearGradient")
            .attr('id', 'linearGradient' + this._id)
            .selectAll("stop")
            .data(data)
            .enter()
            .append('stop')
            .attr('offset', (d, i) => i * 100 + '%')
            .attr('stop-color', (d) => d);
    }
}

export default Scaler;
