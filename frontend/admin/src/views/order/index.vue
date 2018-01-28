<template>
  <div class="order-container">
    <el-row class="row row-condition">
      <el-col :span="6">筛选条件：</el-col>
      <el-col :span="18">
        <el-select v-model="value">
          <el-option
            v-for="(item, idx) in statusOptions"
            :key="'status-option-' + idx"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row class="row row-main">
      <el-col :span="24">
        <el-table
          :data="ordersTableData"
          stripe
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

  </div>
</template>

<script>
const STATUS_OPTIONS = { 进行中: [0, 1, 3], 已完成: [2], 已取消: [4] };

export default {
  name: 'Order',
  data() {
    return {
      statusOptions: ['进行中', '已完成', '已取消'],
      value: '进行中',
      ordersTableData: []
    };
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
