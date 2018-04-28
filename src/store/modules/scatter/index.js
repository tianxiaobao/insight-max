const transform = (layer, data, reflect) => {
    const series = layer.chartMsg.s;
    const x = reflect[0].reflectName;
    const y = reflect[1].reflectName;
    const s = reflect[2].reflectName;

    series.forEach(item => {
        const value = item.value;
        const serie = [];
        data.forEach(o => {
            if(value == o[s]) {
                serie.push([ Number(o[x]), Number(o[y]) ]);
            }
        });
        item.data = serie;
    });

    return series;
};

const setSeries = (layer) => {
    const sourceData = layer.sourceData;
    const dataType = sourceData.type;
    const reflect = sourceData.reflect;
    let result = null;

    if(dataType == 'staticData') {
        result = sourceData.sData;
    } else {
        result = sourceData.data;
    }

    const series = transform(layer, result, reflect);

    layer.chartMsg.s = series;
    layer.chartMsg.series = series;
    return layer;
};


export default {
    setSeries
};

