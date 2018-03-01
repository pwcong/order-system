<template>
  <div class="manage-container">
    <el-row class="row row-condition">
      <el-col :span="4" :offset="20" style="text-align: right;">
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
                v-if="scope.row.status === 0"
                @click="handleSelectBusiness(scope.row)"
                icon="el-icon-view"
                size="mini">详情</el-button>
              <el-button
                v-if="scope.row.status === 0"
                @click="handleLockBusiness(scope.row)"
                icon="el-icon-minus"
                type="warning"
                size="mini">锁定</el-button>
              <el-button
                v-if="scope.row.status === 1"
                @click="handleUnLockBusiness(scope.row)"
                icon="el-icon-plus"
                type="primary"
                size="mini">解锁</el-button>
              <el-button
                v-if="[0, 1].indexOf(scope.row.status) >= 0"
                @click="handleRemoveBusiness(scope.row)"
                icon="el-icon-close"
                type="danger"
                size="mini">注销</el-button>
              <!-- <el-button
                @click="handleShowOrderContent(scope.row)"
                icon="el-icon-view"
                size="mini">详情</el-button>
              <el-button
                v-if="scope.row.statusValue === 0"
                @click="handleConfirmOrder(scope.row)"
                icon="el-icon-star-on"
                type="primary"
                size="mini">支付</el-button>
              <el-button
                v-if="[1].indexOf(scope.row.statusValue) >= 0"
                @click="handleFinishOrder(scope.row)"
                size="mini"
                icon="el-icon-check"
                type="success">完成</el-button>
              <el-button
                v-if="[0, 1, 3].indexOf(scope.row.statusValue) >= 0"
                @click="handleCancelOrder(scope.row)"
                size="mini"
                icon="el-icon-close"
                type="danger">取消</el-button> -->
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

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>

<script>
import { lockBusinesses, unlockBusinesses, removeBusinesses } from '@/api/manage';
// import { getInfo } from '@/api/user';

import config from '@/const/config';

const BUSINESS_STATUS = {
  '0': '正常',
  '1': '锁定'
};

export default {
  name: 'Manage-Businesses',
  data() {
    return {
      pageNo: 1,
      pageSize: 15,
      totalSize: 0,
      loading: false,

      dialogVisible: false,
      dialogImageUrl: ''
    };
  },
  methods: {
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
        ctx.$router.push({ path: '/manage/business_details' });
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
