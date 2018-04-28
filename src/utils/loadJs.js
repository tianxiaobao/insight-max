// 加载JS文件

export default (id, filename) => {
    const oldjs = document.getElementById(id); 
    if(oldjs) oldjs.parentNode.removeChild(oldjs); 
    const scriptObj = document.createElement("script"); 
    scriptObj.src = filename; 
    scriptObj.type = "text/javascript"; 
    scriptObj.id = id;
    document.getElementsByTagName("body")[0].appendChild(scriptObj);
    return scriptObj;
};