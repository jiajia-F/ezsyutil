<template>
    <div class="uploadImg">
        <div class="uploadBox">
            <div class="rightMessage">
                <el-row>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                    <div style="height:20px"></div>
                    <el-button type="primary">批量处理</el-button>
                </el-row>
            </div>
            <div class="blankCenter">
                <div class="blankLine">
                </div>
            </div>
            <div class="leftResult">
                <div v-for="item in resultList" :key="item.id">
                    <div>
                        图片
                    </div>
                </div>
            </div>
        </div>
        <div class="advertisement">
            <div class="advertisementBox">
              {{advertisementContent}}
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"uploadImg",
    data() {
        return {
            resultList:[{
                id:1,
                imgurl:''
            },{
                id:2,
                imgurl:''
            },{
                id:3,
                imgurl:''
            }],
            advertisementContent:'五岳归来不看山，黄山归来不看岳'
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
.uploadImg{
    height: 550px;
    width: 100%;
    .uploadBox{
        height: 80%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .rightMessage{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 90%;
            width: 45%;
        }
        .blankCenter{
            height: 100%;
            width: 5%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .blankLine{
                height: 90%;
                width: 3px;
                background-color: #555;
            }
        }
        .leftResult{
            height: 90%;
            width: 45%;
            display: flex;
            flex-direction: row;
        }
    }
    .advertisement{
        height: 20%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .advertisementBox{
            line-height: 50px;
            color: #303030;
        }
    }
}
</style>
