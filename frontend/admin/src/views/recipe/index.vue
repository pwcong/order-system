<template>
  <div class="recipe-container">

    <el-row :gutter="20" class="recipe-category">
      <el-col :span="4">

        <div class="recipe-category-head">
          <span>菜单分类</span>
        </div>

        <el-menu
          class="recipe-category-list"
          default-active="0">

          <el-menu-item 
            class="recipe-category-item"
            index="0"
            @click="handleRecipeCategoryChange(null, true)">
            <span slot="title">全部</span>
          </el-menu-item>

          <el-menu-item 
            class="recipe-category-item" 
            v-for="(item, idx) in recipeCategories" 
            :index="(idx + 1) + ''" 
            :key="'recipe-category-' + idx"
            @click="handleRecipeCategoryChange(item)">
            <span slot="title">{{item.name}}{{item.status !== 0 ? '(下架)' : ''}}</span>
          </el-menu-item>

        </el-menu>

      </el-col>
      <el-col :span="20">

        <el-row>
          <el-col :span="24" style="text-align: right;">
            <el-button type="success" icon="el-icon-plus" @click="handleAddRecipe">新建</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="reloadRecipes()">刷新</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
          <el-col :span="24">       
            <el-table
              v-loading="loading"
              :data="recipesTableData"
              border
              style="width: 100%">

              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" label-width="90" inline class="recipe-table-expand">
                    <el-form-item label="贴图：">
                      <img :src="props.row.avatar"/>
                    </el-form-item>
                    <el-form-item label="分类：">
                      <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="描述：">
                      <span>{{ props.row.content }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>


              <el-table-column
                label="创建日期"
                width="200">

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
                label="名称">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
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
                    @click="handleModifyRecipe(scope.row)"
                    icon="el-icon-edit"
                    type="primary"
                    size="mini">修改</el-button>
                  <el-button
                    v-if="[1].indexOf(scope.row.statusValue) >= 0"
                    @click="handleUpRecipe(scope.row)"
                    size="mini"
                    icon="el-icon-goods"
                    type="success">上架</el-button>
                  <el-button
                    v-if="[0].indexOf(scope.row.statusValue) >= 0"
                    @click="handleDownRecipe(scope.row)"
                    size="mini"
                    icon="el-icon-sold-out"
                    type="info">下架</el-button>
                  <el-button
                    v-if="[0, 1].indexOf(scope.row.statusValue) >= 0"
                    @click="handleRemoveRecipe(scope.row)"
                    size="mini"
                    icon="el-icon-delete"
                    type="danger">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
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
      </el-col>
    </el-row>

  </div>
</template>

<script>
import moment from 'moment';

import config from '@/const/config';

const RECIPE_STATUS = {
  '0': '正常',
  '1': '下架'
};

export default {
  name: 'Recipe',
  data() {
    return {
      RECIPE_STATUS,
      loading: false,
      pageSize: 15,
      pageNo: 1,
      totalSize: 0,
      loadAll: true,
      selectedCategoryId: ''
    };
  },
  methods: {
    handlePageSizeChange(val) {
      this.pageSize = val;
      this.loadRecips();
    },
    handlePageNoChange(val) {
      this.pageNo = val;
      this.loadRecips();
    },
    handleRecipeCategoryChange(item, flag) {
      this.pageNo = 1;

      if (item) {
        this.selectedCategoryId = item.id;
      }

      if (flag) {
        this.loadAll = true;
        this.loadAllRecipes();
      } else {
        this.loadAll = false;
        this.loadRecips();
      }
    },
    handleAddRecipe() {},
    handleSubmitAddRecipe() {},
    handleModifyRecipe(row) {},
    handleUpRecipe(row) {},
    handleDownRecipe(row) {},
    handleRemoveRecipe(row) {},
    reloadRecipes() {
      this.pageNo = 1;

      if (this.loadAll) {
        this.loadAllRecipes();
      } else {
        this.loadRecips();
      }
    },
    loadRecips() {
      const ctx = this;

      const userId = ctx.$store.getters.id;
      const categoryId = ctx.selectedCategoryId;
      const pageSize = ctx.pageSize;
      const pageNo = ctx.pageNo;

      ctx.loading = true;

      ctx.$store
        .dispatch('LoadRecipesWithCategoryId', {
          userId,
          categoryId,
          pageSize,
          pageNo
        })
        .then(res => {
          ctx.loading = false;
        })
        .catch(err => {
          ctx.$message({
            type: 'error',
            message: err.message
          });
          ctx.loading = false;
        });
    },
    loadAllRecipes() {
      const ctx = this;

      const userId = ctx.$store.getters.id;
      const pageSize = ctx.pageSize;
      const pageNo = ctx.pageNo;

      ctx.loading = true;

      ctx.$store
        .dispatch('LoadAllRecipes', {
          userId,
          pageSize,
          pageNo
        })
        .then(res => {
          ctx.loading = false;
        })
        .catch(err => {
          ctx.$message({
            type: 'error',
            message: err.message
          });
          ctx.loading = false;
        });
    }
  },
  computed: {
    recipesTableData() {
      return this.$store.getters.recipes.map((recipe, idx) =>
        Object.assign({}, recipe, {
          status: RECIPE_STATUS[recipe.recipe_category.status || recipe.status],
          statusValue: recipe.recipe_category.status || recipe.status,
          category: recipe.recipe_category.name,
          price: '￥' + recipe.price,
          avatar: config.BASE_API + recipe.avatar,
          created_at: moment(recipe.created_at).format('YYYY-MM-DD hh:mm:ss')
        })
      );
    },
    recipeCategories() {
      return this.$store.getters.recipeCategories;
    }
  },
  mounted() {
    const ctx = this;
    ctx.$store.dispatch('LoadAllRecipeCategories', {
      userId: ctx.$store.getters.id
    });

    ctx.reloadRecipes();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.recipe-container {
  margin: 24px;

  .recipe-category {
    .recipe-category-head {
      padding: 4px 8px;
      border-right: 1px solid #e6e6e6;
    }

    .recipe-category-list {
      padding-top: 12px;
      .recipe-category-item {
        height: 38px;
        line-height: 38px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .recipe-table-expand {
    font-size: 0;

    img {
      width: 48px;
      height: 48px;
    }
  }

  .recipe-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .recipe-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
