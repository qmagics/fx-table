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
      <!-- <el-table-column v-if="name" label="NAME" prop="name">
        <el-table-column v-if="code" label="CODE" prop="code"></el-table-column>
        <el-table-column v-if="type" label="TYPE" prop="type"></el-table-column>
      </el-table-column>-->

      <!-- <FxTableColumn v-if="name" :column="{label:'NAME',prop:'name'}">
        <template v-slot="{value}">
          <el-link>{{value}}</el-link>
        </template>
      </FxTableColumn>
      <FxTableColumn v-if="code" :column="{label:'CODE',prop:'code'}"></FxTableColumn>
      <FxTableColumn v-if="type" :column="{label:'TYPE',prop:'type'}"></FxTableColumn>-->

      <template #aside>
        <el-button @click="options.api='/api/CustomParts?optionType=list'">自定义组件</el-button>
        <el-button @click="options.api='/api/UserComponent?optionType=list'">用户组件</el-button>

        <div v-for="i in data" :key="i.id" style="margin-bottom:5px;padding:0 10px">
          <el-input v-model="i.name"></el-input>
        </div>

        <el-button @click="addRow">AddRow</el-button>
        <!-- <p v-for="(i,index) in 6" :key="index">ASIDE</p> -->
      </template>

      <template #asideRight>
        <!-- <p v-for="(i,index) in 4" :key="index">ASIDE RIGHT</p> -->
      </template>

      <!-- <template #query>
          <el-form-item>
            <el-input v-model="query.key" @keyup.native.enter="$refs.table.refreshTable()"></el-input>
          </el-form-item>
      </template>-->

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
      </template>

      <!-- <template #action>
          <el-checkbox v-model="options.singleSelect">单选</el-checkbox>
          <FxButton icon="el-icon-plus" category="dropdown">
            操作
            <template slot="items">
              <FxButton icon="el-icon-plus" category="item" @click.native="getSelected">获取选中项</FxButton>
            </template>
          </FxButton>
      </template>-->
    </FxTable>
  </div>

  <!-- 

    <div class="box">
      <FxTable :data.sync="data3" :options="options" :columns="columns"></FxTable>
  </div>-->
</template>

<script>
// import FxTable from "../lib/fx-table.min.js";
// import "../lib/fx-table.min.css";
import Vue from "vue";
import FxTable, { Action, FxTableColumn } from "../src";
import FxButton from "../src/components/FxButton.vue";
// import axios from "axios";

const save = (api, method, queryParams) => {
  // const { data, status } = await axios[method.toLowerCase()](api, queryParams);

  return new Promise((y, n) => {
    setTimeout(_ => {
      y();
    }, 2000);
  });
};

const del = (api, method, queryParams) => {
  // const { data, status } = await axios[method.toLowerCase()](api, queryParams);

  return new Promise((y, n) => {
    setTimeout(_ => {
      y();
    }, 2000);
  });
};

Vue.use(FxTable, {
  //注册行状态
  presetRowStates: {
    pending: false
  },

  //注册action
  presetActions: {
    add: {
      name: "新增",
      icon: "el-icon-plus",
      category: "button",
      callback() {
        this.$alert("打开新增界面");
      }
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
      }
    }
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
          value: "aaa"
        },
        {
          label: "BBB",
          value: "bbb"
        },
        {
          label: "CCC",
          value: "ccc"
        }
      ];

      const selectedItem = selections.find(i => i.value === value);

      return (
        <div>
          {isCurrent ? (
            <el-select v-model={row[column.prop]} disabled={row.$state.pending}>
              {selections.map(o => (
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
    }
  }
});

export default {
  components: {
    FxButton,
    FxTableColumn
  },

  data() {
    return {
      name: true,
      code: true,
      type: true,

      classes: [
        "box"
        // "container"
      ],

      data: (function() {
        let arr = [];
        for (let i = 0; i < 1; i++) {
          arr = arr.concat([
            {
              id: "a" + i,
              name: "JAMES",
              age: 35,
              foodId: "milk",
              foodName: "牛奶",
              children: [
                {
                  id: "b" + i + "a",
                  name: "MAY_1",
                  age: 317,
                  foodId: "cake",
                  foodName: "蛋糕"
                },
                {
                  id: "b" + i + "b",
                  name: "MAY_2",
                  age: 59,
                  foodId: "cake",
                  foodName: "蛋糕"
                }
              ]
            },
            {
              id: "b" + i,
              name: "MAY",
              age: 17,
              foodId: "cake",
              foodName: "蛋糕"
            },
            {
              id: "c" + i,
              name: "LILEI",
              age: 23,
              foodId: "noodles",
              foodName: "面条"
            },
            {
              id: "d" + i,
              name: "TEA",
              age: 21,
              foodId: "tea",
              foodName: ""
            }
          ]);
        }
        return arr;
      })(),

      query: {
        key: ""
      },

      data2: [],
      data3: [],

      options: {
        presetRowStates: {
          saving: false,
          deleting: false
        },

        // api: "/api/UserComponent?optionType=list",

        // background: "#fff",

        // size: "small",

        // showIndex:false,

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

        singleSelect: true,

        // showIndex: true,

        // width: '80vw',

        // height: '80vh',

        // pagination: false,

        // resHandler(res){
        //   return res.data.rows;
        // },

        // method: "get",

        // sort: "name",

        // order: "asc",

        // pageSize: 2,

        // border: true,

        tree: true,

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

        aside: true,
        asideProps: {
          show: false,
          showToggle: true
        }

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
      },

      actions: [
        new Action({
          name: "操作",
          icon: "el-icon-apple",
          category: "dropdown",
          children: [new Action("add"), new Action("edit")]
        })
      ]
    };
  },

  computed: {
    columns() {
      return [
        {
          prop: "name",
          label: "NAME",
          sortable: true,
          render: "InputRenderer"
        },
        {
          prop: "age",
          label: "AGE",
          sortable: true,
          render: "InputNumberRenderer"
        },
        {
          prop: "foodId",
          label: "食物",
          component: () => import("./cell-components/CellSelect"),
          componentProps: {
            selections: [
              {
                label: "牛奶",
                value: "milk"
              },
              {
                label: "蛋糕",
                value: "cake"
              },
              {
                label: "冰淇凌",
                value: "icecream"
              }
            ],
            labelProp: "foodName"
          }

          // render: "SelectRenderer",
          // renderProps: {
          //   selections: [
          //     {
          //       label: "牛奶",
          //       value: "milk"
          //     },
          //     {
          //       label: "蛋糕",
          //       value: "cake"
          //     },
          //     {
          //       label: "冰淇凌",
          //       value: "icecream"
          //     }
          //   ],
          //   labelProp: "foodName"
          // }
        },
        {
          prop: "id",
          label: "操作",
          render: "HandlerRenderer",
          renderProps: {
            api: "/api/save",
            method: "put"
          }
        }
      ];
    }
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
        component: import("./cell-components/CellSelect")
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
              foodName: "牛奶"
            }
          ]
        },
        1
      );
    }
  }
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