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
    >
      <template #aside>
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
import FxTable, { Action } from "../src";
import FxButton from "../src/components/FxButton.vue";

Vue.use(FxTable, {
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
  }
});

export default {
  components: {
    FxButton
  },

  data() {
    return {
      ddd: true,

      classes: [
        "box"
        // "container"
      ],

      data: [
        {
          name: "JAMES",
          age: 35
        },
        {
          name: "LILY",
          age: 17
        }
      ],

      query: {
        key: ""
      },

      data2: [],
      data3: [],

      options: {
        api: "/api/UserComponent?optionType=list",

        // background: "#fff",

        // size: "small",

        selectable: true,

        clickToSelect: true,

        // singleSelect: true,

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

        resHandler(res) {
          res.data.rows.forEach(i => {
            i.sss = "HKUBNJU";
            i.age = 22;
          });

          return res.data;
        }

        // footer: true,

        // header: true,
        // headerProps: {
        //   height:'10%',
        //   background: "#f3f3f3",
        //   classes: "demo-header"
        // },

        // aside: true,
        // asideProps: {
        //   width: 10,
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
      },

      columns: [
        {
          prop: "name",
          label: "NAME",
          sortable: true
        },
        {
          prop: "age",
          label: "AGE",
          sortable: true,
          formatter(val) {
            return val + 5;
          },
          render(h, context) {
            const { value, row } = context;

            function testClick() {
              alert("testClick");
            }

            return (
              // <a href={"http://baidu.com/s?wd=" + value} target="_blank">
              //   {"去百度搜索" + value}
              // </a>
              <el-button size="mini" onClick={testClick}>
                {value}
              </el-button>
            );
          }
        },
        {
          prop: "sss",
          label: "SSS"
        }
      ],

      actions: [
        new Action({
          name: "添加",
          icon: "el-icon-apple",
          category: "group",
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
  width: 600px;
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