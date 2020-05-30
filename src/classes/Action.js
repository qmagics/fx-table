import Vue from 'vue';

export default class Action {
    /**
     * 操作类
     * @param {Object|String} options 配置项 
     * @param {Object} thisArg callback函数的this指向对象,默认会指向FxTable实例
     */
    constructor(options, thisArg) {
        this.thisArg = thisArg || null;
        this.__isAction = true;

        if (typeof options === 'object') {
            this.initOptions(options);
        }
        else if (typeof options === 'string') {
            const presetOptions = Action.getOptionsByCode(options);

            if (presetOptions) {
                this.initOptions(presetOptions);
            }
        }
    }

    /**
     * 初始化配置项
     * @param {Object} options 配置对象 
     */
    initOptions(options) {
        const { name, code, type, category, icon, loading, disabled, callback, meta, children } = options;

        this.name = name;

        this.code = code;

        this.type = type;

        this.category = category;

        this.icon = icon;

        this.loading = loading;

        this.disabled = disabled;

        this.callback = callback;

        this.meta = meta;

        this.children = [];

        if (this.callback && typeof this.callback === 'function') {
            this.split = true;
        }

        if (children && children.length) {
            children.forEach(i => {
                if (this.category === 'dropdown') {
                    i.category = 'item';
                }

                this.children.push(i.__isAction ? i : new Action(i, this.thisArg));
            });
        }
    }

    /**
     * 根据代码获取预设配置项
     * @param {string} code 代码 
     */
    static getOptionsByCode(code) {
        const map = Vue.__FxTable_presetActions;

        return (map && map[code]) ? map[code] : null;
    }

}