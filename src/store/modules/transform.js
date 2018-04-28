import jumap from './defaultFormat/jumap';
import marquee from './defaultFormat/marquee';
import flop from './defaultFormat/flop';
import scaler from './defaultFormat/scaler';
import Scatter from './scatter';

export default {

    seriesLatLon (chartS, data, lat, lon, z) {
        const series = [];
        const serie = Object.assign({}, chartS[0]);
        serie.data = [];
        for (let i = 0; i < data.length; i++) {
            serie.data.push({
                lat: data[i][lat],
                lon: data[i][lon],
                z: data[i][z]
            });
        }
        series.push(serie);
        return series;
    },

    seriesLatLonType (chartS, data, lat, lon, z, type) {
        const series = [];
        for (let i = 0; i < chartS.length; i++) {
            const serie = Object.assign({}, chartS[i]);
            serie.data = [];
            for (let i2 = 0; i2 < data.length; i2++) {
                if (data[i2][type] == serie.value) {
                    serie.data.push({
                        lat: data[i2][lat],
                        lon: data[i2][lon],
                        z: data[i2][z]
                    });
                }
            }
            series.push(serie);
        }
        return series;
    },

    setFillColor (serie) {
        switch (serie.type) {
        case 'area':
        case 'percentArea':
        case 'areaspline':
            const obj = serie.fillColorObj;
            if (!obj) return;
            if (obj.type == 'pure') {
                serie.fillColor = obj.color;
            } else {
                serie.fillColor = setLinear(obj);
            }
            break;
        };

        function setLinear (obj) {
            const value = obj.linear.value;

            let x1, y1, x2, y2;

            if (value < 45) {
                x1 = 0;
                y1 = 0;
                x2 = 1;
                y2 = 1 / 45 * value;
            } else if (value < 90) {
                x1 = 0;
                y1 = 0;
                x2 = 1 - (1 / 45 * (value - 45));
                y2 = 1;
            } else if (value < 135) {
                x1 = 1;
                y1 = 0;
                x2 = 1 - (1 / 45 * (value - 90));
                y2 = 1;
            } else if (value < 180) {
                x1 = 1;
                y1 = 0;
                x2 = 0;
                y2 = 1 - (1 / 45 * (value - 135));
            } else if (value < 225) {
                x1 = 1;
                y1 = 1;
                x2 = 0;
                y2 = 1 - (1 / 45 * (value - 180));
            } else if (value < 270) {
                x1 = 1;
                y1 = 1;
                x2 = 1 / 45 * (value - 225);
                y2 = 0;
            } else if (value < 315) {
                x1 = 0;
                y1 = 1;
                x2 = 1 / 45 * (value - 270);
                y2 = 0;
            } else if (value <= 360) {
                x1 = 0;
                y1 = 1;
                x2 = 1;
                y2 = 1 / 45 * (value - 315);
            }
            return {
                linearGradient: {
                    x1,
                    x2,
                    y1,
                    y2
                },
                stops: [
                  [0, obj.linear.from],
                  [1, obj.linear.to]
                ]

            };
        }
    },



    seriesXys (chartS, data, x, s, ...y) {
        const series = [];

        for (let i = 0; i < chartS.length; i++) {
            const serie = Object.assign({}, chartS[i]);
            this.setFillColor(serie);
            serie.data = [];
            for (let i2 = 0; i2 < data.length; i2++) {
                if (data[i2][s] == serie.value) {
                    const obj = {
                        name: data[i2][x]
                    };
                    y.forEach(function (item) {
                        obj[item[0]] = Number(data[i2][item[1]]);
                    });
                    serie.data.push(obj);
                }
            }
            series.push(serie);
        }
        return {
            series
        };
    },


    seriesXLine (chartS, data, x, y) {
        const series = [];
        if (data[0] instanceof Array) {
            for(let j = 0;j < data.length; j++) {
                const sdata = data[j].slice(0);
                for (let i = 0; i < chartS.length; i++) {
                    const serie = Object.assign({}, chartS[i]);
                    this.setFillColor(serie);
                    serie.data = [];
                    for (let i2 = 0; i2 < sdata.length; i2++) {
                        const obj = {
                            name: sdata[i2][x],
                            y:Number(sdata[i2][y])
                        };
                        serie.data.push(obj);
                    }
                    series.push(serie);
                }
            }
        } else {
            for (let i = 0; i < chartS.length; i++) {
                const serie = Object.assign({}, chartS[i]);
                this.setFillColor(serie);
                serie.data = [];
                for (let i2 = 0; i2 < data.length; i2++) {
                    const obj = {
                        name: data[i2][x],
                        y:Number(data[i2][y])
                    };
                    serie.data.push(obj);
                }
                series.push(serie);
            }
        }
        return {
            series
        };
    },


    seriesXysLine (chartS, data, x, y, s) {
        const series = [];
        if (data[0] instanceof Array) {
            for(let j = 0;j < data.length; j++) {
                const sdata = data[j].slice(0);
                for (let i = 0; i < chartS.length; i++) {
                    const serie = Object.assign({}, chartS[i]);
                    this.setFillColor(serie);
                    serie.data = [];
                    for (let i2 = 0; i2 < sdata.length; i2++) {
                        if (sdata[i2][s] == serie.value) {
                            const obj = {
                                name: sdata[i2][x],
                                y:Number(sdata[i2][y]),
                                s:sdata[i2][s]
                            };
                            serie.data.push(obj);
                        }
                    }
                    series.push(serie);
                }
            }
        } else {
            for (let i = 0; i < chartS.length; i++) {
                const serie = Object.assign({}, chartS[i]);
                this.setFillColor(serie);
                serie.data = [];
                for (let i2 = 0; i2 < data.length; i2++) {
                    if (data[i2][s] == serie.value) {
                        const obj = {
                            name: data[i2][x],
                            y:Number(data[i2][y]),
                            s:data[i2][s]
                        };
                        serie.data.push(obj);
                    }
                }
                series.push(serie);
            }
        }
        return {
            series
        };
    },

    seriesXy (chartS, data, x, ...y) {
        const series = [];
        const serie = Object.assign({}, chartS[0]);
        this.setFillColor(serie);
        serie.data = [];
        for (let i = 0; i < data.length; i++) {
            const obj = {
                name: data[i][x]
            };
            y.forEach(function (item) {
                obj[item[0]] = Number(data[i][item[1]]);
            });
            serie.data.push(obj);
        }
        series.push(serie);
        return {
            series
        };
    },
    seriesfunnel (layer, result, x, y) {
        const series = [],
            nx = x.reflectName,
            ny = y.reflectName;
        if (!nx || !ny) return;
        result.forEach((item) => {
            if (item[nx] && item[ny]) {
                series.push({
                    name: item[nx],
                    y: Number(item[ny]),
                    color: ''
                });
            }
            layer.sourceData.reflect[0].state = !item[nx] ? false : true;
            layer.sourceData.reflect[1].state = !item[ny] ? false : true;
        });
        return series;
    },
    seriesPieXy (layer, result, x, y) {
        const series = [],
            nx = x.reflectName,
            ny = y.reflectName;

        if (!nx || !ny) return;
        result.forEach((item) => {
            if (item[nx] && item[ny]) {
                series.push({
                    name: item[nx],
                    y: Number(item[ny])
                });
            }
            layer.sourceData.reflect[0].state = !item[nx] ? false : true;
            layer.sourceData.reflect[1].state = !item[ny] ? false : true;
        });

        return series;
    },
  // 处理折线柱图数据-系列匹配
    seriesXyys (chartS, data, x, s, ...y) {
        const series = [];
        for (let i = 0; i < chartS.length; i++) {
            const serieBar = Object.assign({}, chartS[i].column);
            const serieLine = Object.assign({}, chartS[i].line);
            serieBar.data = [];
            serieLine.data = [];
            for (let i2 = 0; i2 < data.length; i2++) {
                if (data[i2][s] == serieBar.value) {
                    const obj = {
                        name: data[i2][x]
                    };

                    y.forEach(function (item) {
                        obj[item[0]] = Number(data[i2][item[1]]);
                    });
                    serieBar.data.push(obj);
                    serieLine.data.push(obj);
                }
            }
            series.push(serieBar);
            series.push(serieLine);
        }
        return {
            series
        };
    },
  // 处理折线柱图数据-系列未匹配
    seriesXyy (chartS, data, x, ...y) {
        const series = [];
        const serieBar = Object.assign({}, chartS[0].column);
        const serieLine = Object.assign({}, chartS[0].line);
        serieBar.data = [];
        serieLine.data = [];
        for (let i = 0; i < data.length; i++) {
            const obj = {
                name: data[i2][x]
            };
            y.forEach(function (item) {
                obj[item[0]] = Number(data[i2][item[1]]);
            });
            serieBar.data.push(obj);
            serieLine.data.push(obj);
        }
        series.push(serieBar);
        series.push(serieLine);
        return {
            series
        };
    },
    line (layer) {
        const sourceData = layer.sourceData;
        const s = layer.chartMsg.extra.series;
        const sData = sourceData['sData'];
        let data = this.getChartData(sourceData);
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        let series = [];
        if (dataType == 'staticData') {
            sourceData.data = sData;
            data = this.getChartData(sourceData);
        }
        const x = reflect[0];
        const y = reflect[1];
        const sReflect = reflect[2];
        if (x.state && y.state && sReflect.state) {
            ({series} = this.seriesXysLine(s, data, 'x', 'y', 's'));
        } else if (x.state && y.state && !sReflect.state) {
            layer.chartMsg.extra.series = [layer.chartMsg.extra.defaultSeries];
            ({series} = this.seriesXLine(layer.chartMsg.extra.series, data, 'x', 'y'));
        }
        layer.chartMsg.series = series;
        return layer;
    },
  // 折线柱图
    lineBar (layer) {
        const sourceData = layer.sourceData;
        const s = layer.chartMsg.s;
        const sData = sourceData['sData'];
        let data = sourceData.data;
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        let series = [];
        if (dataType == 'staticData') {
            data = sData;
        }
        const x = reflect[0];
        const y1 = reflect[1];
        const y2 = reflect[2];
        const sReflect = reflect[3];
        if (x.state && y1.state && y2.state && sReflect.state) {
            ({ series} = this.seriesXyys(s, data, x.reflectName, sReflect.reflectName, ['y', y1.reflectName], ['y', y2.reflectName]));
        } else if (x.state && y1.state && y2.state && !sReflect.state) {
            if (s.length) {
                layer.chartMsg.s = [s[0]];
            } else {
                layer.chartMsg.s = [$.extend(true, {}, layer.chartMsg.extra.series)];
            }
            ({series} = this.seriesXyy(layer.chartMsg.s, data, x.reflectName, ['y', y1.reflectName], ['y', y2.reflectName]));
        }
        layer.chartMsg.series = series;
        return layer;
    },
    area (layer) {
        this.line(layer);
        return layer;
    },
    areaStacking (layer) {
        this.line(layer);
        return layer;
    },
    arearange (layer) {
        const sourceData = layer.sourceData;
        const s = layer.chartMsg.extra.series;
        const sData = sourceData['sData'];
        let data = sourceData.data;
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        let series = [];
        if (dataType == 'staticData') {
            data = sData;
        }
        const x = reflect[0];
        const y = reflect[1];
        const y2 = reflect[2];

        const sReflect = reflect[3];
        if (x.state && y.state && y2.state && sReflect.state) {
            ({series} = this.seriesXys(s, data, x.reflectName, sReflect.reflectName, ['high', y.reflectName], ['low', y2.reflectName]));
        } else if (x.state && y.state && y2.state && !sReflect.state) {
            layer.chartMsg.extra.series = [layer.chartMsg.extra.defaultSeries];
            ({series} = this.seriesXy(layer.chartMsg.extra.series, data, x.reflectName, ['high', y.reflectName], ['low', y2.reflectName]));
        }
        layer.chartMsg.series = series;
        return layer;
    },
    percentArea (layer) {
        this.line(layer);
        return layer;
    },
    column (layer) {
        this.bar(layer);
        return layer;
    },
    bar (layer) {
        const sourceData = layer.sourceData;
        const s = layer.chartMsg.extra.series;
        const sData = sourceData['sData'];
        let data = this.getChartData(sourceData);
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        let series = [];
        if (dataType == 'staticData') {
            sourceData.data = sData;
            data = this.getChartData(sourceData);
        }
        const x = reflect[0];
        const y = reflect[1];
        const sReflect = reflect[2];
        if (x.state && y.state && sReflect.state) {
            ({series} = this.seriesXysLine(s, data, 'x', 'y', 's'));
        } else if (x.state && y.state && !sReflect.state) {
            layer.chartMsg.extra.series = [layer.chartMsg.extra.defaultSeries];
            ({series} = this.seriesXLine(s, data, 'x', 'y'));
        }
        layer.chartMsg.series = series;
        return layer;
    },
    Radar (layer) {
        this.line(layer);
        return layer;
    },

    stackedBar (layer) {
        this.bar(layer);
        return layer;
    },
    stackedColumn (layer) {
        this.bar(layer);
        return layer;
    },
    percentColumn (layer) {
        this.bar(layer);
        return layer;
    },
    columnRange (layer) {
        this.arearange(layer);
        return layer;
    },

    negativeBar (layer) {
        this.bar(layer);
        return layer;
    },
    seriesWf (chartS, data, x, y) {
        const series = [];
        let serie;
        for (let j = 0; j < chartS.length; j++) {
            serie = Object.assign({}, chartS[j]);
            this.setFillColor(serie);
            for (let i = 0; i < data.length; i++) {
                if (serie.rName == data[i][x]) {
                    serie.name == data[i][x];
                    serie.y = Number(data[i][y]);
                }
            }
            series.push(serie);
        }
        return {
            series
        };
    },
    waterFall (layer) {
        const sourceData = layer.sourceData;
        const sData = sourceData['sData'];
        let data = sourceData.data;
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;

        let series = [];
        if (dataType == 'staticData') {
            data = sData;
        }
        const x = reflect[0];
        const y = reflect[1];
        if (x.state && y.state) {
      // layer.chartMsg.extra.series[0].data = [layer.chartMsg.extra.defaultSeries];
            ({
        series
      } = this.seriesWf(layer.chartMsg.extra.series[0].data, data, x.reflectName, y.reflectName));
        }
        layer.chartMsg.series[0].data = series;
        return layer;
    },

    threeDPie (layer) {
        this.pie(layer);
        return layer;
    },

    threeDRing (layer) {
        this.pie(layer);
        return layer;
    },

    pie (layer) {
        const sourceData = layer.sourceData;
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        const x = reflect[0];
        const y = reflect[1];
        let result = null;
        if (dataType == 'staticData') {
            result = sourceData['sData'];
        } else if (dataType == 'database') {
            result = sourceData.data;
        }
    // 为了解决饼图环形图变换颜色不保存的问题添加了if判断
        if (layer.chartMsg.series[0].data.length == this.seriesPieXy(layer, result, x, y).length) {
            const data = Object.assign({}, layer.chartMsg.series[0].data);
            layer.chartMsg.series[0].data = this.seriesPieXy(layer, result, x, y);
            layer.chartMsg.series[0].data.forEach((item, index) => {
                item['color'] = data[index].color;
            });
        } else {
            layer.chartMsg.series[0].data = this.seriesPieXy(layer, result, x, y);
        }
        return layer;
    },
    pieRing (layer) {
        this.pie(layer);
        return layer;
    },
    pieSector (layer) {
        this.pie(layer);
        return layer;
    },
    funnel (layer) {
        const sourceData = layer.sourceData;
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        const x = reflect[0];
        const y = reflect[1];
        let result = null;

        if (dataType == 'staticData') {
            result = sourceData['sData'];
        } else if (dataType == 'database') {
            result = sourceData.data;
        }
        layer.chartMsg.series[0].data = this.seriesfunnel(layer, result, x, y);
        return layer;
    },
    carouselImg (layer) {
        const sourceData = layer.sourceData;
        const dataType = sourceData.type;
        const reflect = sourceData.reflect;
        const url = reflect[0];
        const des = reflect[1];
        let result = null;
        if (dataType == 'staticData') {
            result = sourceData['sData'];
        } else if (dataType == 'database') {
            result = sourceData.data;
        }
        layer.chartMsg.src = this.setCarouse(layer, result, des, url);
        return layer;
    },
    setCarouse (layer, result, x, y) {
        const series = [],
            nx = x.reflectName,
            ny = y.reflectName;
        if (!nx || !ny) return;
        result.forEach((item) => {
            if (item[nx] && item[ny]) {
                series.push({
                    description: item[nx],
                    url: item[ny]
                });
            }
            layer.sourceData.reflect[0].state = !item[nx] ? false : true;
            layer.sourceData.reflect[1].state = !item[ny] ? false : true;
        });

        return series;
    },
    generalTitle (layer) {
        const sourceData = layer.sourceData;
        const {
      type: dataType,
      reflect
    } = sourceData;
        const result = dataType == 'staticData' ? sourceData.sData : sourceData.data;
        const styleText = layer.chartMsg.title.text;
        const dataText = this.getgGeneralTitle(layer, result, reflect[0]);
        layer.chartMsg.title.text = styleText ? styleText : dataText;
        return layer;
    },
    getgGeneralTitle (layer, result, reflect) {
        let str = '';
        const name = reflect.reflectName;

        result.forEach((item) => {
            if (name !== '' && item[name]) {
                str = item[name];
            }
            layer.sourceData.reflect[0].state = !item[name] ? false : true;
        });

        return str;
    },
    bubble (layer) {
        const sourceData = layer.sourceData;
        const {
      type: dataType,
      reflect
    } = sourceData;
        const result = dataType == 'staticData' ? sourceData.sData : sourceData.data;
        const series = this.getBubbleXYR(layer, result, reflect);
        layer.chartMsg.s = series;
        layer.chartMsg.series = series;

        return layer;
    },
    getBubbleXYR (layer, result, reflect) {
        const series = layer.chartMsg.s;
        const [x, y, r, s] = reflect;
        const number = num => isNaN(Number(num)) ? 0 : Number(num);

        series.forEach(item => {
            const value = item.value;
            const serie = [];

            result.forEach(one => {
                if (one[s.reflectName] == value) {
                    serie.push([number(one[x.reflectName]), number(one[y.reflectName]), number(one[r.reflectName])]);
                }
            });
            item.data = serie;
        });
        return series;
    },
    jumap (layer) {
        jumap.setSeries(layer);
    },
    scaler (layer) {
        scaler.setSeries(layer);
    },
    marquee (layer) {
        marquee.setSeries(layer);
    },
    flop (layer) {
        flop.setSeries(layer);
    },
    scatter (layer) {
        return Scatter.setSeries(layer);
    },
    video (layer) {
        const sourceData = layer.sourceData;
        const {
      type: dataType,
      reflect
    } = sourceData;
        const result = dataType == 'staticData' ? sourceData.sData : sourceData.data;
        const info = this.getVideoInfo(layer, result, reflect);
        const oldUrl = layer.chartMsg.video.url;
        const newUrl = info.url;

        layer.chartMsg.video.url = newUrl !== '' ? newUrl : oldUrl;
        layer.sourceData.reflect[0].state = info.state;
        return layer;
    },
    getVideoInfo (layer, result, reflect) {
        const name = reflect[0].reflectName;
        const info = {
            url: '',
            state: ''
        };
        result.forEach(item => {
            info.url = item[name] ? item[name] : '';
            info.state = Object.keys(item)[0] !== name ? false : true;
        });
        return info;
    },
    getChartData (sourceData) {
    // 处理多个维度数据
        const reflect = sourceData.reflect;
        const data = sourceData.data;
        const reflectData = [];
        let objX;
        if (reflect[0].reflectName.indexOf(",") > 0 && reflect[1].reflectName.indexOf(",") > 0) {
            const reflectX = reflect[0].reflectName.split(",");
            const reflectY = reflect[1].reflectName.split(",");
            const reflectS = reflect[2].reflectName;
            for (let k = 0; k < reflectY.length; k++) {
                const yArr = [];
                $.each(data, function (index, value) {
                    objX = [];
                    for (let i = 0; i < reflectX.length; i++) {
                        objX.push(value[reflectX[i]]);
                    }
                    objX = objX.join("-");
                    for (let j = 0; j < reflectY.length; j++) {
                        if(j==k) {
                            const obj = {
                                x: objX,
                                y: value[reflectY[j]],
                                s: value[reflectS]
                            };
                            yArr.push(obj);
                        }
                    }
                });
                reflectData.push(yArr);
            }
        } else if (reflect[0].reflectName.indexOf(",") > 0 && reflect[1].reflectName.indexOf(",") < 0) {
            const reflectX = reflect[0].reflectName.split(",");
            const reflectY = reflect[1].reflectName;
            const reflectS = reflect[2].reflectName;
            $.each(data, function (index, value) {
                objX = [];
                for (let i = 0; i < reflectX.length; i++) {
                    objX.push(value[reflectX[i]]);
                }
                objX = objX.join("-");
                const obj = {
                    x: objX,
                    y: value[reflectY],
                    s: value[reflectS]
                };
                reflectData.push(obj);
            });
        } else if (reflect[0].reflectName.indexOf(",") < 0 && reflect[1].reflectName.indexOf(",") > 0) {
            const reflectX = reflect[0].reflectName;
            const reflectY = reflect[1].reflectName.split(",");
            const reflectS = reflect[2].reflectName;
            for (let j = 0; j < reflectY.length; j++) {
                const yArr = [];
                $.each(data, function (index, value) {
                    const obj = {
                        x: value[reflectX],
                        y: value[reflectY[j]],
                        s: value[reflectS]
                    };
                    yArr.push(obj);
                });
                reflectData.push(yArr);
            }
        } else {
            const reflectX = reflect[0].reflectName;
            const reflectY = reflect[1].reflectName;
            const reflectS = reflect[2].reflectName;
            $.each(data, function (index, value) {
                const obj = {
                    x: value[reflectX],
                    y: value[reflectY],
                    s: value[reflectS]
                };
                reflectData.push(obj);
            });
        }
        return reflectData;
    }
};
