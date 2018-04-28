import Vue from 'vue';
import Router from 'vue-router';

import datasource from './datasource';
import screen from './screen';
import console from '../views/console';
import myScreen from './myScreen';
import previewScreen from './previewScreen';
import borwser from '@/components/borwser';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'console',
            path: '/console',
            component: console,
            children: [
                datasource,
                myScreen
            ]
        },
        screen,
        previewScreen,
        {
            path: '/borwser',
            name: 'borwser',
            component: borwser
        },
        {
            path: '/',
            redirect: '/console/myScreen'
        },
        {
            path: '*',
            redirect: '/console/myScreen'
        }
    ]
});
