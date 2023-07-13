<!-- 首页页面 -->

<template>
    <!-- 内容区 -->
    <el-row>

        <!-- 左边的  -->
        <el-col :span="8" style="padding-right: 10px;">
            <!-- 名片 -->
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/user.jpg">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登陆时间:<span>2021-7-19</span></p>
                    <p>上次登陆地点:<span>武汉</span></p>
                </div>
            </el-card>
            <!-- /名片/ -->
            <!-- 左下数据表 -->
            <el-card style="margin-top:20px; height:460px;">
                <el-table :data="tableData" style="width: 100%">
                    <!--
                    <el-table-column prop="name" label="课程">
                    </el-table-column>
                    <el-table-column prop="totayBuy" label="今日购买">
                    </el-table-column>
                    <el-table-column prop="monthBuy" label="本月购买">
                    </el-table-column>
                    <el-table-column prop="totalBuy" label="总购买" >
                    </el-table-column> -->
                    <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" />
                    
                </el-table>
            </el-card>
            <!-- /左下数据表/ -->
        </el-col>
        <!-- /左边的/ -->

        <!-- 右边的 -->
        <el-col :span="16" style="padding-right: 10px;">
            <!-- 星星,包包 -->
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="preice">¥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <!-- /星星,包包/ -->
            <!-- 折现图 -->
            <el-card style="height:280px">
                <div ref="echarts1" style="height:280px;width:100%"></div>
            </el-card>
            <!-- /折现图/ -->
            <!-- 柱状图和饼状图盒子 -->
            <div class="graph">
                <!-- 柱状图 -->
                <el-card style="height:260px;width:48%;">
                    <div ref="echarts2" style="height:260px;width:100%"></div>
                </el-card>
                <!-- /柱状图/ -->
                <!-- 饼状图 -->
                <el-card style="height:260px;width:48%">
                    <div ref="echarts3" style="height:240px;"></div>
                </el-card>
                <!-- /饼状图/ -->
            </div>
            <!-- /柱状图和饼状图盒子/ -->
        </el-col>
        <!-- /右边的/ -->

    </el-row>
    <!-- /内容区/ -->
</template>
<script>
import { getData } from "../api"
import * as echarts from "echarts"
export default {
    data() {
        return {
            tableData: [


            ],
            tableLabel: {
                name: '品牌',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: '今日支付订单',
                    value: 1234,
                    icon: "success",
                    color: '#2ec7c9'
                },
                {
                    name: '今日收藏订单',
                    value: 210,
                    icon: "star-on",
                    color: '#ffb980'
                },
                {
                    name: '今日未支付订单',
                    value: 1234,
                    icon: "s-goods",
                    color: '#5ab1ef'
                },
                {
                    name: '本月支付订单',
                    value: 1234,
                    icon: "success",
                    color: '#2ec7c9'
                },
                {
                    name: '本月收藏订单',
                    value: 210,
                    icon: "star-on",
                    color: '#ffb980'
                },
                {
                    name: '本月未支付订单',
                    value: 1234,
                    icon: "s-goods",
                    color: '#5ab1ef'
                },
            ]




        }
    },
    mounted() {
        getData().then((data) => {
            const { tableData } = data.data.data
            console.log(data,"1")
            console.log(tableData,"2")
            this.tableData = tableData

            /* =====echarts创建曲线图的方法===== */
            //基于准备好的dom,初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            //指定图表的配置项和数据
            var echarts10ption = {}
            //处理数据axis
            const { orderData } = data.data.data
            const { userData, videoData } = data.data.data
            console.log(userData)
            console.log('userDat')
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = {
                data: xAxis
            }
            echarts10ption.xAxis = xAxisData
            echarts10ption.yAxis = {}
            echarts10ption.legend = xAxisData
            echarts10ption.series = []
            echarts10ption.tooltip= { trigger: "item", },
            xAxis.forEach(key => {
                echarts10ption.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'

                })
            })
            echarts1.setOption(echarts10ption)
            /* =====echarts创建曲线图的方法=====结束*/


            //柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            //指定图表的配置项和数据
            const echarts20ption = {
                legend: {
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                //提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category",
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333"
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            }
                        }
                    }
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(echarts20ption)

            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const echarts30ption = {
                tooltip: { trigger: "item", },
                
                series: [
                    {
                        data: videoData,
                    type:'pie'}
                ],
            }
             echarts3.setOption(echarts30ption)
        })

    }
}
</script>

<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {

        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }

}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
        margin-bottom: 20px;
        width: 32%;
        margin-left: 9.5px;
    }

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;

        .preice {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
}

.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>