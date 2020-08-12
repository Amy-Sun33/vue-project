<template>
  <div>
    <div>
      <el-form class="s-form">
        <el-form-item class="s-input-item" label="账号">
          <el-input v-model="s_account"></el-input>
        </el-form-item>

        <el-form-item class="s-input-item" label="姓名">
          <el-input v-model="s_name"></el-input>
        </el-form-item>

        <el-form-item class="s-input-item" label="状态">
          <el-select v-model="s_status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.val"
              :label="item.text"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button @click="getList">搜索</el-button>
        <el-button type="primary" @click="addUser">添加账号</el-button>
        <el-button type="success" @click="exportExcel">导出excel</el-button>
      </el-form>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      @sort-change="sortChange"
      sortable="custom">
      <el-table-column
        label="id"
        prop="id"
        sortable
        width="120">
      </el-table-column>

      <el-table-column
        label="账号"
        sortable
        prop="account"
        width="180">
      </el-table-column>

      <el-table-column
        label="姓名"
        prop="username"
        sortable
        width="180">
      </el-table-column>

      <el-table-column
        label="手机号"
        sortable
        prop="mobile"
        width="180">
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status_str"
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
          <el-button
            v-if="scope.row.status == 2"
            size="mini"
            type="warning"
            @click="frozenUser(scope.$index, scope.row)">解封
          </el-button>

          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="warning"
            @click="frozenUser(scope.$index, scope.row)">冻结
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
    <el-dialog class="pub_dialog" width="40%" title="添加/编辑用户信息" :visible.sync="dialogFormVisible">
      <div>
        <el-form :model="editFrom">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="editFrom.account"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="editFrom.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="editFrom.mobile"></el-input>
          </el-form-item>
          <el-input style="display: none" type="hidden" v-model="editFrom.id"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import {userList, frozenuser, delUser, edituser} from "../../api/api.js";

  export default {
    data() {
      return {
        list: [],
        curPage: 1,
        pageSize: 5,
        totalNum: 0,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        s_name: '',
        s_account: '',
        s_status: '',
        order: '',
        order_way: '',
        is_export: '',
        editFrom: {
          account: '',
          username: '',
          mobile: '',
          id: 0
        },
        statusOptions: [
          {
            text: '全部',
            val: ''
          }, {
            text: '正常',
            val: 0
          }, {
            text: '冻结',
            val: 2
          },
        ]
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
      addUser() {
        this.dialogFormVisible = true;
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
          s_status: this.s_status,
          s_account: this.s_account,
          s_name: this.s_name,
          order: this.order,
          order_way: this.order_way,
          is_export: this.is_export
        };

        userList(params).then(res => {
          if (this.is_export === 1) {
            this.convertRes2Blob(res);
          } else {
            this.totalNum = this.toInt(res.data.total_num);
            this.list = res.data.list;
            if (this.totalNum > 0 && this.list.length == 0 && this.curPage != 1) {
              this.curPage = 1;
              this.getList();
            }
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
      frozenUser(index, row) {
        //冻结
        let status, status_str;
        if (row['status'] == 0) {
          status = 2;
          status_str = '已冻结';
        } else {
          status = 0;
          status_str = '正常';
        }
        frozenuser({id: row['id'], status: status}).then(res => {
          if (res.data.status == 0) {
            this.$toast('操作成功', {duration: 1000})
            this.list[index].status = status;
            this.list[index].status_str = status_str;
          } else {
            this.$toast(res.data.msg, {duration: 1000})
          }
        })
      },
    },
    created() {
      this.getList();
    }
  }
</script>
<style>
  @import url("../../static/css/common/table.css");
  @import url("../../static/css/common/dialog.css");

  .pub_dialog .el-input {
    width: 300px;
  }
</style>
