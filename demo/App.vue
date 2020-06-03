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

        <el-button :type="name?'primary':''" @click="name=!name">ddd</el-button>
        <el-button :type="code?'primary':''" @click="code=!code">code</el-button>
        <el-button :type="type?'primary':''" @click="type=!type">type</el-button>
        <!-- <p v-for="(i,index) in 6" :key="index">ASIDE</p> -->
        <pre>{{data}}</pre>
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

  <!-- <div class="box">
      <FxTable :data.sync="data2" :options="options" :columns="columns"></FxTable>
    </div>

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

Vue.use(FxTable, {
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
      return (
        <el-input
          size="small"
          disabled={this.currentRow !== context.row}
          v-model={context.row.name}
        ></el-input>
      );
    },
    InputNumberRenderer(h, context, options = {}) {
      const { column, row, value } = context;
      const { size } = options;
      return (
        <el-input-number
          size={size}
          disabled={this.currentRow !== row}
          v-model={row[column.prop]}
        ></el-input-number>
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

      data: [
        {
          id: 1,
          name: "JAMES",
          age: 35

          // children: [
          //   {
          //     id: 1.1,
          //     name: "LILY",
          //     age: 22
          //   },
          //   {
          //     id: 1.2,
          //     name: "LuCY",
          //     age: 23
          //   }
          // ]
        },
        {
          id: 2,
          name: "MAY",
          age: 17
        }
      ],

      query: {
        key: ""
      },

      data2: [],
      data3: [],

      options: {
        // api: "/api/UserComponent?optionType=list",

        // background: "#fff",

        // size: "small",

        // showIndex:false,

        tree: false,

        // treeProps: {
        //   children: "a",
        //   hasChildren: "code"
        // },

        rowKey: "id",

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

        // border: false,

        tree: true,

        resHandler(res) {
          res.data.rows.forEach(i => {
            i.sss = "HKUBNJU";
            i.age = 22;
          });

          return res.data;
        },

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

      columns: [
        {
          prop: "name",
          label: "下拉",
          type: "expand",
          render(h, context) {
            const { row } = context;
            return (
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{row.name}</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{row.age}</span>
                </el-form-item>
                <el-form-item label="说明">
                  <span>
                    所富含淀粉虽然和肉体和让她以后人体摄入热水让他会让他而瘫痪让她
                  </span>
                </el-form-item>
              </el-form>
            );
          }
        },
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
          prop: "sss",
          label: "SSS"
        }
      ],

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
    getSelected() {
      // const selected = this.$refs.table.getSelected();
      console.log(this.$refs.table.selectedRows);
    },
    rowClick(row) {
      // console.log(row.name)
    },
    rowDblClick() {
      console.log(arguments);
    }
  }
};
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
</style>