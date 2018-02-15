<template>
  <div class="order-container">
    <el-row class="row row-condition">
      <el-col :span="8" style="white-space: nowrap;">
        订单类型：
        <el-radio-group v-model="selectedOrderStatus" @change="handleOrderStausChange">
          <el-radio-button 
            v-for="(label, idx) in ORDER_STATUS_OPTIONS" 
            :label="label"
            :key="'order-staus-' + idx">
          </el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4" :offset="12" style="text-align: right;">
         <el-button type="primary" round @click="loadOrders()">刷新</el-button>
      </el-col>
    </el-row>

    <el-row class="row row-main" :style="{marginTop: '16px'}">
      <el-col :span="24">
        <el-table
          :data="ordersTableData"
          stripe
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            width="180"
            label="下单时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>

          </el-table-column>
          <el-table-column
            width="180"
            prop="name"
            label="订单概览">
          </el-table-column>
          <el-table-column
            prop="address"
            label="配送地址">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态">
          </el-table-column>
          <el-table-column
            fixed="right"
            width="280"
            label="操作">

            <template slot-scope="scope">
              <el-button
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
                type="danger">取消</el-button>
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
      title="订单详情"
      :visible.sync="orderContentVisiable"
      width="50%">
      
      <el-form label-width="120px">
        <el-form-item label="订单编号：" style="margin-bottom: 0;">
          <span>{{orderContent.id}}</span>
        </el-form-item>
        <el-form-item label="下单时间：" style="margin-bottom: 0;">
          <span>{{orderContent.created_at}}</span>
        </el-form-item>
        <el-form-item label="订单用户：" style="margin-bottom: 0;">
          <span>{{orderContent.nickname}}</span>
        </el-form-item>
        <el-form-item label="配送地址：" style="margin-bottom: 0;">
          <span>{{orderContent.address}}</span>
        </el-form-item>
        <el-form-item label="订单金额：">
          <span>{{orderContent.amount}}</span>
        </el-form-item>
        <el-table
          :data="orderContent.details"
          style="width: 100%"
          max-height="450">
          <el-table-column
            fixed
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="菜名">
          </el-table-column>
          <el-table-column
            fixed
            prop="counts"
            label="数目">
          </el-table-column>
        </el-table>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orderContentVisiable = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { confirmOrder, closeOrder, finishOrder } from '@/api/order';
import { getInfo } from '@/api/user';

import moment from 'moment';

const ORDER_STATUS_OPTIONS_VALUE = {
  全部: [],
  进行中: [0, 1, 3],
  已确认: [1],
  已完成: [2],
  已取消: [4]
};

const ORDER_STATUS_OPTIONS = ['全部', '进行中', '已确认', '已完成', '已取消'];

const ORDER_STATUS = {
  '0': '发起',
  '1': '已支付',
  '2': '已完成',
  '3': '取消中',
  '4': '已取消'
};

export default {
  name: 'Order',
  data() {
    return {
      ORDER_STATUS_OPTIONS,
      selectedOrderStatus: '全部',
      pageNo: 1,
      pageSize: 15,
      totalSize: 0,
      loading: false,
      orderContentVisiable: false,
      orderContent: {
        id: '',
        created_at: '',
        address: '',
        amount: '',
        nickname: '',
        details: [
          // {name: '', counts: 0}
        ]
      }
    };
  },
  methods: {
    handlePageSizeChange(val) {
      this.pageSize = val;
      this.loadOrders();
    },
    handlePageNoChange(val) {
      this.pageNo = val;
      this.loadOrders();
    },
    handleOrderStausChange(val) {
      this.loadOrders();
    },

    handleConfirmOrder(row) {
      const ctx = this;

      ctx
        .$confirm('是否确认该订单已支付?', '提示', {
          confirmButtonText: '已支付',
          cancelButtonText: '返回',
          type: 'warning'
        })
        .then(() => {
          confirmOrder(row.id).then(res => {
            ctx.$message({
              type: 'success',
              message: '订单已确认!'
            });

            ctx.loadOrders();
          });
        })
        .catch(() => {});
    },
    handleCancelOrder(row) {
      const ctx = this;

      ctx
        .$confirm('是否确认取消该订单?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning'
        })
        .then(() => {
          closeOrder(row.id).then(res => {
            ctx.$message({
              type: 'success',
              message: '订单已取消!'
            });

            ctx.loadOrders();
          });
        })
        .catch(() => {});
    },
    handleShowOrderContent(row) {
      const ctx = this;

      getInfo(row.sender_id)
        .then(res => {
          ctx.orderContent = {
            id: row.id,
            created_at: moment(row.created_at).format('YYYY-MM-DD hh:mm:ss'),
            address: row.address,
            amount: row.amount,
            nickname: res.payload.nickname,
            details: row.nameValue.split('&').map(recipe => {
              const t = recipe.split('#');
              return {
                id: t[0],
                name: t[1],
                counts: t[2]
              };
            })
          };
          ctx.orderContentVisiable = true;
        })
        .catch(err => {});
    },
    handleFinishOrder(row) {
      const ctx = this;

      ctx
        .$confirm('是否确认完成该订单?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning'
        })
        .then(() => {
          finishOrder(row.id).then(res => {
            ctx.$message({
              type: 'success',
              message: '订单已完成!'
            });

            ctx.loadOrders();
          });
        })
        .catch(() => {});
    },
    loadOrders() {
      const ctx = this;

      ctx.loading = true;

      const orderStatus = ORDER_STATUS_OPTIONS_VALUE[ctx.selectedOrderStatus] || [];
      const pageSize = ctx.pageSize;
      const pageNo = ctx.pageNo;
      const filter = '';

      ctx.$store
        .dispatch('LoadOrders', {
          orderStatus,
          pageSize,
          pageNo,
          filter
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
    ordersTableData() {
      return this.$store.getters.orders.map((order, idx) =>
        Object.assign({}, order, {
          status: ORDER_STATUS[order.status],
          statusValue: order.status,
          name: order.name
            .split('&')
            .map(_name => {
              const t = _name.split('#');
              return t[1] + '*' + t[2];
            })
            .join(' & '),
          nameValue: order.name,
          created_at: moment(order.created_at).format('YYYY-MM-DD hh:mm:ss'),
          amount: '￥' + order.amount
        })
      );
    }
  },

  mounted() {
    const ctx = this;
    ctx.loadOrders();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.order-container {
  margin: 24px;

  .row-condition {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
  }
}
</style>
