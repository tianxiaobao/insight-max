/**
 * 正则、转义等方法
 */

export default {
    htmlEscape (html) {
        return html.replace(/[<>&]/g, (c) => {
            return {'<': '&lt;' ,'>': '&gt;', '&': '&amp;'}[c];
        });
    },
    escapeHtml (str) {
        const map = {'lt':'<','gt':'>','nbsp':' ','amp':'&'};
        return str.replace(/&(lt|gt|nbsp|amp);/ig, (all, t) => {
            return map[t];
        });
    }
};