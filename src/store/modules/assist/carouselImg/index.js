import * as d3 from "d3";

class carouselImg {
    constructor (id) {
        this.interval = [];
        // 图片数量
        this.count = '';
        this._id = id;
        this._container = document.getElementById(id);
        this._height = this._container.clientHeight;
        this._width = this._container.clientWidth;
        this.outArea = document.createElement('div');
        this.outArea.id = 'slide-box' + id;
        this.outArea.style.height = '100%';
        // this.outArea.style.width = 'auto';
        this.outArea.style.position = 'relative';
        this.outArea.style.overflow = 'hidden';
        this._list = document.createElement('ul');
        this._list.id = 'images-wrap'+id;
        this._list.style.left = '0px';
        this._list.style.height = this._container.clientHeight + 'px';
        this._list.style.width = this._container.clientWidth + 'px';
        this._list.style.position = 'absolute';
        this.canvas = "";
        this.imgSrc = [];
        this.canvasTimer = [];
        this.k = {};
        this.k[this._id] = 0;
        while (this._container.hasChildNodes()) {
            this._container.removeChild();
        }
        this._container.append(this.outArea);
        this.outArea.append(this._list);
    }
    drawTitle (box, option, index) {
        const title = box.append('p')
            .attr('class', 'titleDom')
            .style('position', 'absolute')
            .style('left', '0')
            .style('top', '0px')
            .style('width', option.textLabelLength + '%')
            .style('height', option.textLabelWidth + '%')
            .style('display', 'table')
            .style('margin-top', option.marginTop + 'px')
            .style('margin-Left', option.marginLeft + 'px')
            .style('opacity', 1)
            .style('line-height', option.textLabelLength + '%')
            .style('font-size', option.titleFontSize + 'px')
            .style('font-family', option.fontFamily)
            .style('alpha', 0.5)
            .style("color", option.textColor)
            .text(option.src[index].description);
        if (option.colorStyleText == '渐变色')
            title.style('background', 'linear-gradient(' + option.deg + 'deg' + ',' + option.beginColor + ',' + option.endColor);
        else
            title.style('background', option.singleColor);
        if (option.alignmentStyle == '居左')
            title.style('text-align', 'left');
        else if (option.alignmentStyle == '居中')
            title.style('text-align', 'center');
        else if (option.alignmentStyle == '居右')
            title.style('text-align', 'right');
        if (option.fontFamily == '微软雅黑')
            title.style('font-family', 'Microsoft Yahei');
        else if (option.fontFamily == '宋体')
            title.style('font-family', 'SimSun');
        else if (option.fontFamily == '黑体')
            title.style('font-family', 'SimHei');
        else if (option.fontFamily == '隶书')
            title.style('font-family', 'LiSu');
        else if (option.fontFamily == '幼圆')
            title.style('font-family', 'YouYuan');
        else
            title.style('font-family', 'tahoma');
    }
    play (option) {
        // 动画开启方法
        clearInterval(this.interval[this._id]);
        if(option.efficiency == "马赛克" ) {
            const img = new Image(),
                ctx = this.canvas;
            img.src = this._option.src[0].url;
            img.onload = function () {
                ctx.drawImage(img,0,0,img.width,img.height,0,0,ctx.canvas.width,ctx.canvas.height);
            };
            this.animateMasica(this.canvas,this._option.src,parseInt(option.col),parseInt(option.row),1);
            this._option.col = option.col;
            this._option.row = option.row;
        }else{
            let cnt = 0;
            this.interval[this._id] = setInterval(() => {
                if (option.efficiency == '水平滚动') {
                    this.animateAlign(-this._container.clientWidth);
                } else if (option.efficiency == '垂直滚动') {
                    this.animateVertical(-this._container.clientHeight);
                } else if (this._option.efficiency == '淡入淡出') {
                    if(cnt < $(this._list).children("li").length -1) {cnt++;} else{cnt = 0;}
                    this.animateOpacity(cnt);
                } else {
                }
            }, option.stopTime);
            this._list.style.left = 0;
            this._list.style.top = 0;
        }
    }



    // 删除节点方法
    removeDom (key) {
        d3.select(this._container).select(key).remove();
    }
    drawDots (option) {
        const mainId = "#slide-box" + this._id;
        const subClass = ".dots-wrap" + this._id;
        const subClassName = "dots-wrap" + this._id;
        const box = d3.select(this._container).select(mainId);
        box.append('ol')
            .attr('class', subClassName)
            .style('z-index', 2)
            .style('position', 'absolute')
            .style('left', '47%')
            .style('opacity', 1)
            .style('float', 'left')
            .style('bottom', '10px')
            .style('padding', 0)
            .style('margin', 0)
            .style('overflow', 'hidden');
        const dotswrap = d3.select(this._container).select(subClass);
        for (let i = 0; i < option.src.length; i++) {
            const dot = dotswrap.append('li')
                .attr('class', 'dots-wrapItem')
                .style('list-style', 'none')
                .style('float', 'left')
                .style('width', '10px')
                .style('height', '10px')
                .style('border-radius', '50%')
                .style('margin-right', '5px');
            if (i == 0)
                dot.style('background', option.dotColor);
            else
                dot.style('background', option.currentColor);
        }
    }
    animateAlign (offset) {
        // 水平动画
        const newLeft = {};
        const totalWidth = {};
        const seed = "left " + (this._option.animationSpeed/1000) + "s ease";
        newLeft[this._id] = parseInt(this._list.style.left);
        totalWidth[this._id] = -(this.count - 1) * this._container.clientWidth;
        if(newLeft[this._id] <= totalWidth[this._id]) {
            newLeft[this._id] = 0;
            $(this._list).css("left", newLeft[this._id]);
            $(this._list).css("transition",seed);
        }else{
            newLeft[this._id] = parseInt(this._list.style.left) + offset;
            $(this._list).css("left", newLeft[this._id]);
            $(this._list).css("transition",seed);
        }
        const index = parseInt(newLeft[this._id] / offset);
        this.drawCurrentDot(index);
    }
    animateVertical (offset) {
        // 垂直动画
        const newTop = {};
        const totalHeight = {};
        const seed = "top " + (this._option.animationSpeed/1000) + "s ease";
        newTop[this._id] = parseInt(this._list.style.top);
        totalHeight[this._id] = -(this.count - 1) * this._container.clientHeight ;
        if(newTop[this._id] <= totalHeight[this._id]) {
            newTop[this._id] = 0;
            $(this._list).css("top", newTop[this._id]);
            $(this._list).css("transition",seed);
        }else{
            newTop[this._id] = parseInt(this._list.style.top) + offset;
            $(this._list).css("top", newTop[this._id]);
            $(this._list).css("transition",seed);
        }
        const index = parseInt(newTop[this._id] / offset);
        this.drawCurrentDot(index);
    }
    animateOpacity (cnt) {
        // 淡入淡出动画
        const _this = this;
        $(this._list).children("li").each(function (index) {
            const seed = "all " + (_this._option.animationSpeed/1000) + "s ease";
            if(index == cnt ) {
                $(this).css('opacity',1);
                $(this).css('transition',seed);
            }else{
                $(this).css('opacity',0);
                $(this).css('transition',seed);
            }
        });
        this.drawCurrentDot(cnt);
    }

    animateMasica (ctx, img, col, row, k) {
        const conWidth = ctx.canvas.width / col,
            conHeight = ctx.canvas.height / row,
            num = col*row,
            seed = this._option.animationSpeed,
            stopTime = this._option.stopTime;
        const dimensionality = [],
            arr = [];
        const timer = {};
        for (let i0 = 0; i0 < row; i0++) {
            for (let j0 = 0; j0 < col; j0++) {
                dimensionality.push([j0,i0]);
            }
        }
        const _this = this;
        this.interval = timer;
        timer[this._id] = setInterval(function () {
            const image = new Image();
            image.src = img[k].url;
            const imgWidth = image.width / col;
            const imgHeight = image.height / row;
            if(arr.length == num) {
                clearInterval(timer[_this._id]);
                _this.canvasTimer[_this._id] = setTimeout(function () {
                    k++;
                    if(k == img.length) k = 0;
                    image.src = img[k].url;
                    image.onload = function () {
                        _this.animateMasica(ctx,img,parseInt(_this._option.col),parseInt(_this._option.row), k);
                    };
                    _this.drawCurrentDot(k);
                },stopTime);
                return;
            }
            let imgArr = [];
            for(let i = 0; ; i++) {
                const random = Math.floor(Math.random()*num);
                if(arr.indexOf(random) < 0) {
                    arr.push(random);
                    imgArr = dimensionality[random];
                    break;
                }
            }
            ctx.drawImage(image,imgArr[0]*imgWidth,imgArr[1]*imgHeight,imgWidth,imgHeight,imgArr[0]*conWidth,imgArr[1]*conHeight,conWidth,conHeight);
        },seed);
    }
    // 指示点绘制
    drawCurrentDot (index) {
        const subClass = ".dots-wrap" + this._id;
        const box = $(subClass).children('li');
        for (let i = 0; i < this.count; i++) {
            if (index == i) {
                $(box[i]).css('background', this._option.dotColor);
            } else {
                $(box[i]).css('background', this._option.currentColor);
            }
        }
    }

    drawli (option) {
        const id = "#images-wrap" + this._id;
        this._list.style.left = 0;
        this._list.style.top = 0;
        if (this._option.efficiency == '水平滚动') {
            this._list.style.width = (this._container.clientWidth) * this.count + 'px';
            this._list.style.height = this._container.clientHeight + 'px';
        } else if (this._option.efficiency == '垂直滚动') {
            this._list.style.width = this._container.clientWidth + 'px';
            this._list.style.height = (this._container.clientHeight) * this.count + 'px';
        } else if (this._option.efficiency == '淡入淡出') {
            this._list.style.width = this._container.clientWidth + 'px';
            this._list.style.height = this._container.clientHeight + 'px';
        }else {
            const canP = "images-wrap" + this._id;
            const canC = "canvas-wrap" + this._id;
            const canParent = document.getElementById(canP);
            const licanvas = document.createElement("canvas");
            licanvas.id = canC;
            canParent.appendChild(licanvas);
            licanvas.width = this._container.clientWidth;
            licanvas.height = this._container.clientHeight;
            this.canvas = licanvas.getContext("2d");
            return ;
        }
        const box = d3.select(this._container).select(id);
        for (let i = 0; i < this.count; i++) {
            const liImg = box.append('li')
                .style('height', this._container.clientHeight + 'px')
                .style('width', this._container.clientWidth + 'px')
                .style('opacity', 1)
                .style('position', 'relative')
                .style('text-align', 'center')
                .style('overflow', 'hidden');
            if (option.efficiency == '淡入淡出') {
                if(i == 0) {
                    liImg.style('opacity', 1)
                    .style('position', 'absolute');
                }else{
                    liImg.style('opacity', 0)
                    .style('position', 'absolute');
                }
                liImg.style('transition','all 2.5s ease');
            }
            if(this._option.efficiency == '水平滚动' || this._option.efficiency == '垂直滚动') {
                liImg.style('float', 'left');
            }
            const img = liImg.append('img')
                .attr('src', option.src[i].url)
                .style('position', 'relative');
            if (option.zoomMode == '全屏铺满') {
                img.style('height', this._container.clientHeight + 'px')
                    .style('width', this._container.clientWidth + 'px');
            } else if (option.zoomMode == '等比例缩放宽度铺满') {
                img.style('max-height', 'none')
                    .style('width', this._container.clientWidth + 'px')
                    .style('max-width', this._container.clientWidth + 'px')
                    .style('top', '50%')
                    .style('height', 'auto')
                    .style('transform', 'translateY(-50%)');
            } else if (option.zoomMode == '等比例缩放高度铺满') {
                img.style('max-height', this._container.clientHeight + 'px')
                    .style('height', this._container.clientHeight + 'px')
                    .style('top', '50%')
                    .style('width', 'auto')
                    .style('transform', 'translateY(-50%)');
            }
            if (option.desEnabled)
                this.drawTitle(liImg, option, i);
        }
    }
    setOption (option) {
        this.count = option.src.length;
        this._option = option;
        this.deleteDom();
        this.drawli(option);
        if (option.dotEnabled)
            this.drawDots(option);
        this.play(option);
    }
    reawDraw () {
        this.deleteDom();
        this.setOption(this._option);
    }
    deleteDom () {
        clearInterval(this.interval[this._id]);
        if(this.canvasTimer[this._id]) {
            clearInterval(this.canvasTimer[this._id]);
        }
        const id = "#images-wrap" + this._id;
        const subClass = ".dots-wrap" + this._id;
        const box = d3.select(this._container).select(id);
        box.html('');
        $(id).css('transition','all 0s ease');
        this.removeDom(subClass);
        this.removeDom('.titleDom');
    }
    reflow () {
        this._list.style.height = this._container.clientHeight + 'px';
        this._list.style.width = this._container.clientWidth + 'px';
        this._list.top = 0;
        this._list.left = 0;
        this.reawDraw();
    }
}
export default carouselImg;

