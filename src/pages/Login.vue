<template>
    <el-button type="primary" @click="handleGoIndex">跳转页面</el-button>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {

    }
  },
  methods: {
    handleGoIndex () {
      this.$router.push({ path: '/Goods' })
    }
  }
}
</script>
