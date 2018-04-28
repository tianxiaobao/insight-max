const bs = {};
const ua = navigator.userAgent.toLowerCase();
let s;
(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? bs.ie = s[1] :
(s = ua.match(/msie ([\d.]+)/)) ? bs.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? bs.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? bs.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? bs.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? bs.safari = s[1] : 0;

export default bs;