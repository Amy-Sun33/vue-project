<template>
  <el-container style="height: 100vh">
    <el-header>

    </el-header>
    <el-container>
      <el-aside width="250px">
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

      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: 'Goods',
    data() {
      return {
        menusList: [],
        user: {}
      }
    },
    created() {
      // 获取菜单
      this.menusList = JSON.parse(this.$cookies.get('menus'));
      this.user = this.$cookies.get('user');

      // console.log('kk', this.menusList)
      // console.log('kk', this.$cookies.get('user'))
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        let curRoute = this.$route.path;
        if (curRoute != '/Home' + key) this.$router.push('/Home' + key)
      }
    }
  }
</script>

<style>

  .el-menu {
    text-align: left;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 250px;
    overflow-x: hidden;
  }
  .el-submenu__title, .el-menu-item-group__title {
    width: 250px;
  }
  .el-menu {
    border: none;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
