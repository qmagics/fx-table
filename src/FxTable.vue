<template>
  <div class="fx-table" :class="classes" :style="style">
    <div
      class="fx-table--header"
      :class="cOptions.headerProps.classes"
      v-if="cOptions.header"
      :style="headerStyle"
    >
      <slot name="header"></slot>
    </div>

    <div class="fx-table--body" :style="bodyStyle">
      <!-- start 扩展的侧边栏部分 -->
      <FxAside
        v-if="cOptions.aside"
        :opened.sync="showAside"
        :style="asideStyle"
        :showToggle="cOptions.asideProps.showToggle"
        position="left"
      >
        <slot name="aside"></slot>
      </FxAside>

      <FxAside
        v-if="cOptions.asideRight"
        :opened.sync="showAsideRight"
        :style="asideRightStyle"
        :showToggle="cOptions.asideRightProps.showToggle"
        position="right"
      >
        <slot name="asideRight"></slot>
      </FxAside>

      <FxAside
        v-if="cOptions.asideBottom"
        :opened.sync="showAsideBottom"
        :style="asideBottomStyle"
        :showToggle="cOptions.asideBottomProps.showToggle"
        position="bottom"
      >
        <slot name="asideBottom"></slot>
      </FxAside>

      <FxAside
        v-if="cOptions.asideTop"
        :opened.sync="showAsideTop"
        :style="asideTopStyle"
        :showToggle="cOptions.asideTopProps.showToggle"
        position="top"
      >
        <slot name="asideBottom"></slot>
      </FxAside>
      <!-- end 扩展的侧边栏部分 -->

      <div class="fx-table--main" :style="mainStyle">
        <div class="fx-table--toolbar" v-if="cOptions.toolbar" :style="toolbarStyle">
          <slot name="toolbar">
            <DefaultToolbar v-bind="cOptions.toolbarProps" />
          </slot>
        </div>

        <transition name="el-zoom-in-top">
          <div class="fx-table--fixedbar" v-show="superSearch">
            <FxSearchbar v-model="searchModel" superMode @confirm="onSuperSearchConfirm">
              <slot name="superQuery" />
            </FxSearchbar>
          </div>
        </transition>

        <div class="fx-table--table" v-loading="loading" :style="tableStyle">
          <el-table
            ref="table"
            :data="tableData"
            height="100%"
            :size="cOptions.size"
            :border="cOptions.border"
            :row-key="cOptions.rowKey"
            :tree-props="cOptions.tree?cOptions.treeProps:{children:'',hasChildren:''}"
            :lazy="cOptions.treeProps.lazy"
            :load="cOptions.treeProps.load"
            :default-sort="defaultSort"
            :highlight-current-row="highlightCurrentRow"
            :show-summary="cOptions.showSummary"
            :summary-method="cOptions.summaryMethod"
            @sort-change="onSortChange"
            @row-click="onRowClick"
            @row-dblclick="onRowDblclick"
            @row-contextmenu="onRowContextmenu"
            @selection-change="onSelectionChange"
            @current-change="onCurrentChange"
          >
            <el-table-column
              width="50px"
              type="index"
              :label="cOptions.indexTitle"
              align="center"
              fixed
              v-if="cOptions.showIndex"
            ></el-table-column>
            <el-table-column
              type="selection"
              align="center"
              width="50px"
              fixed
              v-if="cOptions.selectable && cOptions.singleSelect==false"
            ></el-table-column>

            <slot>
              <FxTableColumn
                v-for="(c,index) in visibleColumns"
                :column="c"
                :key="(c.prop||'')+index"
                :render="slotsRender"
                :currentRow="currentRow"
              ></FxTableColumn>
            </slot>
          </el-table>
        </div>

        <div class="fx-table--pagination" v-if="cOptions.pagination" :style="paginationStyle">
          <FxPager
            v-model="pagerModel"
            :config.sync="pagerConfig"
            @current-change="onPagerCurrentChange"
            @size-change="onPagerSizeChange"
          />
        </div>
      </div>
    </div>

    <div class="fx-table--footer" v-if="cOptions.footer" :style="footerStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import FxTableColumn from "./components/FxTableColumn.vue";
import FxSearchbar from "./components/FxSearchbar.vue";
import FxPager from "./components/FxPager.vue";
import FxButton from "./components/FxButton.vue";
import FxAside from "./components/FxAside.vue";
import { DEFAULT_OPTIONS } from "./config";
import {
  getCalcPagerSizes,
  getCssNumber,
  firstToUpper,
  genColumns,
  decorateData,
  decorateRow,
  isNotEmpty,
} from "./utils";
import axios from "axios";
import merge from "merge";
import ActionRenderer from "./components/ActionRenderer.vue";
import ColumnToggle from "./components/ColumnToggle.vue";
import DefaultToolbar from "./components/DefaultToolbar";

export default {
  name: "FxTable",

  components: {
    FxTableColumn,
    FxPager,
    FxSearchbar,
    FxButton,
    FxAside,
    ActionRenderer,
    ColumnToggle,
    DefaultToolbar,
  },

  data() {
    const {
      pageNumber,
      pageSize,
      pagerLayout,
      pagerSizes,
      sort,
      order,
      aside,
      asideProps,
      asideRight,
      asideRightProps,
      asideBottom,
      asideBottomProps,
      asideTop,
      asideTopProps,
      fullScreen,
      presetRowStates,
    } = merge.recursive(
      true,
      {},
      DEFAULT_OPTIONS,
      Vue.__FxTable_defaultOptions,
      this.options
    );

    const tableData = this.decorateData(this.data, {
      ...Vue.__FxTable_presetRowStates,
      ...presetRowStates,
    });
    // const tableData = this.data;

    this.$emit("update:data", tableData);

    return {
      fullScreen: fullScreen,

      showAside: asideProps.show,

      showAsideRight: asideRightProps.show,

      showAsideBottom: asideBottomProps.show,

      showAsideTop: asideTopProps.show,

      searchbarMode: "normal",

      superSearch: false,

      tableData: tableData,

      vColumns: genColumns(this.columns),

      pagerModel: {
        pageIndex: pageNumber,
        pageSize: pageSize,
      },

      searchModel: this.query,

      sortModel: {
        order: order,
        sort: sort,
      },

      defaultSort: {
        prop: sort,
        order:
          order === "asc" ? "ascending" : order === "desc" ? "descending" : "",
      },

      pagerConfig: {
        layout: pagerLayout,
        total: 0,
        pageSize: pageSize,
        sizes: getCalcPagerSizes(pageSize, pagerSizes),
      },

      loading: false,

      selected: {
        rows: [],
        row: null,
      },

      //当前行
      currentRow: null,
    };
  },

  props: {
    columns: {},

    options: {},

    data: {
      type: Array,
      default: () => [],
    },

    query: {},

    actions: Array,
  },

  provide() {
    return {
      $fxTable: this,

      openSuperQuery: this.openSuperQuery,

      refreshTable: this.refreshTable,

      cOptions: this.cOptions,

      searchModel: this.searchModel,

      vColumns: this.vColumns,
    };
  },

  watch: {
    data: {
      handler(val) {
        this.tableData = val;
      },
      deep: true,
    },

    tableData: {
      handler(val) {
        this.$emit("update:data", val);
      },
      deep: true,
    },

    columns: {
      handler(val) {
        this.vColumns = genColumns(val);
      },
      deep: true,
    },

    query: {
      handler(val) {
        this.searchModel = val;
      },
      deep: true,
    },

    searchModel: {
      handler(val) {
        this.$emit("update:query", val);
      },
      deep: true,
    },

    //监听api变更
    "cOptions.api"(newApi) {
      this.refreshTable();
    },
  },

  computed: {
    table() {
      return this.$refs.table;
    },

    cActions() {
      return this.actions;
    },

    visibleColumns() {
      return this.vColumns.filter((c) => c.visible);
    },

    cPresetRowStates() {
      return {
        ...Vue.__FxTable_presetRowStates,
        ...this.cOptions.presetRowStates,
      };
    },

    selectedRows: {
      get() {
        const { selectable, singleSelect } = this.cOptions;
        if (selectable) {
          if (singleSelect) {
            return this.selected.row ? [this.selected.row] : [];
          } else {
            return this.selected.rows;
          }
        } else {
          return [];
        }
      },
      set(data) {
        const { selectable, singleSelect } = this.cOptions;
        if (selectable) {
          if (singleSelect) {
            this.selected.row = data;
          } else {
            this.selected.rows = data;
          }
        }
      },
    },

    selectedRow: {
      get() {
        const { selectable, singleSelect } = this.cOptions;
        if (selectable || singleSelect) {
          return this.selected.row;
        } else {
          return null;
        }
      },
      set(row) {
        const { selectable, singleSelect } = this.cOptions;
        if (selectable || singleSelect) {
          this.selected.row = data;
        }
      },
    },

    highlightCurrentRow() {
      const { selectable, singleSelect, highlightCurrentRow } = this.cOptions;

      // return (selectable && singleSelect) || highlightCurrentRow;
      return highlightCurrentRow;
    },

    cOptions: {
      get() {
        return merge.recursive(
          true,
          true,
          {},
          DEFAULT_OPTIONS,
          Vue.__FxTable_defaultOptions,
          this.options
        );
      },
    },

    classes() {
      const classes = [];

      if (this.showAside) {
        classes.push("is--show-aside");
      }

      if (this.fullScreen) {
        classes.push("is--full-screen");
      }

      if (this.cOptions.outBorder) {
        classes.push("is--out-border");
      }

      if (this.data.length >= 50) {
        classes.push("is--no-transition");
      }

      return classes;
    },

    style() {
      const { height, width, background } = this.cOptions;
      return {
        height: getCssNumber(height),
        width: getCssNumber(width),
        background,
      };
    },

    headerStyle() {
      const { headerProps } = this.cOptions;
      const { height, background } = headerProps;

      return {
        height: getCssNumber(height),
        background,
      };
    },

    bodyStyle() {
      const { header, headerProps, footer, footerProps } = this.cOptions;

      return {
        height: `calc(100% 
        ${header ? "- " + getCssNumber(headerProps.height) : ""} 
        ${footer ? "- " + getCssNumber(footerProps.height) : ""} 
        )`,
      };
    },

    asideStyle() {
      const { width, background, bottom, top } = this.cOptions.asideProps;
      return {
        width: this.showAside ? getCssNumber(width) : 0,
        background: background,
        top: getCssNumber(top),
        bottom: getCssNumber(bottom),
      };
    },

    asideRightStyle() {
      const { width, background, bottom, top } = this.cOptions.asideRightProps;
      return {
        width: this.showAsideRight ? getCssNumber(width) : 0,
        background: background,
        top: getCssNumber(top),
        bottom: getCssNumber(bottom),
      };
    },

    asideBottomStyle() {
      const { height, background } = this.cOptions.asideBottomProps;

      return {
        height: this.showAsideBottom ? getCssNumber(height) : 0,
        background: background,
        left: this.getAsideShowByPosition("left")
          ? getCssNumber(this.cOptions.asideProps.width)
          : 0,
        right: this.getAsideShowByPosition("right")
          ? getCssNumber(this.cOptions.asideRightProps.width)
          : 0,
      };
    },

    asideTopStyle() {
      const { height, background } = this.cOptions.asideTopProps;

      return {
        height: this.showAsideTop ? getCssNumber(height) : 0,
        background: background,
        left: this.getAsideShowByPosition("left")
          ? getCssNumber(this.cOptions.asideProps.width)
          : 0,
        right: this.getAsideShowByPosition("right")
          ? getCssNumber(this.cOptions.asideRightProps.width)
          : 0,
      };
    },

    mainStyle() {
      const {
        aside,
        asideProps,
        asideRight,
        asideRightProps,
        asideBottom,
        asideBottomProps,
        asideTop,
        asideTopProps,
      } = this.cOptions;
      return {
        left: aside && this.showAside ? getCssNumber(asideProps.width) : 0,
        right:
          asideRight && this.showAsideRight
            ? getCssNumber(asideRightProps.width)
            : 0,
        bottom:
          asideBottom && this.showAsideBottom
            ? getCssNumber(asideBottomProps.height)
            : 0,
        top:
          asideTop && this.showAsideTop
            ? getCssNumber(asideTopProps.height)
            : 0,
      };
    },

    toolbarStyle() {
      const { toolbarProps } = this.cOptions;
      const { height } = toolbarProps;

      return {
        height: getCssNumber(height),
      };
    },

    tableStyle() {
      const {
        toolbar,
        toolbarProps,
        pagination,
        paginationProps,
      } = this.cOptions;

      return {
        height: `calc(100% 
        ${toolbar ? "- " + getCssNumber(toolbarProps.height) : ""} 
        ${pagination ? "- " + getCssNumber(paginationProps.height) : ""}
        )`,
      };
    },

    paginationStyle() {
      const { paginationProps } = this.cOptions;
      const { height } = paginationProps;

      return {
        height: getCssNumber(height),
      };
    },

    footerStyle() {
      const { footerProps } = this.cOptions;
      const { height, background } = footerProps;

      return {
        height: getCssNumber(height),
        background,
      };
    },

    queryParams() {
      const model = {
        ...this.pagerModel,
        ...this.sortModel,
        ...this.searchModel,
      };

      return this.method.toLowerCase() === "get"
        ? {
            params: model,
          }
        : model;
    },

    method() {
      return this.cOptions.method;
    },

    api() {
      return this.cOptions.api;
    },

    rowKey() {
      return this.cOptions.rowKey;
    },
  },

  methods: {
    //切换全屏显示
    toggleFullScreen() {
      this.fullScreen = !this.fullScreen;
    },

    //根据位置获取边栏是否存在且处于打开状态
    getAsideShowByPosition(position) {
      position = firstToUpper(position);
      if (position === "Left") position = "";
      return this.cOptions["aside" + position] && this["showAside" + position];
    },

    //用户改变了搜索条件
    onInputChangedByUser() {
      this.refreshTable();
    },

    //用户点击高级搜索确认
    onSuperSearchConfirm() {
      this.superSearch = false;
      this.refreshTable();
    },

    //打开高级搜索面板
    openSuperQuery() {
      this.superSearch = true;
    },

    //搜索按钮点击
    onSearchBtnClick() {
      this.refreshTable();
    },

    //翻页组件页码变更
    onPagerCurrentChange() {
      this.refreshTable(false);
    },

    //翻页组件每页数量变更
    onPagerSizeChange(val) {
      this.refreshTable();
    },

    //排序变更
    onSortChange({ column, prop, order }) {
      if (order) {
        this.sortModel.sort = prop || "";
        this.sortModel.order = order.replace("ending", "");
      } else {
        this.sortModel.sort = "";
        this.sortModel.order = this.cOptions.order;
      }
      this.refreshTable();
    },

    //多选，选择项变更
    onSelectionChange(selection) {
      this.selectedRows = selection;
    },

    //当前项变更
    onCurrentChange(currentRow, oldCurrentRow) {
      this.selectedRows = currentRow;
      this.currentRow = currentRow;
    },

    //当某一行被点击时会触发该事件
    onRowClick(row, column, event) {
      const { selectable, singleSelect, clickToSelect } = this.cOptions;

      if (selectable && !singleSelect && clickToSelect) {
        this.toggleRowSelection(row);
      }

      this.$emit("row-click", ...arguments);
    },

    //当某一行被双击时会触发该事件
    onRowDblclick(row, column, event) {
      this.$emit("row-dblclick", ...arguments);
    },

    //当某一行被鼠标右键点击时会触发该事件
    onRowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", ...arguments);
    },

    //获取数据
    async getData() {
      if (!this.api) return;

      this.loading = true;

      try {
        const { data, status } = await axios[this.method.toLowerCase()](
          this.cOptions.api,
          this.queryParams
        );

        const res = this.cOptions.resHandler(data);

        if (this.cOptions.pagination) {
          const { rows, total } = res;
          this.tableData = this.decorateData(rows);
          this.pagerConfig.total = total;
        } else {
          this.tableData = this.decorateData(res);
        }
        this.loading = false;
      } catch (error) {
        if (process.env === "development") {
          console.warn(`[FxTable]组件getData方法错误：`, error);
        }
        this.loading = false;
      }
    },

    /**
     *刷新表格数据
     * @param {boolean} resetPageNumber 是否重置页码
     */
    refreshTable(resetPageNumber = true) {
      if (resetPageNumber) {
        this.pagerModel.pageIndex = this.cOptions.pageNumber;
        // this.pagerModel.pageSize = this.cOptions.pageSize;
        this.$nextTick((_) => {
          this.getData();
        });
      } else {
        this.getData();
      }
    },

    //获取选中项
    getSelected() {
      return this.selectedRows;
    },

    //用于多选表格，清空用户的选择
    clearSelection() {
      this.table.clearSelection();
    },

    //用于多选表格，切换某一行的选中状态
    toggleRowSelection(row, selected) {
      this.table.toggleRowSelection(row, selected);
    },

    //用于多选表格，切换所有行的选中状态
    toggleAllSelection() {
      this.table.toggleAllSelection();
    },

    //用于可展开表格与树形表格，切换某一行的展开状态
    toggleRowExpansion(row, expanded) {
      this.table.toggleRowExpansion(row, expanded);
    },

    //用于单选表格，设定某一行为选中行,如果调用时不加参数，则会取消目前高亮行的选中状态
    setCurrentRow(row) {
      this.table.setCurrentRow(row);
    },

    //清空过滤条件,也可传入由columnKey组成的数组以清除指定列的过滤条件
    clearFilter(columnKey) {
      this.table.clearFilter(columnKey);
    },

    //对 Table 进行重新布局
    doLayout() {
      this.table.doLayout();
    },

    /**
     * 切换aside显示
     * @param {string} position aside方向 (可选) 不填则切换所有aside的状态
     * @param {boolean} bl 显示或隐藏 (可选)
     */
    toggleAside(position, bl) {
      let positionArr = ["", "Right", "Top", "Bottom"];
      // 0 arguments
      if (arguments.length === 0) {
        positionArr.forEach((p) => {
          this["showAside" + p] = !this["showAside" + p];
        });
      }
      // 1 arguments
      else if (arguments.length === 1) {
        let [arg1] = arguments;

        arg1 = firstToUpper(arg1);
        arg1 = arg1 === "Left" ? "" : arg1;

        if (typeof arg1 === "string") {
          this["showAside" + arg1] = !this["showAside" + arg1];
        } else if (typeof arg1 === "boolean") {
          positionArr.forEach((p) => {
            this["showAside" + p] = arg1;
          });
        }
      }
      // >1 arguments
      else if (arguments.length > 1) {
        let [arg1, arg2] = arguments;
        arg1 = firstToUpper(arg1);
        arg1 = arg1 === "Left" ? "" : arg1;

        this["showAside" + arg1] = arg2;
      }
    },

    /**
     * 执行Action操作
     * @param {Action} action Action对象
     */
    runAction(action) {
      const { callback, thisArg } = action;

      //如果用户未定义thisArg,则默认在当前table上下文中调用action
      callback && callback.call(thisArg || this);
    },

    //插入行
    insertRow(row, index) {
      const _row = this.decorateRow(row);

      if (typeof index !== "number") {
        this.tableData.push(_row);
      } else {
        this.tableData.splice(index, 0, _row);
      }
    },

    /**
     *删除行
     */
    removeRow(row) {
      if (!row) return;

      this.removeRowByIndex(this.tableData.indexOf(row));
    },

    removeRowByKey(id) {
      const row = this.getRowByKey(id);

      this.removeRow(row);
    },

    removeRowByIndex(index) {
      if (index < 0) return;

      this.tableData.splice(index, 1);
    },

    /**
     * 通过唯一id获取行数据
     */
    getRowByKey(id) {
      return this.tableData.find((i) => i[this.rowKey] === id);
    },

    //fx-table-column的作用域插槽渲染函数
    slotsRender(h, render, context, options) {
      return render && render.call(this, h, context, options);
    },

    /**
     * 装饰数据行
     * @param {any} row
     */
    decorateRow(row, presetRowStates) {
      presetRowStates = presetRowStates || this.cPresetRowStates;

      return {
        ...row,
        $state: {
          ...presetRowStates,
        },
        children:
          row.children && row.children.length
            ? row.children.map((i) => this.decorateRow(i))
            : [],
      };
    },

    /**
     * 装饰表格数据
     * @param {array} rows 源数据
     */
    decorateData(rows, presetRowStates) {
      return rows.map((row) => {
        return this.decorateRow(row, presetRowStates);
      });
    },

    test(str) {
      alert(str);
    },
  },

  async mounted() {
    if (this.cOptions.api) {
      await this.getData();
    }
  },
};
</script>

<style lang="scss" src="./style.scss"></style>