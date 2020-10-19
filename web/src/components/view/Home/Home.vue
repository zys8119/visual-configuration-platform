<template>
  <div class="Home">
      <img alt="Vue logo" src="../../../assets/web_logo.png">
      <h1>欢迎使用前端可视化配置平台</h1>
      <p>
          <el-button round @click="$router.push('/home')">开始</el-button>
      </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Home{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    h1 {
        margin: 40px 0 0;
    }
    p{
        margin-top: 50px;
    }
}

</style>
