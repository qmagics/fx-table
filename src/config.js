//默认配置项
export const DEFAULT_OPTIONS = {
    background: '#fff',

    height: '100%',

    border: true,

    showIndex: false,

    indexTitle: "#",

    pageIndex: 1,

    pageSize: 10,

    pagerLayout: `sizes,prev,pager,next,jumper,->,total`,

    pagerSizes: [10, 20, 50, 100, 200, 500],

    data: [],

    size: "",

    selectable: false,

    singleSelect: false,

    clickToSelect: false,

    highlightCurrentRow: false,

    rowKey: '',

    api: '',

    method: 'get',

    resHandler(res) {
        return res.data;
    },

    order: "asc",

    sort: "",

    //是否有头部
    header: false,

    //header属性
    headerProps: {
        height: '50px'
    },

    //是否有侧边栏
    aside: false,

    //侧边栏属性
    asideProps: {
        width: 200,
        show: true,
        background: '#fff'
    },

    //是否有工具栏
    toolbar: true,

    //toolbar属性
    toolbarProps: {
        height: 50,
        position: 'left'
    },

    //是否有分页
    pagination: true,

    //分页属性
    paginationProps: {
        height: 50
    },

    //是否有尾部（包括分页组件）
    footer: false,

    //footer属性
    footerProps: {
        height: 50
    },

    //是否拥有关键词查询控件，当$slots.query不为空时生效
    keyword: true,

    //关键词查询控件属性
    keywordProps: {
        label: '',
        prop: 'key',
        placeholder: '请输入关键词'
    }
}