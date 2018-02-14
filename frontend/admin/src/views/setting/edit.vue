<template>
  <div class="setting-container">
    
    <el-row>
      <el-col :span="18" :offset="3">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="头像：">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="uploadHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="店名：">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="form.address" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="联系：">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
          <el-form-item label="介绍：">
            <el-input v-model="form.intro" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">

      <el-col :span="18" :offset="3">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: center;">
            <span>横幅</span>
          </div>
        
          <el-upload
            list-type="picture-card"
            :file-list="banners"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :on-success="handleBannerSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleBannerRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-card>

      </el-col>

    </el-row>

    <div class="tools">
      <div>
        <el-button type="primary" icon="el-icon-refresh" @click="reloadUserInfo">刷新</el-button>
      </div>
      <div>
        <el-button type="success" icon="el-icon-upload" @click="saveUserInfo" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      </div>
      <div>
        <el-button type="info" icon="el-icon-back" @click="redirectToPreview">取消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import config from '@/const/config';

import { modifyInfo } from '@/api/user';

import { getToken } from '@/utils/auth';

export default {
  name: 'Setting-Edit',
  data() {
    return {
      uploadUrl: config.BASE_API + '/attachment/upload',
      avatarUrl: '',
      banners: [],
      dialogVisible: false,
      dialogImageUrl: '',
      uploadHeaders: {
        'X-Token': getToken()
      },
      form: {},
      fullscreenLoading: false
    };
  },
  methods: {
    handleBannerSuccess(res, file) {
      if (!res.success) {
        this.$message({
          message: res.message,
          type: 'error'
        });
        return;
      }

      this.banners.push({
        url: config.BASE_API + res.payload.url,
        urlValue: res.payload.url
      });

      this.form.banner = this.banners.map(b => b.urlValue).join(',');
    },
    handleBannerRemove(file, fileList) {
      this.banners = fileList;
      this.form.banner = this.banners.map(b => b.urlValue).join(',');
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      if (!res.success) {
        this.$message({
          message: res.message,
          type: 'error'
        });
        return;
      }

      this.avatarUrl = config.BASE_API + res.payload.url;
      this.form.avatar = res.payload.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    reloadUserInfo() {
      const ctx = this;

      const userInfo = Object.assign({}, ctx.$store.getters.userInfo);

      ctx.avatarUrl = config.BASE_API + userInfo.avatar || '';
      ctx.banners = (userInfo.banner || '')
        .trim()
        .split(',')
        .filter(b => !!b)
        .map(b => ({
          url: config.BASE_API + b,
          urlValue: b
        }));
      ctx.form = userInfo;
    },
    saveUserInfo() {
      const ctx = this;

      ctx.fullscreenLoading = true;

      ctx.$store
        .dispatch('ModifyInfo', ctx.form)
        .then(res => {
          ctx.$message({
            type: 'success',
            message: '修改成功!'
          });
          ctx.fullscreenLoading = false;
        })
        .catch(err => {
          ctx.$message({
            type: 'error',
            message: err.message
          });
          ctx.fullscreenLoading = false;
        });
    },
    redirectToPreview() {
      this.$router.push({ path: '/setting/index' });
    }
  },
  computed: {},
  mounted() {
    const ctx = this;

    ctx.reloadUserInfo();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.setting-container {
  margin: 24px;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

  .tools {
    position: fixed;
    right: 16px;
    bottom: 32px;

    div {
      margin: 12px 0;
      text-align: center;
    }
  }
}
</style>
