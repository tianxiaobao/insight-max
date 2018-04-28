// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import Cookies from 'js-cookie';
import VueEvents from 'vue-events';
import layer from './components/layer';
import VueLazyload from 'vue-lazyload';
import { Slider, Tooltip, Loading, Checkbox, Upload, Message } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import bs from '@/utils/bs';

Vue.config.productionTip = false;

Vue.use(layer);
Vue.use(VueEvents);
Vue.use(VueLazyload);
Vue.use(Slider);
Vue.use(Tooltip);
Vue.use(Loading);
Vue.use(Checkbox);
Vue.use(Upload);

store.cookies = Cookies;
Vue.prototype.$message = Message;

const isLogin = (to, from, next) => {
    const pin = Cookies.get('pin');
    const href = window.location.href;

    if(!pin && to.name != 'previewScreen') {
        const exitUrl = `http://uc.jcloud.com/login?returnUrl=${href}`;
        window.location.href = exitUrl;
    } else {
        next();
    }
};

let isChrome = Cookies.get('chrome');

if((isChrome == 0 || !isChrome) && bs.chrome) {
    Cookies.set('chrome', bs.chrome);
}

const checkBS = (to, from, next) => {
    isChrome = Cookies.get('chrome');

    if((isChrome == 0 || !isChrome) && to.name != 'previewScreen') {
        next('/borwser');
    } else {
        next();
    }
};

router.beforeEach((to, from, next) => {
    isLogin(to, from, next);
    checkBS(to, from, next);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
