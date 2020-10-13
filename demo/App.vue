<template>
  <div :class="classes">
    <FxTable
      ref="table"
      :data.sync="data"
      :options="options"
      :columns="columns"
      :actions="actions"
      :query.sync="query"
      @row-click="rowClick"
      @row-dblclick="rowDblClick"
    >
      <template #aside>
        <el-button @click="options.api = '/api/CustomParts?optionType=list'"
          >自定义组件</el-button
        >
        <el-button @click="options.api = '/api/UserComponent?optionType=list'"
          >用户组件</el-button
        >

        <div
          v-for="i in data"
          :key="i.id"
          style="margin-bottom: 5px; padding: 0 10px"
        >
          <el-input v-model="i.name"></el-input>
        </div>

        <el-button @click="addRow">AddRow</el-button>
      </template>

      <template #query></template>

      <template #customActions>
        <el-button @click="changeApi">changeApi</el-button>
      </template>

      <template #superQuery>
        <el-form-item label="字段A" prop="type">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段A">
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A1"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </FxTable>
  </div>
</template>

<script>
import Vue from "vue";
import FxTable, { Action, FxTableColumn } from "../src";
import FxButton from "../src/components/FxButton.vue";

Vue.directive("dialogDrag", {
  //属性名称dialogDrag，前面加v- 使用
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el.querySelector(".el-dialog");
    //dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ";cursor:move;";
    dragDom.style.cssText += ";top:0px;";

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })();

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
      const dragDomheight = dragDom.offsetHeight; // 对话框高度

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, "left");
      let styT = sty(dragDom, "top");

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes("%")) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, "") / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, "") / 100);
      } else {
        styL = +styL.replace(/\px/g, "");
        styT = +styT.replace(/\px/g, "");
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
});

const save = (api, method, queryParams) => {
  return new Promise((y, n) => {
    setTimeout((_) => {
      y();
    }, 2000);
  });
};

const del = (api, method, queryParams) => {
  // const { data, status } = await axios[method.toLowerCase()](api, queryParams);

  return new Promise((y, n) => {
    setTimeout((_) => {
      y();
    }, 2000);
  });
};

Vue.use(FxTable, {
  //注册行状态
  presetRowStates: {
    pending: false,
  },

  //注册action
  presetActions: {
    add: {
      name: "新增",
      icon: "el-icon-plus",
      category: "button",
      callback() {
        this.$alert("打开新增界面");
      },
    },
    edit: {
      name: "编辑",
      icon: "el-icon-edit",
      category: "button",
      callback() {
        if (!this.selectedRows.length) {
          this.$alert("请选择一条数据");
          return;
        }
        this.$alert("打开编辑界面");
      },
    },
  },

  //注册renderer
  presetColumnRenderers: {
    InputRenderer(h, context) {
      const { row, value, column } = context;

      let isCurrent = this.currentRow === row;

      return (
        <div class="cell-inner">
          {isCurrent ? (
            <el-input
              size="small"
              disabled={row.$state.pending}
              v-model={row[column.prop]}
            >
              <i
                onClick={() => {
                  alert(value);
                }}
                style="cursor:pointer;"
                class="el-input__icon el-icon-more"
                slot="suffix"
              ></i>
            </el-input>
          ) : (
            <span>{value}</span>
          )}
        </div>
      );
    },

    InputNumberRenderer(h, context, options = {}) {
      const { column, row, value } = context;
      const { size } = options;

      let isCurrent = this.currentRow === row;

      return (
        <div>
          {isCurrent ? (
            <el-input-number
              disabled={row.$state.pending}
              size={size}
              v-model={row[column.prop]}
            ></el-input-number>
          ) : (
            <span>{value}</span>
          )}
        </div>
      );
    },

    SelectRenderer(h, context, options = {}) {
      const { column, row, value } = context;

      let { selections, labelProp } = options;

      let isCurrent = this.currentRow === row;

      selections = selections || [
        {
          label: "AAA",
          value: "aaa",
        },
        {
          label: "BBB",
          value: "bbb",
        },
        {
          label: "CCC",
          value: "ccc",
        },
      ];

      const selectedItem = selections.find((i) => i.value === value);

      return (
        <div>
          {isCurrent ? (
            <el-select v-model={row[column.prop]} disabled={row.$state.pending}>
              {selections.map((o) => (
                <el-option label={o.label} value={o.value}></el-option>
              ))}
            </el-select>
          ) : (
            <span>
              {selectedItem ? selectedItem.label : row[labelProp] || value}
            </span>
          )}
        </div>
      );
    },

    HandlerRenderer(h, context, options = {}) {
      const { api, method = "get", queryParams } = options;
      const { row } = context;

      return (
        <div>
          <el-button
            type="success"
            plain
            size="mini"
            on-click={async () => {
              row.$state.pending = true;
              row.$state.saving = true;
              await save(api, method, row);
              this.$message.info("保存成功！");
              row.$state.pending = false;
              row.$state.saving = false;
            }}
            disabled={row.$state.pending}
            loading={row.$state.saving}
            icon="el-icon-check"
          >
            保存
          </el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            on-click={async () => {
              row.$state.deleting = true;
              row.$state.pending = true;
              await del(api, method, row);
              this.$message.info("删除成功！");
              row.$state.pending = false;
              row.$state.deleting = false;
              this.removeRowByKey(row[this.rowKey]);
            }}
            disabled={row.$state.pending}
            loading={row.$state.deleting}
            icon="el-icon-delete"
          >
            删除
          </el-button>
        </div>
      );
    },
  },

  defaultOptions: {
    // toolbar: false,
  },
});

export default {
  components: {
    FxButton,
    FxTableColumn,
  },

  data() {
    return {
      name: true,
      code: true,
      type: true,

      dialog: {
        visible: false,
        fullscreen: false,
      },

      classes: [
        "box",
        // "container"
      ],

      data: [],

      query: {
        key: "",
      },

      data2: [],
      data3: [],

      options: {
        presetRowStates: {
          saving: false,
          deleting: false,
        },

        toolbarProps: {
          // layout: "query,searchBtn -> superQuery,fullScreen",
        },

        api:
          "/api/Examinee?optionType=list&AdvanceEntranceExamId=734b9360-96f8-4f12-bea8-32c9747b271b",

        // background: "#fff",

        // size: "small",

        // showIndex:false,

        // toolbar: true,

        // toolbarProps: {
        //   height:'100px'
        // },

        height: "100%",

        highlightCurrentRow: false,

        tree: false,

        // treeProps: {
        //   children: "a",
        //   hasChildren: "code"
        // },

        // rowKey: "age",

        columnsProps: {
          // showToggle: false
        },

        selectable: true,

        clickToSelect: true,

        // showSummary: true,

        // singleSelect: true,

        // showIndex: true,

        // width: '80vw',

        // height: "400px",

        // pagination: false,

        // resHandler(res){
        //   return res.data.rows;
        // },

        // method: "get",

        // sort: "name",

        // order: "asc",

        // pageSize: 2,

        // border: true,

        // tree: true,

        // resHandler(res) {
        //   res.data.rows.forEach(i => {
        //     i.sss = "HKUBNJU";
        //     i.age = 22;
        //   });

        //   return res.data;
        // },

        // footer: true,

        // header: true,
        // headerProps: {
        //   height:'10%',
        //   background: "#f3f3f3",
        //   classes: "demo-header"
        // },

        // aside: true,
        // asideProps: {
        //   show: false,
        //   showToggle: true
        // },

        // asideRight: true,
        // asideRightProps: {
        //   width: 10
        // },

        // asideBottom: true,

        // asideBottomProps: {
        //   height: 10
        // },

        // asideTop: true,
        // asideTopProps: {
        //   height: 10
        // },

        // toolbar: false
      },

      actions: [
        new Action({
          name: "操作",
          icon: "el-icon-apple",
          category: "dropdown",
          children: [new Action("add"), new Action("edit")],
        }),
      ],

      columns: [
        {
          prop: "xm",
          label: "姓名",
          width: 100,
        },
        {
          prop: "PicUrl",
          label: "照片",
          width: 100,
          align: "center",
          render: (h, context) => (
            <el-image
              style="width:70px;height:70px;"
              src={context.row.PicUrl}
            ></el-image>
          ),
        },
        {
          prop: "PhoneNumber",
          label: "手机号码",
          width: 120,
        },
        {
          prop: "byxxmc",
          label: "毕业学校",
        },
        {
          prop: "byzymc",
          label: "毕业专业",
        },
      ],
    };
  },

  // computed:{
  //   actions(){}
  // },

  mounted() {
    // let i = 1;
    // setInterval(_ => {
    //   this.data.push({
    //     name: "NEW" + i,
    //     age: 18
    //   });
    //   i++;
    // },500);
  },

  methods: {
    addDlg() {
      this.dlgs.push({
        visible: true,
        component: import("./cell-components/CellSelect"),
      });
    },
    getSelected() {
      // const selected = this.$refs.table.getSelected();
      console.log(this.$refs.table.selectedRows);
    },
    rowClick(row) {
      console.log("rowClick", arguments);
    },
    rowDblClick() {
      console.log("rowDblClick", arguments);
    },

    addRow() {
      this.$refs.table.insertRow(
        {
          id: ++count,
          name: "JJKI",
          age: 10,
          foodId: "milk",
          foodName: "牛奶",
          children: [
            {
              id: ++count,
              name: "CCC",
              age: 10,
              foodId: "milk",
              foodName: "牛奶",
            },
          ],
        },
        1
      );
    },

    changeApi() {
      this.options.api =
        "/api/Specialty?optionType=list&AdvanceEntranceExamId=734b9360-96f8-4f12-bea8-32c9747b271b";
    },
  },
};
var count = 1;
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.box {
  width: 1200px;
  // min-width: 600px;
  height: 600px;
  // border: 1px solid #eee;
  // border-radius: 4px;
  margin: 40px auto;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
}

.demo-header {
  text-align: center;
}

.cell-inner {
  display: inline-block;
}
</style>