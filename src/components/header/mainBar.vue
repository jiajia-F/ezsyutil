<template>
  <div class="mainBar">
    <el-menu
    :default-active="activeIndex1"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">总揽</el-menu-item>
    <el-menu-item index="2">五子棋</el-menu-item></el-menu-item>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4"><a>订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
    name: 'mainBar',
    components: {
    
    },
    data(){
        return{
            activeIndex1: '1',
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>

</style>