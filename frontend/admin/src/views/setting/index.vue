<template>
  <div class="setting-container">

    <el-row class="banner" :gutter="20">
      <el-col :sm="24" :md="userType === 2 ? 16 : 24" :lg="userType === 2 ? 16 : 24" style="margin-bottom: 20px;">
        <el-row v-if="userType === 2">
          <el-col :span="24">
            <el-card>
              <div slot="header" class="clearfix">
                <span>店铺横幅</span>
              </div>
              <el-carousel :interval="4000" height="256px">
                <el-carousel-item v-for="(banner, idx) in banners" :key="'banner-item-' + idx">
                  <div class="banner-item" :style="{
                    backgroundImage: `url(${banner})`
                  }">
                  </div>
                </el-carousel-item>
              </el-carousel>
            </el-card>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">

          <el-col :span="24">

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>用户信息</span>
              </div>
              <el-form class="form" :model="form" label-width="80px">
                <el-form-item label="头像：">
                  <span class="avatar" :style="{
                    backgroundImage: `url(${form.avatar})`
                  }"></span>
                </el-form-item>
                <el-form-item label="名称：">
                  <span>{{form.nickname}}</span>
                </el-form-item>
                <el-form-item label="地址：">
                  <span>{{form.address}}</span>
                </el-form-item>
                <el-form-item label="联系：">
                  <span>{{form.contact}}</span>
                </el-form-item>
                <el-form-item label="介绍：">
                  <span>{{form.intro}}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>

      </el-col>

      <el-col :sm="24" :md="8" :lg="8" v-if="userType === 2">

        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header" class="clearfix">
                <span>自定义二维码</span>
              </div>
              <div>
                <el-input v-model="customLabel" placeholder="请输入内容">
                  <el-button slot="append" type="success" @click="handleGenerateQRCode">生成</el-button>
                </el-input>
              </div>
            </el-card>            

          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="24">
            <el-card>
              <div slot="header" class="clearfix">
                <span>入口二维码</span>
                <a :href="qrcode_" target="_blank" download="qrcode.png">
                  <el-button type="text" style="float: right; padding: 3px 0">下载</el-button>
                </a>
              </div>
              <div class="qrcode" :style="{
                backgroundImage: `url(${qrcode})`
              }"></div>
            </el-card>

          </el-col>

        </el-row>

      </el-col>

    </el-row>

    <el-dialog :visible.sync="dialogVisible">
      <div id="customQRCode">
        <img :src="customQRCode" alt="">
        <div>{{customLabel}}</div>
      </div>
      <div id="customQRCodeTool">
        <el-button type="success" @click="handleDownloadCustomQRCode">下载</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import QRCode from 'qrcode';
import domtoimage from 'dom-to-image';

import config from '@/const/config.js';

import banner from '@/assets/images/banner.jpg';
import defaultAvatar from '@/assets/images/avatar.png';

import { base64Img2Blob } from '@/utils';

export default {
  name: 'Setting-Preview',

  data() {
    return {
      qrcode: '',
      qrcode_: '',
      dialogVisible: false,
      customQRCode: '',
      customQRCode_: '',
      customLabel: ''
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
    },
    form() {
      const userInfo = this.$store.getters.userInfo;
      return Object.assign({}, userInfo, {
        avatar: userInfo.avatar ? config.BASE_API + userInfo.avatar : defaultAvatar
      });
    },
    userType() {
      return this.$store.getters.type;
    }
  },
  methods: {
    handleDownloadCustomQRCode() {
      const ctx = this;
      domtoimage.toJpeg(document.getElementById('customQRCode')).then(function(dataUrl) {
        const link = document.createElement('a');
        link.download = ctx.customLabel + '.jpeg';
        link.href = dataUrl;
        link.click();
      });
    },
    handleGenerateQRCode() {
      const ctx = this;

      if (!ctx.customLabel) {
        ctx.$message({
          type: 'error',
          message: '请输入自定义内容'
        });
        return;
      }

      QRCode.toDataURL(ctx.$store.getters.id + ':' + ctx.customLabel, { scale: 16 })
        .then(url => {
          ctx.customQRCode = url;
          ctx.customQRCode_ = url.replace('image/png', 'image/octet-stream');
          ctx.dialogVisible = true;
        })
        .catch(err => {});
    }
  },
  mounted() {
    const ctx = this;

    QRCode.toDataURL(ctx.$store.getters.id + '', { scale: 16 })
      .then(url => {
        ctx.qrcode = url;
        ctx.qrcode_ = url.replace('image/png', 'image/octet-stream');
      })
      .catch(err => {});
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.setting-container {
  margin: 24px;

  #customQRCode {
    text-align: center;
    img {
      width: 256px;
      max-width: 100%;
    }
    div {
      position: relative;
      top: -32px;
      font-size: 16px;
      font-weight: bold;
      color: #47b248;
    }
  }

  #customQRCodeTool {
    border-top: 1px solid #e5e5e5;
    padding-top: 16px;
    text-align: center;
  }

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

  .form {
    .el-form-item {
      margin-bottom: 0px;
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

  .qrcode {
    width: 100%;
    padding-bottom: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
  }
}
</style>
