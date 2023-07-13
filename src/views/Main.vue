<template>
    <div>
        <el-container>
            <el-aside width="auto"><common-aside/></el-aside>
            
            <el-container>
                <el-header><common-header/></el-header><common-tag></common-tag>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";
export default {
    data() {
        return {}
    },
    components: {
        CommonTag,
        CommonAside,
        CommonHeader
    }
}
</script>
<style scoped >
.el-header{
    margin: 0;
    padding: 0;
}
</style>