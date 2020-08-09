<template>
  <div id="container">
    <img class="bg" :src="require('../../static/image/bg1-min.jpg')" alt="">
    <form @submit.prevent="submit">
      <div id='form-div'>
        <h2>请先登录</h2>
        <div>
          <el-input class="input" type="text" required="required" placeholder="请输入账号" v-model="account"></el-input>
        </div>
        <div>
          <el-input class="input" type="password" required="required" placeholder="请输入密码" v-model="pwd"></el-input>
        </div>

        <div class="verify-code">
          <div>
            <el-input class="input verify-code-input" type="text" required="required" placeholder="请输入验证码"
                      v-model="code"></el-input>
          </div>
          <div>
            <img title="点击刷新验证码" @click="changeVerifyCode" class="verify-code-img" :src="verifyCodeImg" alt="">
          </div>
        </div>
        <div class="remember-div">
          <el-checkbox class="checkbox" v-model="is_rember" :checked="is_rember" type="checkbox">记住密码</el-checkbox>
        </div>
        <div style="">
          <el-button type="primary" native-type="submit" :loading="loading">登&nbsp;录</el-button>
        </div>
      </div>
    </form>
    <div class="title">商品管理系统</div>
  </div>
</template>
<script>
  import {doLogin, getVerifyCode} from '../../api/api.js'

  let Base64 = require('js-base64').Base64;

  export default {
    name: 'Login',
    data() {
      return {
        account: this.$cookies.get('account'),
        pwd: this.$cookies.get('pwd'),
        is_rember: this.$cookies.get('is_rember'),
        loading: false,
        verifyCodeImg: this.getVerifyCodeImg(),
        code: ''
      }
    },
    methods: {
      submit() {
        this.loading = true
        let params = {
          account: this.account,
          pwd: this.pwd,
          code: this.code,
        }
        this.loading = false
        doLogin(params).then(res => {
          if (res.data.status == 0) {
            let user = res.data.user;
            let role = res.data.roles;
            this.$cookies.set('user', res.data.user);
            this.$cookies.set('roles', res.data.roles);
            this.$cookies.set('menus', res.data.powers);
            if (this.is_rember) {
              this.$cookies.set('account', this.account);
              this.$cookies.set('pwd', this.pwd);
              this.$cookies.set('is_rember', this.is_rember);
            }
            this.$router.push('/Goods')
          } else {
            this.$alert(res.data.msg)
          }
        })
      },
      changeVerifyCode: function () {
        this.getVerifyCodeImg()
      },
      getVerifyCodeImg: function () {
        getVerifyCode().then(res => {
          this.verifyCodeImg = 'data:image/png;base64,' + res.data;
        })
        //return this.getImg('http://www.swoft.com/getverifycode?' + Math.random())
      },
    }
  }
</script>
<style>
  @import url("../../static/css/admin/login.css");
</style>
