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
  import {
    doLogin
  } from '../../api/api.js'
  export default {
    name: 'Login',
    data() {
      return {
        account: this.$cookies.get('account'),
        pwd: this.$cookies.get('pwd'),
        is_rember: this.$cookies.get('is_rember'),
        loading: false
      }
    },
    methods: {
      submit() {
        this.loading = true
        let params = {
          account: this.account,
          pwd: this.pwd,
        }

        var res = {
          data: {
            status: 0,
            message: '登陆成功',
            user: {
              uid: 123,
              name: '张三',
              dept: '科研生产部'
            }
          }
        }

        if (res.data.status == 0) {

          this.$cookies.set('uid', res.data.user.uid);
          this.$cookies.set('name', res.data.user.name);
          this.$cookies.set('dept', res.data.user.dept);
          if (this.is_rember) {
            this.$cookies.set('account', this.account);
            this.$cookies.set('pwd', this.pwd);
            this.$cookies.set('is_rember', this.is_rember);
          }
          this.$router.push('/Goods')
        } else {
          this.$alert(res.data.message)
        }
        this.loading = false
        // doLogin(params).then(res => {

        // })
      }
    }
  }
</script>
<style>
  .container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    height: 0;
  }

  .title {
    height: 50px;
    position: absolute;
    top: 30px;
    padding-top: 18px;
    color: grey;
    border-radius: 20px;
    font-size: 35px;
    font-family: fantasy;
    width: 90%;
    left: 5%;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover
  }

  #form-div {
    width: 350px;
    height: 270px;
    background: #d0d1d4;
    position: absolute;
    right: 10%;
    top: 35%;
    padding-top: 18px;
    border: 1px solid #e9bebe;
    border-radius: 20px;
    opacity: 0.85;
  }

  #form-div>div {
    display: flex;
    margin: 20px 0;
    height: 35px;
    line-height: 35px;
  }

  #form-div input:focus {
    border: 2px solid #47d5a4;
    outline: none
  }

  #form-div .input {
    font-size: 16px;
    margin-left: 30px;
    width: 286px;
  }

  #form-div button {
    height: 42px;
    width: 40%;
    margin-left: 32%;
    border-radius: 24px;
    color: white;
    border: 1px solid #e7dfdf;
    background: #677988;
  }

  .remember-div {
    height: 12px !important;
    width: 286px;
    line-height: 19px !important;
    margin-left: 30px !important;
    font-size: 12px;
  }

  .remember-div+div {
    margin-top: 0px;
  }
</style>
