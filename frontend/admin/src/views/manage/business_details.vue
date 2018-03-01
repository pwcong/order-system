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

    <el-row class="main" style="margin-top: 20px;" :gutter="20">
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

    <el-row style="margin-top: 20px;">

      <el-col :span="24">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户信息</span>
          </div>
          <el-form class="form" label-width="80px">
            <el-form-item label="头像：">
              <span class="avatar" :style="{
                backgroundImage: `url(${userInfo.avatarUrl})`
              }"></span>
            </el-form-item>
            <el-form-item label="名称：">
              <span>{{userInfo.nickname}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{userInfo.address}}</span>
            </el-form-item>
            <el-form-item label="联系：">
              <span>{{userInfo.contact}}</span>
            </el-form-item>
            <el-form-item label="简介：">
              <span>{{userInfo.intro}}</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import banner from '@/assets/images/banner.jpg';
import defaultAvatar from '@/assets/images/avatar.png';

import config from '@/const/config';

export default {
  name: 'Manage-Businesses-Details',
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
      try {
        const t = (this.$store.getters.selectedBusiness.userInfo.banner || '')
          .trim()
          .split(',')
          .filter(banner => !!banner)
          .map(banner => config.BASE_API + banner);
        return t.length > 0 ? t : [banner];
      } catch (err) {
        return [banner];
      }
    },
    userInfo() {
      try {
        const _userInfo = this.$store.getters.selectedBusiness.userInfo;
        return Object.assign({}, _userInfo, {
          avatarUrl: _userInfo.avatar ? config.BASE_API + _userInfo.avatar : defaultAvatar
        });
      } catch (err) {
        return {};
      }
    }
  },
  methods: {
    async initCharts() {
      const ctx = this;

      try {
        ctx.todayOrderChart.data.rows = [
          {
            type: '进行中',
            counts: 0
          },
          {
            type: '已完成',
            counts: 0
          },
          {
            type: '已取消',
            counts: 0
          }
        ];

        ctx.todayBillChart.data.rows = [
          {
            type: '收款',
            amount: 0
          },
          {
            type: '退款',
            amount: 0
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

    .avatar {
      display: inline-block;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
