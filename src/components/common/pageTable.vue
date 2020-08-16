<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="(column, index) in propsData"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
        :min-width="widthValue(column.width)"
      >
      </el-table-column>
      <slot name="insertAfter"></slot>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="mCurrentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>


<script>
  export default {
    props: {
      tableData: {
        type: Array,
        default: []
      },
      propsData: {
        type: Array,
        default: []
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        mCurrentPage: 1,
        mPageSize: 10
      }
    },
    methods: {
      widthValue(width) {
        return width && width - 0 > 0 ? width : ''
      },
      /**
       * @description 每页的条数
       * @param {类型} val
      */
      handleSizeChange(val) {
        this.mPageSize = val
        this.mCurrentPage = 1
        this.$emit('sizeChange', val)
      },
      /**
       * @description 当前页数
       * @param {类型} val
      */
      handleCurrentChange(val) {
        this.mCurrentPage = val
        this.$emit('currentChange', val)
      },
      getPageInfo() {
        return {
          pageCurrent: this.mCurrentPage,
          pageSize: this.mPageSize
        }
      }
    }
  }
</script>

<style scope>
  .el-pagination {
    text-align: right;
  }
</style>
