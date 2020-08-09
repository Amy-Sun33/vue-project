<template>
  <el-row>
    <el-col :span="12" style="height:100vh;background-color:#545c64">
    <el-menu
      v-for="item in menusList"
      :key="item.powerId"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu :index="item.powerId" v-if="item.children.length > 0">
          <template slot="title">
            <span>{{item.powerName}}</span>
          </template>
          <el-menu-item-group v-for="child in item.children" :key="child.powerId">
            <el-menu-item :index="child.powerRoute">{{child.powerName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.powerId" v-else>
          <!-- <i class="el-icon-setting"></i> -->
          <span slot="title">{{item.powerName}}</span>
        </el-menu-item>
    </el-menu>
    </el-col>
    <el-col :span="30">
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      menusList: []
    }
  },
  created() {
    // 获取菜单
    this.menusList = JSON.parse(this.$cookies.get('menus'))
    console.log('kk',this.menusList)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log('pp', key, '..', keyPath)
      this.$router.push(key)
    }
  }
}
</script>

<style>
  .el-col-12 {
    width: 30%;
  }

  .el-submenu .el-menu-item {
    padding: 0;
  }
</style>
