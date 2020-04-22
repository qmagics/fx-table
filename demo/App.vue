<template>
  <div>
    <div :class="classes">
      <FxTable
        ref="table"
        :data.sync="data"
        :options="options"
        :columns="columns"
        :query.sync="query"
      >
        <template #aside>
          <!-- <el-row>
            <el-col :span="20" :offset="2">
              <br />
              <el-card>的观点</el-card>
            </el-col>
          </el-row>-->
          ASIDE
        </template>

        <template #query>
          <!-- <el-form-item>
          <el-select v-model="query.type" @change="$refs.table.refreshTable()">
            <el-option value="a" label="A"></el-option>
            <el-option value="b" label="B"></el-option>
          </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-input v-model="query.key" @keyup.native.enter="$refs.table.refreshTable()"></el-input>
          </el-form-item>
        </template>

        <template #superQuery>
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

        <!-- <template #action>
        <FxButton icon="el-icon-plus" category="dropdown">
          操作
          <template slot="items">
            <FxButton icon="el-icon-plus" category="item" @click="query.key='Item1'">新增</FxButton>
            <FxButton icon="el-icon-delete" category="item" @click="query.key='Item2'">删除</FxButton>
          </template>
        </FxButton>
        <FxButton icon="el-icon-upload" type="success" plain category="button" round>导出</FxButton>
        </template>-->
      </FxTable>
    </div>

    <!-- <div class="box">
      <FxTable :data.sync="data2" :options="options" :columns="columns"></FxTable>
    </div>

    <div class="box">
      <FxTable :data.sync="data3" :options="options" :columns="columns"></FxTable>
    </div>-->
  </div>
</template>

<script>
// import FxTable from "../lib/fx-table.min.js";
// import "../lib/fx-table.min.css";

import FxTable from "../src";
import FxButton from "../src/components/FxButton.vue";

export default {
  components: {
    FxTable,
    FxButton
  },

  data() {
    return {
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
        background:'#fff',

        size: "small",

        selectable: true,

        showIndex: true,

        // height: 'calc(100% - 20px)',

        api: "/api/UserComponent?optionType=list",

        // pagination: false,

        // resHandler(res){
        //   return res.data.rows;
        // },

        // method: "get",

        // sort: "name",

        // order: "asc",

        pageSize: 10,

        // border: false,

        resHandler(res) {
          res.data.rows.forEach(i => {
            i.sss = "HKUBNJU";
            i.age = 22;
          });

          return res.data;
        },

        // footer: true,
        // header: true,
        aside: true,

        // asideProps: {
        //   background: "#fcfcfc"
        // }
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
          sortable: true
        },
        {
          prop: "sss",
          label: "SSS"
        }
      ]
    };
  },

  mounted() {
    // let i = 1;
    // setInterval(_ => {
    //   this.data.push({
    //     name: "NEW" + i,
    //     age: 18
    //   });
    //   i++;
    // },500);
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
  width: 70%;
  height: 500px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 40px auto;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
}
</style>