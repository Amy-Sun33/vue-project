<template>
  <div id="container">
    <img class="bg" :src="require('../../static/image/bg1-min.jpg')" alt="">
    <form @submit.prevent="submit">
      <div id='form-div'>
        <h2>请先登录</h2>
        <div>
          <label for="">账号:</label>
          <input type="text" name="account" required="required" placeholder="请输入账号" v-model="account">
        </div>
        <div>
          <label for="">密码:</label>
          <input type="password" name="account" required="required" placeholder="请输入密码" v-model="pwd">
        </div>
        <div style="">
          <button type="submit">登&nbsp;录</button>
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
        account: '',
        pwd: ''
      }
    },
    methods: {
      handleGoIndex() {
        this.$router.push({
          path: '/Goods'
        })
      },
      keydown() {

      },
      submit() {
        let params = {
          account: this.account,
          pwd: this.pwd,
        }

        var res = {
          data: {
            status: 0,
            message: '登陆成功',
            user:{
              uid:123,
              name:'张三',
              dept:'科研生产部'
            }
          }
        }
        if (res.data.status == 0) {
          this.$store.commit('user_info', res.data.user)

          console.log(this.$store.user_info)
          this.$router.push('/Goods')
        } else {
          this.$alert(res.data.message)
        }
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
    top: 40%;
    padding-top: 18px;
    border: 1px solid #e9bebe;
    border-radius: 20px;
    opacity: 0.9;
  }

  #form-div>div {
    display: flex;
    margin: 20px 0;
    height: 35px;
    line-height: 35px;
  }

  #form-div label {
    width: 90px;
    font-size: 18px;
  }

  #form-div input:focus {
    border: 2px solid #47d5a4;
    outline: none
  }

  #form-div input {
    border: 1px solid #8fbfc9;
    border-radius: 6px;
    font-size: 16px;
  }

  #form-div input[value^=''] {
    border: 1px solid red;
    border-radius: 6px;
    font-size: 16px;
  }

  #form-div button:focus {
    outline: none;
  }

  #form-div button:hover {
    border-color: #47D5A4;
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
</style>
