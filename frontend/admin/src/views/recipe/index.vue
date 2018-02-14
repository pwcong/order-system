<template>
  <div class="recipe-container">

    <el-row :gutter="20" class="recipe-category">
      <el-col :span="4">

        <div class="recipe-category-head">
          <span>菜单分类</span>
        </div>

        <el-menu
          class="recipe-category-list"
          default-active="1">

          <el-menu-item class="recipe-category-item" :index="(idx+1) + ''" v-for="(item, idx) in recipeCategories" :key="'recipe-category-' + idx">
            <span slot="title">{{idx + 1}}</span>
          </el-menu-item>
        </el-menu>

      </el-col>
      <el-col :span="20">

        <el-table
          :data="recipesTableData"
          border
          style="width: 100%">
          <el-table-column
            prop="created_at"
            label="创建日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="category"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
        </el-table>

      </el-col>

    </el-row>


  </div>
</template>

<script>
export default {
  name: 'Recipe',
  data() {
    return {
      recipeCategories: [...new Array(15)].map(() => 0)
    };
  },
  computed: {
    recipesTableData() {
      return [];
    }
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
}
</style>
