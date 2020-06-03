// import Vue from 'vue';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);

import FxTable from './FxTable.vue';

FxTable.install = (Vue, opt) => {
    Vue.component(FxTable.name, FxTable);

    const { presetActions, defaultOptions, presetColumnRenderers } = opt || {};

    //覆盖表格默认的配置项，可以提供自定义的初始展现形式
    Vue.__FxTable_defaultOptions = defaultOptions;

    //注册默认的action，可以简化配置项，对于多数页面都有的简单通用的操作，诸如增、删、改、查、导入、导出、打印、复制...，可以通过此配置来简化代码量
    Vue.__FxTable_presetActions = presetActions;

    //注册默认的tableColumn渲染器，对于大多数通用的单元格显示格式，诸如链接、图片、输入框、进度条..., 可以通过此配置来简化代码量
    Vue.__FxTable_presetColumnRenderers = presetColumnRenderers;
}

export default FxTable;

export { default as FxTableColumn } from './components/FxTableColumn.vue';

export { default as Action } from './classes/Action';