import Vue from 'vue';

/**
 * 获取计算之后的分页列表
 * @param {number} size 需要显示的分页
 * @param {array} sizes 当前的分页列表
 */
export function getCalcPagerSizes(size, sizes) {
    if (sizes.indexOf(size) >= 0) {
        return sizes;
    }
    else {
        let arr = sizes.concat(size).sort((a, b) => a - b);
        return arr;
    }
}

/**
 * css属性值转化
 * @param {string|number} val css属性值（包括 百分比,px,数字）
 */
export function getCssNumber(val) {
    return typeof val === 'string' ? val : val + 'px';
}

/**
 * 转换方向字符串
 * @param {string} position 原方向
 */
export function reversePositionText(position) {
    return {
        left: 'right',
        right: 'left',
        bottom: 'top',
        top: 'bottom',
    }[position] || '';
}

/**
 * 字符串首字母转大写
 * @param {string} str 
 */
export function firstToUpper(str) {
    str = str.trim();
    return str.replace(str[0], str[0].toUpperCase());
}

/**
 * 格式化默认columns
 * @param {any} columns 源数据
 */
export function genColumns(columns) {
    return columns.map(i => {
        return {
            ...i,
            visible: i.visible !== false ? true : false,
            children: (!i.children || !i.children.length) ? [] : genColumns(i.children)
        }
    });
}

/**
 * isArray
 * @param {any} obj 
 */
export function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * isNotEmpty
 * @param {any} obj 
 */
export function isNotEmpty(obj) {
    return obj !== NaN && obj !== null && obj !== undefined && obj !== "";
}

/**
 * 装饰表格数据
 * @param {array} rows 源数据
 */
export function decorateData(rows) {
    return rows.map(row => {
        return decorateRow(row);
    });
}

/**
 * 装饰数据行
 * @param {any} row 
 */
export function decorateRow(row) {
    const presetRowStates = Vue.__FxTable_presetRowStates;

    return {
        ...row,
        $state: {
            // pending: false,
            ...presetRowStates
        },
        children: (row.children && row.children.length) ? row.children.map(i => decorateRow(i)) : []
    }
}