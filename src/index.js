import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import FxTable from './FxTable.vue';
export { default as FxTableColumn } from './components/FxTableColumn.vue';

FxTable.install = (Vue, opt) => {
    Vue.component(FxTable.name, FxTable);

    //注册默认的action，可以简化配置项，对于多数页面都有的简单通用的操作，诸如增、删、改、查、导入、导出、打印、复制...
    const { actionMap } = opt;

}

export default FxTable;