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