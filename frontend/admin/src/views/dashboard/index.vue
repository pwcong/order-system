<template>
  <div class="dashboard-container">
    <el-row class="banner">
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="256px">
          <el-carousel-item v-for="(banner, idx) in banners" :key="'banner-item-' + idx">
            <div class="banner-item" :style="{
              backgroundImage: `url(${banner})`
            }">
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row class="main" :gutter="20">
      <el-col :sm="24" :md="12" :lg="12" class="main-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日订单</span>
          </div>
          <div>
            <ve-pie :data="todayOrderChart.data" :settings="todayOrderChart.setting"></ve-pie>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12" class="main-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日收支</span>
          </div>
          <div>
            <ve-pie :data="todayBillChart.data" :settings="todayBillChart.setting"></ve-pie>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12" class="main-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>年度订单</span>
          </div>
          <div>
            <ve-histogram :data="yearOrderChart.data" :settings="yearOrderChart.setting"></ve-histogram>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12" class="main-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>年度收支</span>
          </div>
          <div>
            <ve-line :data="yearBillChart.data" :settings="yearBillChart.setting"></ve-line>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import banner1 from '@/assets/images/banner_1.jpg';
import banner2 from '@/assets/images/banner_2.jpg';
import banner3 from '@/assets/images/banner_3.jpg';

export default {
  name: 'Dashboard',
  data() {
    return {
      banners: [banner1, banner2, banner3],
      todayOrderChart: {
        data: {
          columns: ['type', 'counts'],
          rows: [
            { type: '进行中', counts: 50 },
            { type: '已完成', counts: 20 },
            { type: '已取消', counts: 10 }
          ]
        }
      },
      todayBillChart: {
        data: {
          columns: ['type', 'amount'],
          rows: [{ type: '收款', amount: 2000 }, { type: '退款', amount: 150 }]
        }
      },
      yearOrderChart: {
        data: {
          columns: ['月份', '已完成', '已取消', '全部'],
          rows: [
            { 月份: '一月', 已完成: 1500, 已取消: 500, 全部: 2000 },
            { 月份: '二月', 已完成: 1400, 已取消: 300, 全部: 1700 }
          ]
        },
        setting: {
          showLine: ['全部'],
          metrics: ['已完成', '已取消', '全部'],
          stack: { all: ['已完成', '已取消'] }
        }
      },
      yearBillChart: {
        data: {
          columns: ['月份', '收款', '退款'],
          rows: [
            { 月份: '一月', 收款: 15000, 退款: 500},
            { 月份: '二月', 收款: 14000, 退款: 300}
          ]
        },
        setting: {
          metrics: ['收款', '退款']
        }
      }
    };
  },
  computed: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;

    .banner {
      margin-bottom: 12px;

      .banner-item {
        width: 100%;
        height: 100%;
        background-color: #aaa;
        background-position: 50% 50%;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }

    .main {
      .main-card {
        margin-bottom: 8px;
      }
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
