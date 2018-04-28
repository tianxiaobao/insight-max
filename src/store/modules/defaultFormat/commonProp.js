export default (type, name, imgsrc, chartType='highchart') => {
    return {
        id: '',
        type: type,
        name: name,
        chartType: chartType,
        x: 100,  // x坐标
        y: 100,  // y坐标
        height: 300,
        width: 500,
        visiable: true,
        img: imgsrc, // 缩略图信息
        checked: false
    };
};