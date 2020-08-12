<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="200px">
        <el-tree :data="tree" node-key="powerId" default-expand-all :default-checked-keys="checkedKey"
                 :props="defaultProps" ref="tree"
                 @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <el-table
          :data="list"
          style="width: 100%"
          @sort-change="sortChange"
          sortable="custom">
          <el-table-column
            label="id"
            prop="powerId"
            sortable
            width="120">
          </el-table-column>

          <el-table-column
            label="名称"
            sortable
            prop="powerName"
            width="180">
          </el-table-column>

          <el-table-column
            label="路由"
            prop="powerRoute"
            sortable
            width="180">
          </el-table-column>

          <el-table-column
            label="描述"
            sortable
            prop="description"
            width="180">
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            width="180">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                v-popover:popover5
                @click="delUser(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNum"
          :page-size="pageSize"
          @current-change="changePage">
        </el-pagination>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {powerList, powerTree} from "../../api/api.js";

  export default {
    data() {
      return {
        list: [],
        tree: [],
        checkedKey: [],
        curPage: 1,
        pageSize: 5,
        totalNum: 0,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        s_name: '',
        s_pid: '',
        order: '',
        order_way: '',
        editFrom: {
          account: '',
          username: '',
          mobile: '',
          id: 0
        },
        defaultProps: {
          children: 'children',
          label: 'powerName'
        }
      }
    },
    methods: {
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.editFrom.account = row.account
        this.editFrom.username = row.username
        this.editFrom.mobile = row.mobile
        this.editFrom.id = row.id
      },
      changePage(currentPage) {
        this.curPage = currentPage
        this.getList()
      },
      sortChange(data) {
        this.order_way = (data.order === "ascending") ? 'asc' : 'desc';
        this.order = data.prop;
        this.getList()
      },
      exportExcel() {
        this.is_export = 1
        this.getList()
        this.is_export = 0
      },
      getList() {
        let params = {
          page_size: this.pageSize,
          page: this.curPage,
          s_name: this.s_name,
          s_pid: this.s_pid,
          order: this.order,
          order_way: this.order_way,
        };
        powerList(params).then(res => {
          this.totalNum = this.toInt(res.data.total_num);
          this.list = res.data.list;
          if (this.totalNum > 0 && this.list.length == 0 && this.curPage != 1) {
            this.curPage = 1;
            this.getList();
          }
        })
      },
      delUser(index, row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id: row['id']}).then(res => {
            if (res.data.status == 0) {
              this.$toast('删除成功', {duration: 1000})
              this.getList()
            } else {
              this.$toast(res.data.msg, {duration: 1000})
            }
          })
        }).catch(() => {
        });
      },
      submit() {
        edituser(this.editFrom).then(res => {
          if (res.data.status == 0) {
            this.$toast('操作成功', {duration: 1000})
            this.dialogFormVisible = false
            this.getList()
          } else {
            this.$toast(res.data.msg, {duration: 1000})
          }
        })
      },
      handleNodeClick(data) {
        console.log(data);
        this.s_pid = data['powerId']
        this.getList()
      },
      getTree() {
        powerTree().then(res => {
          if (res.data.status == 0) {
            this.tree = res.data.tree
            this.$nextTick(function () {
              this.$refs.tree.setCurrentNode(this.tree[0]);
              this.s_pid = this.tree[0]['powerId']
              this.getList()
            })
          } else {
            this.$toast(res.data.msg, {duration: 1000})
          }
        })
      }
    },
    created() {
      this.getTree();
    }
  }
</script>
<style>
  @import url("../../static/css/common/table.css");
  @import url("../../static/css/common/dialog.css");

  .el-tree {
    background: #3c6c6d;
    color: #0ef154;
  }

  .el-aside {
    background: #3c6c6d;
  }

  .el-tree-node__content:hover {
    background-color: #5d8b9f;
  }

  .el-tree-node:focus > .el-tree-node__content {
    background-color: #5d8b9f;
  }

  /*.el-tree-node:focus {*/
  /*  background: red;*/
  /*}*/
</style>
