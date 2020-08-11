<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        label="id"
        prop="id"
        width="120">
      </el-table-column>

      <el-table-column
        label="账号"
        prop="account"
        width="180">
      </el-table-column>

      <el-table-column
        label="姓名"
        prop="username"
        width="180">
      </el-table-column>

      <el-table-column
        label="手机号"
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

    <el-popover
      ref="popover4"
      placement="right"
      width="400"
      trigger="click">
      <el-form>
        <el-form-item label="账号">
          <el-input v-model="editFrom.account"></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="editFrom.username"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="editFrom.mobile"></el-input>
        </el-form-item>

        <el-input type="hidden" v-model="editFrom.uid"></el-input>

        <el-form-item>
          <el-button type="primary" @click="editSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-popover>

  </div>
</template>

<script>
  import {userList, frozenuser, delUser} from "../../api/api.js";

  export default {
    data() {
      return {
        list: [],
        curPage: 1,
        pageSize: 5,
        totalNum: 0,
        dialogVisible: false,
        editFrom: {
          account: '',
          username: '',
          mobile: '',
          uid: 0
        }
      }
    },
    methods: {
      handleEdit(index, row) {

      },
      changePage(currentPage) {
        this.curPage = currentPage
        this.getList()
      },
      getList() {
        let params = {
          page_size: this.pageSize,
          page: this.curPage,
        };
        userList(params).then(res => {
          this.totalNum = this.toInt(res.data.total_num);
          this.list = res.data.list;
        })
      },
      delUser(index, row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({uid: row['id']}).then(res => {
            if (res.data.status == 0) {
              this.$toast('删除成功', {duration: 1000})
              this.getList()
            } else {
              this.$toast('删除失败', {duration: 1000})
            }
          })
        }).catch(() => {
        });
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
        frozenuser({uid: row['id'], status: status}).then(res => {
          if (res.data.status == 0) {
            this.$toast('操作成功', {duration: 1000})
            this.list[index].status = status;
            this.list[index].status_str = status_str;
          } else {
            this.$toast('操作失败', {duration: 1000})
          }
        })
      },
      editSubmit() {

      }
    },
    created() {
      this.getList();
    }
  }
</script>
<style>
  @import url("../../static/css/common/table.css");
</style>
