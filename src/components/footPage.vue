<template>
    <div class="footPage">
        <div class="footPageItem">
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41102402000277" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img src="请将备案图标链接放置此处" style="float:center;"/>
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">陕ICP备 20210139793号</p></a>
        </div>
    </div>
</template>
<script>
export default {
    name:"footPage",
    data(){
        return{

        }
    },
    methods: {
        
    },
}
</script>
<style lang="scss" scoped>
.footPage{
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .footPageItem{
        height: 50px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
</style>