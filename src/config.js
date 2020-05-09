//默认配置项
export const DEFAULT_OPTIONS = {
    background: '#fff',

    height: '100%',

    width: '100%',

    border: false,

    outBorder: true,

    showIndex: false,

    indexTitle: "#",

    pageNumber: 1,

    pageSize: 10,

    pagerLayout: `sizes,prev,pager,next,jumper,->,total`,

    pagerSizes: [10, 20, 50, 100, 200, 500],

    data: [],

    size: "small",

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

    fullScreen: false,

    fullScreenProps: {
        showToggle: true
    },

    //是否有头部
    header: false,
    //header属性
    headerProps: {
        classes: '',
        height: '50px',
        background: ''
    },

    //是否有侧边栏
    aside: false,
    //侧边栏属性
    asideProps: {
        width: 200,
        bottom: 0,//左右侧栏优先展示，因此bottom和top写死，后期做成优先级可配置
        top: 0,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //是否有右侧边栏
    asideRight: false,
    //右侧边栏属性
    asideRightProps: {
        width: 200,
        bottom: 0,//左右侧栏优先展示，因此bottom和top写死，后期做成优先级可配置
        top: 0,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //底部侧边栏
    asideBottom: false,
    //底部侧边栏属性
    asideBottomProps: {
        height: 200,
        show: true,
        background: '#fff',
        showToggle: false,
    },

    //头部侧边栏
    asideTop: false,
    //头部侧边栏属性
    asideTopProps: {
        height: 200,
        show: true,
        background: '#fff',
        showToggle: false,
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
        height: 50,
        background: '#f3f3f3'
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