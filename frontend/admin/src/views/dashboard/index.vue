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
    </el-row>
  </div>
</template>

<script>
import banner from '@/assets/images/banner.jpg';

import config from '@/const/config';

import { getTodayOrders } from '@/api/order';
import { getTodayBills } from '@/api/bill';

export default {
  name: 'Dashboard',
  data() {
    return {
      todayOrderChart: {
        data: {
          columns: ['type', 'counts'],
          rows: []
        }
      },
      todayBillChart: {
        data: {
          columns: ['type', 'amount'],
          rows: []
        }
      }
    };
  },
  computed: {
    banners() {
      const t = (this.$store.getters.userInfo.banner || '')
        .trim()
        .split(',')
        .filter(banner => !!banner)
        .map(banner => config.BASE_API + banner);
      return t.length > 0 ? t : [banner];
    }
  },
  methods: {
    async initCharts() {
      const ctx = this;

      try {
        const todayOrders = (await getTodayOrders([0, 1, 2, 3, 4])).payload.data;
        const todayBills = (await getTodayBills([0, 1])).payload.data;

        ctx.todayOrderChart.data.rows = [
          {
            type: '进行中',
            counts: todayOrders.filter((order, idx) => [0, 1, 3].indexOf(order.status) >= 0).length
          },
          {
            type: '已完成',
            counts: todayOrders.filter((order, idx) => order.status === 2).length
          },
          {
            type: '已取消',
            counts: todayOrders.filter((order, idx) => order.status === 4).length
          }
        ];

        const inBills = todayBills
          .filter((bill, idx) => bill.type === 0)
          .map((bill, idx) => parseFloat(bill.amount) || 0);

        const outBills = todayBills
          .filter((bill, idx) => bill.type === 1)
          .map((bill, idx) => parseFloat(bill.amount) || 0);

        ctx.todayBillChart.data.rows = [
          {
            type: '收款',
            amount: (inBills.length > 0 ? inBills.reduce((total, current) => total + current) : 0).toFixed(
              2
            )
          },
          {
            type: '退款',
            amount: (outBills.length > 0
              ? outBills.reduce((total, current) => total + current)
              : 0
            ).toFixed(2)
          }
        ];
      } catch (err) {}
    }
  },

  async created() {
    this.initCharts();
  }
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
        border: 1px solid #c5c5c5;
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
