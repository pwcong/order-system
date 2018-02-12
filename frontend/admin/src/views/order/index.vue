<template>
  <div class="order-container">
    <el-row class="row row-condition">
      <el-col :span="4">订单类型：</el-col>
      <el-col :span="8">
        <el-select v-model="value" @change="handleOrderTypeChange">
          <el-option
            v-for="(item, idx) in STATUS_OPTIONS"
            :key="'status-option-' + idx"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="row row-main" :style="{marginTop: '16px'}">
      <el-col :span="24">
        <el-table
          :data="ordersTableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">

            <template slot-scope="scope">
              <el-button
                size="mini">支付</el-button>
              <el-button
                size="mini"
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
            :page-sizes="[30, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNo">
          </el-pagination>
        </div>        
      </el-col>
    </el-row>

  </div>
</template>

<script>
const STATUS_OPTIONS = [
  { label: '进行中', value: [0, 1, 3] },
  { label: '已完成', value: [2] },
  { label: '已取消', value: [4] }
];

export default {
  name: 'Order',
  data() {
    return {
      STATUS_OPTIONS,
      value: '进行中',
      ordersTableData: [],
      pageNo: 1,
      pageSize: 30,
      totalNo: 999
    };
  },
  methods: {
    handlePageSizeChange(val) {
      console.log(val);
    },
    handlePageNoChange(val) {
      console.log(val);
    },
    handleOrderTypeChange(val) {
      console.log(val);
    }
  },
  computed: {}
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
