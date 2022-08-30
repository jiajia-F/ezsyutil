<template>
  <div id="app" ref="homePage" class="app">
    <el-container>
      <el-header>
        <main-bar></main-bar>
      </el-header>
      <el-main>
        <home></home>
      </el-main>
    </el-container>
    <foot-page class="footpage"></foot-page>
  </div>
</template>

<script>
import footPage from './components/footPage';
import Home from './views/Home';
import MainBar from './components/header/mainBar.vue'
export default {
  components: {
    footPage,
    Home,
    MainBar
  },
  mounted() {
     document.body.clientHeight
  },
  methods: {  
  },
 
}
</script>

<style lang="scss">
@import url(./App.scss);
.app{
  height: 100%;
  width: 100%;
}
body{
  margin:0;
  padding: 0;
  border:0;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  position: relative;
}
main{
  margin:0;
  padding: 0;
  border:0
}
header{
  margin:0;
  padding: 0;
  border:0
}
.app{
  height: 100%;
  width: 100%;
  .footpage{
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .el-container{
    height: 100%;
    width: 100%;
    position: relative;
    .el-header {
      border:0;
      padding: 0 !important;
      margin:0;
      background-color: #B3C0D1;
      height: 20%;
      color: #333;
      text-align: center;
      height: 20% !important;
    }

    .el-main {
      border:0;
      padding: 0 !important;
      margin:0;
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      height: 80%;
    }
  }
}

</style>>

