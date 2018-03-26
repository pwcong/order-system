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
            <span>今日订单(个)</span>
          </div>
          <div>
            <ve-histogram :extend="todayOrderChart.extend" :data="todayOrderChart.data" :settings="todayOrderChart.setting"></ve-histogram>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12" class="main-card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日收支(元)</span>
          </div>
          <div>
            <ve-histogram :extend="todayBillChart.extend" :data="todayBillChart.data" :settings="todayBillChart.setting"></ve-histogram>
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
                backgroundImage: `url(${businessInfo.avatarUrl})`
              }"></span>
            </el-form-item>
            <el-form-item label="名称：">
              <span>{{businessInfo.nickname}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{businessInfo.address}}</span>
            </el-form-item>
            <el-form-item label="联系：">
              <span>{{businessInfo.contact}}</span>
            </el-form-item>
            <el-form-item label="简介：">
              <span>{{businessInfo.intro}}</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">

      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center;">
            <span>安全</span>
          </div>
          
          <el-button type="success" icon="el-icon-menu" @click="handleModifyPWD">修改密码</el-button>

        </el-card>

      </el-col>

    </el-row>

      <el-dialog
        title="修改密码"
        :visible.sync="modifyDialogVisible"
        width="40%">

      <el-form ref="modifyForm" label-width="80px" :rules="modifyRules" :model="modifyForm">
        <el-form-item label="新密码：" prop="pwd1">
          <el-input v-model="modifyForm.pwd1" type="password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pwd2">
          <el-input v-model="modifyForm.pwd2" type="password">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelModifyPWD">取 消</el-button>
        <el-button type="primary" @click="handleSubmitModifyPWD">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import bannerImg from '@/assets/images/banner.jpg';
import defaultAvatar from '@/assets/images/avatar.png';

import { modifyBusinessPWD } from '@/api/user';

import { queryBusinessBillStatistics, queryBusinessOrderStatistics } from '@/api/statistics';
import { getInfo } from '@/api/user';
import moment from 'moment';
import config from '@/const/config';

export default {
  name: 'Manage-Businesses-Details',
  data() {
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'));
        } else if (this.modifyForm.pwd1 !== '') {
          this.$refs.modifyForm.validateField('pwd2');
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.modifyForm.pwd1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      todayOrderChart: {
        data: {
          columns: ['日期', '进行中', '已完成', '已取消'],
          rows: []
        },
        setting: {
          metrics: ['进行中', '已完成', '已取消'],
          dimension: ['日期']
        },
        extend: {
          yAxis: {
            minInterval: 1
          }
        }
      },
      todayBillChart: {
        data: {
          columns: ['日期', '收款', '退款'],
          rows: []
        },
        setting: {
          metrics: ['收款', '退款'],
          dimension: ['日期']
        },
        extend: {}
      },
      businessInfo: {},
      banners: [],

      modifyForm: {},
      modifyDialogVisible: false,
      modifyRules: {
        pwd1: [{ required: true, validator: validatePass1, trigger: 'blur' }],
        pwd2: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  computed: {},
  methods: {
    handleCancelModifyPWD() {
      this.$refs.modifyForm.resetFields();
      this.modifyDialogVisible = false;
    },
    handleModifyPWD() {
      this.modifyDialogVisible = true;
      this.modifyForm = {
        pwd1: '',
        pwd2: ''
      };
    },
    handleSubmitModifyPWD() {
      const params = this.$route.params;

      const ctx = this;
      ctx.$refs.modifyForm.validate(valid => {
        if (valid) {
          modifyBusinessPWD(params.id, ctx.modifyForm.pwd1)
            .then(res => {
              ctx.$message({
                message: '修改成功!',
                type: 'success'
              });
              ctx.modifyDialogVisible = false;
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    initCharts(id) {
      const ctx = this;

      try {
        queryBusinessBillStatistics([id], 'today')
          .then(res => {
            const billStatistics = res.payload;

            ctx.todayBillChart.data.rows = [
              {
                日期: moment().format('YYYY-MM-DD'),
                收款: billStatistics.in,
                退款: billStatistics.out
              }
            ];
          })
          .catch(err => {});
        queryBusinessOrderStatistics([id], 'today')
          .then(res => {
            const orderStatistics = res.payload;
            ctx.todayOrderChart.data.rows = [
              {
                日期: moment().format('YYYY-MM-DD'),
                进行中: orderStatistics.ingCounts,
                已完成: orderStatistics.finishedCounts,
                已取消: orderStatistics.canceledCounts
              }
            ];
          })
          .catch(err => {});
      } catch (err) {}
    },
    loadBusinessInfo(id) {
      const ctx = this;
      getInfo(id)
        .then(res => {
          const info = res.payload;
          ctx.businessInfo = Object.assign({}, info, {
            avatarUrl: info.avatar ? config.BASE_API + info.avatar : defaultAvatar
          });

          const banners = (info.banner || '')
            .trim()
            .split(',')
            .filter(banner => !!banner)
            .map(banner => config.BASE_API + banner);
          ctx.banners = banners.length > 0 ? banners : [bannerImg];
        })
        .catch(err => {});
    }
  },

  async created() {
    const params = this.$route.params;
    this.initCharts(params.id);
    this.loadBusinessInfo(params.id);
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
