<template>
  <div class="titleBar">
   <el-tabs class="titleBarItem" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="水印处理" name="1">
          <upload-img></upload-img>
        </el-tab-pane>
        <el-tab-pane label="五子棋" name="2">
          <five-chess></five-chess>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UploadImg from '../../modules/uploadImg/index.vue'
import FiveChess from '../../modules/fiveChess/index.vue'
export default {
    name: 'titleBar',
    components: {
      UploadImg,
      FiveChess
    },
    data(){
        return{
           activeName: '1'
        }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="scss" scoped>
.titleBar{
  width: 100%;
  .titleBarItem{
    padding: 0 1%;
  }
}
</style>