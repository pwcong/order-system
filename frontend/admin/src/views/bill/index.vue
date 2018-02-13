<template>
  <div class="bill-container">

      <el-row class="row row-condition">
      <el-col :span="8" style="white-space: nowrap;">
        账单类型：
        <el-select v-model="selectedBillType" @change="handleBillTypeChange">
          <el-option
            v-for="(item, idx) in BILL_TYPE_OPTIONS"
            :key="'status-option-' + idx"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="12" style="text-align: right;">
         <el-button type="primary" round @click="loadBills()">刷新</el-button>
      </el-col>
    </el-row>

    <el-row class="row row-main" :style="{marginTop: '16px'}">
      <el-col :span="24">
        <el-table
          :data="billsTableData"
          stripe
          border
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            width="180"
            label="创建时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>

          </el-table-column>
          <el-table-column
            width="180"
            prop="name"
            label="账单概览">
          </el-table-column>

          <el-table-column
            prop="amount"
            label="账单金额">
          </el-table-column>

          <el-table-column
            prop="type"
            label="账单类型">
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


  </div>
</template>

<script>
import moment from 'moment';

const BILL_TYPE_OPTIONS = [
  { label: '全部', value: [] },
  { label: '收入', value: [0] },
  { label: '支出', value: [1] }
];

const BILL_TYPE = {
  '0': '收入',
  '1': '支出'
};

export default {
  name: 'Bill',
  data() {
    return {
      BILL_TYPE_OPTIONS,
      loading: false,
      selectedBillType: '全部',
      pageSize: 15,
      pageNo: 1,
      totalSize: 0
    };
  },
  methods: {
    handlePageSizeChange(val) {
      this.pageSize = val;
      this.loadBills();
    },
    handlePageNoChange(val) {
      this.pageNo = val;
      this.loadBills();
    },
    handleBillTypeChange(val) {
      this.selectedBillType = val;
      this.loadBills();
    },
    loadBills(billType, filter, pageSize, pageNo) {
      const ctx = this;

      ctx.loading = true;

      billType = billType || (ctx.selectedBillType instanceof Array ? ctx.selectedBillType : []);
      filter = filter || '';
      pageSize = pageSize || ctx.pageSize;
      pageNo = pageNo || ctx.pageNo;

      ctx.$store
        .dispatch('LoadBills', {
          billType,
          filter,
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
    billsTableData() {
      return this.$store.getters.bills.map((bill, idx) =>
        Object.assign(bill, {
          type: BILL_TYPE[bill.type],
          created_at: moment(bill.created_at).format('YYYY-MM-DD hh:mm:ss')
        })
      );
    }
  },
  mounted() {
    const ctx = this;
    ctx.loadBills();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bill-container {
  margin: 24px;

  .row-condition {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
  }
}
</style>
