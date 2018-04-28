import datasource from './datasource';
import screen from './screen';
import myScreen from './myScreen';
import setdata from './setdata';

export default {
    ...datasource,
    ...screen,
    ...myScreen,
    ...setdata
};
