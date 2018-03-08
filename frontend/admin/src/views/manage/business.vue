<template>
  <div class="manage-container">
    <el-row class="row row-condition">
      <el-col :span="24" style="text-align: right;">
        <el-button type="success" round icon="el-icon-plus" @click="handleAddBusiness">新建</el-button>
        <el-button type="primary" round @click="loadBusinesses()">刷新</el-button>
      </el-col>
    </el-row>

    <el-row class="row row-main" :style="{marginTop: '20px'}">
      <el-col :span="24">
        <el-table
          :data="businessesTableData"
          stripe
          border
          v-loading="loading"
          style="width: 100%">

          <el-table-column
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="店名">
          </el-table-column>
          <el-table-column
            prop="statusValue"
            label="状态">
          </el-table-column>
          <el-table-column
            fixed="right"
            width="280"
            label="操作">

            <template slot-scope="scope">

              <el-button
                @click="handleSelectBusiness(scope.row)"
                icon="el-icon-view"
                size="mini">详情</el-button>
              <el-button
                v-if="scope.row.status === 0"
                @click="handleLockBusiness(scope.row)"
                icon="el-icon-download"
                type="warning"
                size="mini">锁定</el-button>
              <el-button
                v-if="scope.row.status === 1"
                @click="handleUnLockBusiness(scope.row)"
                icon="el-icon-upload2"
                type="primary"
                size="mini">解锁</el-button>
              <el-button
                v-if="[0, 1].indexOf(scope.row.status) >= 0"
                @click="handleRemoveBusiness(scope.row)"
                icon="el-icon-close"
                type="danger"
                size="mini">注销</el-button>
            </template>

          </el-table-column>
        </el-table>

      </el-col>


    </el-row>

    <el-row style="margin-top: 16px;">
      <el-col>
        <div class="block" style="text-align: center;">
          <el-pagination
            @size-change="handlePageSizeChange"
            @current-change="handlePageNoChange"
            :current-page="pageNo"
            :page-sizes="[15, 30, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>        
      </el-col>
    </el-row>

    <el-dialog
      title="新增店家"
      :visible.sync="newDialogVisible"
      width="40%">

      <el-form ref="newForm" label-width="80px" :rules="newRules" :model="newForm">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="newForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password1">
          <el-input v-model="newForm.password1" type="password"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password2">
          <el-input v-model="newForm.password2" type="password">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAddBusiness">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddBusiness">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>

<script>
import { registerBusinesses, lockBusinesses, unlockBusinesses, removeBusinesses } from '@/api/manage';

import config from '@/const/config';

const BUSINESS_STATUS = {
  '0': '正常',
  '1': '锁定'
};

export default {
  name: 'Manage-Businesses',
  data() {
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'));
        } else if (this.newForm.password1 !== '') {
          this.$refs.newForm.validateField('password2');
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.newForm.password1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      pageNo: 1,
      pageSize: 15,
      totalSize: 0,
      loading: false,

      dialogVisible: false,
      dialogImageUrl: '',

      newForm: {},
      newDialogVisible: false,
      newRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password1: [{ required: true, validator: validatePass1, trigger: 'blur' }],
        password2: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleAddBusiness() {
      const ctx = this;
      ctx.newDialogVisible = true;
      ctx.newForm = {
        userId: {},
        username: '',
        password1: '',
        password2: ''
      };
    },
    handleSubmitAddBusiness() {
      const ctx = this;
      ctx.$refs.newForm.validate(valid => {
        if (valid) {
          registerBusinesses(ctx.newForm.username, ctx.newForm.password1, {})
            .then(res => {
              ctx.$message({
                message: '新增成功!',
                type: 'success'
              });
              ctx.newDialogVisible = false;
              ctx.pageNo = 1;
              ctx.loadBusinesses();
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    handleCancelAddBusiness() {
      this.$refs.newForm.resetFields();
      this.newDialogVisible = false;
    },
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    handlePageSizeChange(val) {
      this.pageSize = val;
      this.loadBusinesses();
    },
    handlePageNoChange(val) {
      this.pageNo = val;
      this.loadBusinesses();
    },
    handleSelectBusiness(row) {
      const ctx = this;
      ctx.$store.dispatch('SelectBusiness', row).then(() => {
        ctx.$router.push({ path: `/manage/business/${row.id}` });
      });
    },
    handleLockBusiness(row) {
      const ctx = this;

      lockBusinesses(row.id).then(res => {
        ctx.$message({
          type: 'success',
          message: '店家锁定成功!'
        });

        ctx.loadBusinesses();
      });
    },
    handleUnLockBusiness(row) {
      const ctx = this;

      unlockBusinesses(row.id).then(res => {
        ctx.$message({
          type: 'success',
          message: '店家解锁成功!'
        });

        ctx.loadBusinesses();
      });
    },
    handleRemoveBusiness(row) {
      const ctx = this;

      ctx
        .$confirm('是否确认注销该店家?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning'
        })
        .then(() => {
          removeBusinesses(row.id).then(res => {
            ctx.$message({
              type: 'success',
              message: '店家注销成功!'
            });

            ctx.loadBusinesses();
          });
        })
        .catch(() => {});
    },

    loadBusinesses() {
      const ctx = this;

      ctx.loading = true;

      const id = ctx.userId;
      const pageSize = ctx.pageSize;
      const pageNo = ctx.pageNo;

      ctx.$store
        .dispatch('LoadBusinesses', {
          id,
          pageSize,
          pageNo
        })
        .then(res => {
          ctx.totalSize = res.payload.totalSize || 0;
          ctx.loading = false;
        })
        .catch(err => {
          ctx.loading = false;
        });
    }
  },
  computed: {
    businessesTableData() {
      return this.$store.getters.businesses.map((business, idx) =>
        Object.assign({}, business, {
          statusValue: BUSINESS_STATUS[business.status],
          nickname: business.userInfo.nickname
        })
      );
    },
    userId() {
      return this.$store.getters.id;
    }
  },

  mounted() {
    const ctx = this;
    ctx.loadBusinesses();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.manage-container {
  margin: 24px;

  .row-condition {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
  }

  .table-expand {
    font-size: 0;

    img {
      width: 48px;
      height: 48px;
      cursor: pointer;
    }
  }

  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
