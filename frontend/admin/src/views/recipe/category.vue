<template>
  <div class="recipe-category-container">
    
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-button type="success" icon="el-icon-plus" @click="handleAddRecipeCategory">新建</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="loadRecipeCategories()">刷新</el-button>
      </el-col>
    </el-row>

    <el-row class="row row-main" :style="{marginTop: '16px'}">
      <el-col :span="24">
        <el-table
          :data="recipeCategoriesTableData"
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
            prop="id"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="分类名">
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>

          <el-table-column
            fixed="right"
            width="280"
            label="操作">

            <template slot-scope="scope">

              <el-button
                v-if="[0, 1].indexOf(scope.row.statusValue) >= 0"
                @click="handleModifyRecipeCategory(scope.row)"
                icon="el-icon-edit"
                type="primary"
                size="mini">修改</el-button>
              <el-button
                v-if="[1].indexOf(scope.row.statusValue) >= 0"
                @click="handleUpRecipeCategory(scope.row)"
                size="mini"
                icon="el-icon-goods"
                type="success">上架</el-button>
              <el-button
                v-if="[0].indexOf(scope.row.statusValue) >= 0"
                @click="handleDownRecipeCategory(scope.row)"
                size="mini"
                icon="el-icon-sold-out"
                type="info">下架</el-button>
              <el-button
                v-if="[0, 1].indexOf(scope.row.statusValue) >= 0"
                @click="handleRemoveRecipeCategory(scope.row)"
                size="mini"
                icon="el-icon-delete"
                type="danger">删除</el-button>
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
      title="修改菜单分类"
      :visible.sync="modifyDialogVisible"
      width="40%">

      <el-form label-width="60px">
        <el-form-item label="分类名">
          <el-input v-model="modifyName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitModifyRecipeCategory">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增菜单分类"
      :visible.sync="newDialogVisible"
      width="40%">

      <el-form label-width="60px">
        <el-form-item label="分类名">
          <el-input v-model="newName"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddRecipeCategory">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import moment from 'moment';

import {
  upRecipeCategory,
  downRecipeCategory,
  removeRecipeCategory,
  modifyRecipeCategory,
  createRecipeCategory
} from '@/api/recipe_category';

const RECIPECATEGORY_STATUS = {
  '0': '正常',
  '1': '下架'
};

export default {
  name: 'RecipeCategory',
  data() {
    return {
      loading: false,
      pageSize: 15,
      pageNo: 1,
      totalSize: 0,
      modifyDialogVisible: false,
      modifyName: '',
      selectedRecipeCategoryId: '',
      newDialogVisible: false,
      newName: ''
    };
  },
  methods: {
    handleAddRecipeCategory() {
      this.newName = '';
      this.newDialogVisible = true;
    },
    handleSubmitAddRecipeCategory() {
      const ctx = this;

      if (!ctx.newName) {
        ctx.$message({
          message: '请输入新的分类名!',
          type: 'error'
        });
        return;
      }

      createRecipeCategory(ctx.newName)
        .then(res => {
          ctx.$message({
            message: '新增成功!',
            type: 'success'
          });
          ctx.newDialogVisible = false;
          ctx.loadRecipeCategories();
        })
        .catch(err => {
          ctx.$message({
            message: err.message,
            type: 'error'
          });
          ctx.newDialogVisible = false;
        });
    },
    handleModifyRecipeCategory(row) {
      this.selectedRecipeCategoryId = row.id;
      this.modifyName = row.name;
      this.modifyDialogVisible = true;
    },
    handleSubmitModifyRecipeCategory() {
      const ctx = this;

      if (!ctx.modifyName) {
        ctx.$message({
          message: '请输入新的分类名!',
          type: 'error'
        });
        return;
      }

      modifyRecipeCategory(ctx.selectedRecipeCategoryId, ctx.modifyName)
        .then(res => {
          ctx.$message({
            message: '修改成功!',
            type: 'success'
          });
          ctx.modifyDialogVisible = false;
          ctx.loadRecipeCategories();
        })
        .catch(err => {
          ctx.$message({
            message: err.message,
            type: 'error'
          });
          ctx.modifyDialogVisible = false;
        });
    },
    handleUpRecipeCategory(row) {
      const ctx = this;
      upRecipeCategory(row.id)
        .then(res => {
          ctx.$message({
            message: '上架成功!',
            type: 'success'
          });
          ctx.loadRecipeCategories();
        })
        .catch(err => {
          ctx.$message({
            message: err.message,
            type: 'error'
          });
        });
    },
    handleDownRecipeCategory(row) {
      const ctx = this;
      downRecipeCategory(row.id)
        .then(res => {
          ctx.$message({
            message: '下架成功!',
            type: 'success'
          });
          ctx.loadRecipeCategories();
        })
        .catch(err => {
          ctx.$message({
            message: err.message,
            type: 'error'
          });
        });
    },
    handleRemoveRecipeCategory(row) {
      const ctx = this;
      ctx
        .$confirm('是否确认删除该分类?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning'
        })
        .then(() => {
          removeRecipeCategory(row.id)
            .then(res => {
              ctx.$message({
                message: '删除成功!',
                type: 'success'
              });
              ctx.loadRecipeCategories();
            })
            .catch(err => {
              ctx.$message({
                message: err.message,
                type: 'error'
              });
            });
        })
        .catch(() => {});
    },
    handlePageSizeChange(val) {
      this.pageSize = val;
      this.loadBills();
    },
    handlePageNoChange(val) {
      this.pageNo = val;
      this.loadBills();
    },
    loadRecipeCategories() {
      const ctx = this;

      ctx.loading = true;

      const userId = ctx.$store.getters.id;
      const pageSize = ctx.pageSize;
      const pageNo = ctx.pageNo;

      ctx.$store
        .dispatch('LoadRecipeCategories', {
          userId,
          pageSize,
          pageNo
        })
        .then(res => {
          ctx.totalSize = res.payload.totalSize || 0;
          ctx.loading = false;
        })
        .catch(err => {
          ctx.loading = false;
          ctx.$message({
            message: err.message,
            type: 'error'
          });
        });
    }
  },
  computed: {
    recipeCategoriesTableData() {
      return this.$store.getters.recipeCategories.map((recipeCategory, idx) =>
        Object.assign({}, recipeCategory, {
          status: RECIPECATEGORY_STATUS[recipeCategory.status],
          statusValue: recipeCategory.status,
          created_at: moment(recipeCategory.created_at).format('YYYY-MM-DD hh:mm:ss')
        })
      );
    }
  },
  mounted() {
    const ctx = this;
    ctx.loadRecipeCategories();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.recipe-category-container {
  margin: 24px;
}
</style>
