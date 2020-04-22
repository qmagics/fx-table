import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

import FxTable from './FxTable.vue';
export { default as FxTableColumn } from './components/FxTableColumn.vue';

FxTable.install = (Vue, opt) => {
    Vue.component(FxTable.name, FxTable);
}

export default FxTable;