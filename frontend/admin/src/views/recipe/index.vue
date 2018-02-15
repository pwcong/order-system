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
            <el-button v-if="!!selectedCategory" type="success" icon="el-icon-plus" @click="handleAddRecipe">新建</el-button>
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
                      <img :src="props.row.avatar" @click="handlePictureCardPreview(props.row.avatar)"/>
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
                    v-if="[1].indexOf(scope.row.statusValue) >= 0 && scope.row.recipe_category.status === 0"
                    @click="handleUpRecipe(scope.row)"
                    size="mini"
                    icon="el-icon-goods"
                    type="success">上架</el-button>
                  <el-button
                    v-if="[0].indexOf(scope.row.statusValue) >= 0 && scope.row.recipe_category.status === 0"
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

    <el-dialog
      title="修改菜单"
      :visible.sync="modifyDialogVisible"
      width="40%">

      <el-form ref="modifyForm" :rules="modifyRules" label-width="80px" :model="modifyForm">
        <el-form-item label="贴图：" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleModifyAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="modifyForm.avatarUrl" :src="modifyForm.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="modifyForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="category">
          <el-input v-model="modifyForm.category" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格：" prop="price">
          <el-input v-model="modifyForm.price">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="介绍：" prop="content">
          <el-input v-model="modifyForm.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelModifyRecipe">取 消</el-button>
        <el-button type="primary" @click="handleSubmitModifyRecipe">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增菜单"
      :visible.sync="newDialogVisible"
      width="40%">

      <el-form ref="newForm" label-width="80px" :rules="newRules" :model="newForm">
        <el-form-item label="贴图：" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleAddAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="newForm.avatarUrl" :src="newForm.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="newForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="category">
          <el-input v-model="newForm.category" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格：" prop="price">
          <el-input v-model="newForm.price">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="介绍：" prop="content">
          <el-input v-model="newForm.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAddRecipe">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddRecipe">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment';

import { getToken } from '@/utils/auth';

import { upRecipe, downRecipe, removeRecipe, modifyRecipe, createRecipe } from '@/api/recipe';

import config from '@/const/config';

const RECIPE_STATUS = {
  '0': '正常',
  '1': '下架'
};

export default {
  name: 'Recipe',
  data() {
    var pricePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入价格'));
      } else {
        if (!/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(value)) {
          callback(new Error('请输入正确的价格'));
        }
        callback();
      }
    };

    return {
      RECIPE_STATUS,
      uploadUrl: config.BASE_API + '/attachment/upload',
      uploadHeaders: {
        'X-Token': getToken()
      },
      loading: false,
      pageSize: 15,
      pageNo: 1,
      totalSize: 0,
      loadAll: true,
      selectedCategory: '',

      selectedRecipeId: '',
      modifyForm: {},
      modifyDialogVisible: false,
      modifyRules: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: pricePass, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        content: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        avatar: [{ required: true, message: '请上传贴图', trigger: 'blur' }]
      },

      newForm: {},
      newDialogVisible: false,
      newRules: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: pricePass, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        content: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        avatar: [{ required: true, message: '请上传贴图', trigger: 'blur' }]
      },

      dialogVisible: false,
      dialogImageUrl: ''
    };
  },
  methods: {
    handleAddAvatarSuccess(res, file) {
      if (!res.success) {
        this.$message({
          message: res.message,
          type: 'error'
        });
        return;
      }
      this.newForm = Object.assign({}, this.newForm, {
        avatarUrl: config.BASE_API + res.payload.url,
        avatar: res.payload.url
      });
    },
    handleModifyAvatarSuccess(res, file) {
      if (!res.success) {
        this.$message({
          message: res.message,
          type: 'error'
        });
        return;
      }

      this.modifyForm = Object.assign({}, this.modifyForm, {
        avatarUrl: config.BASE_API + res.payload.url,
        avatar: res.payload.url
      });
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
        this.selectedCategory = item;
      }

      if (flag) {
        this.selectedCategory = '';
        this.loadAll = true;
        this.loadAllRecipes();
      } else {
        this.loadAll = false;
        this.loadRecips();
      }
    },
    handleAddRecipe() {
      const ctx = this;
      ctx.newDialogVisible = true;
      ctx.newForm = {
        category: ctx.selectedCategory.name,
        category_id: ctx.selectedCategory.id
      };
    },
    handleSubmitAddRecipe() {
      const ctx = this;
      ctx.$refs.newForm.validate(valid => {
        if (valid) {
          createRecipe(ctx.newForm)
            .then(res => {
              ctx.$message({
                message: '新增成功!',
                type: 'success'
              });
              ctx.newDialogVisible = false;
              ctx.reloadRecipes();
            })
            .catch(err => {
              ctx.$message({
                message: err.message,
                type: 'error'
              });
            });
        } else {
          return false;
        }
      });
    },
    handleCancelAddRecipe() {
      this.$refs.newForm.resetFields();
      this.newDialogVisible = false;
    },
    handleModifyRecipe(row) {
      this.modifyDialogVisible = true;
      this.selectedRecipeId = row.id;
      this.modifyForm = {
        name: row.name,
        category: row.recipe_category.name,
        avatarUrl: row.avatar,
        avatar: row.avatarValue,
        price: row.priceValue,
        content: row.content
      };
    },
    handleSubmitModifyRecipe() {
      const ctx = this;
      ctx.$refs.modifyForm.validate(valid => {
        if (valid) {
          modifyRecipe(ctx.selectedRecipeId, ctx.modifyForm)
            .then(res => {
              ctx.$message({
                message: '修改成功!',
                type: 'success'
              });
              ctx.modifyDialogVisible = false;
              ctx.reloadRecipes();
            })
            .catch(err => {
              ctx.$message({
                message: err.message,
                type: 'error'
              });
            });
        } else {
          return false;
        }
      });
    },
    handleCancelModifyRecipe() {
      this.$refs.modifyForm.resetFields();
      this.modifyDialogVisible = false;
    },
    handleUpRecipe(row) {
      const ctx = this;
      upRecipe(row.id)
        .then(res => {
          ctx.$message({
            message: '上架成功!',
            type: 'success'
          });
          ctx.reloadRecipes();
        })
        .catch(err => {
          ctx.$message({
            message: err.message,
            type: 'error'
          });
        });
    },
    handleDownRecipe(row) {
      const ctx = this;
      downRecipe(row.id)
        .then(res => {
          ctx.$message({
            message: '上架成功!',
            type: 'success'
          });
          ctx.reloadRecipes();
        })
        .catch(err => {
          ctx.$message({
            message: err.message,
            type: 'error'
          });
        });
    },
    handleRemoveRecipe(row) {
      const ctx = this;
      ctx
        .$confirm('是否确认删除该菜单?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning'
        })
        .then(() => {
          removeRecipe(row.id)
            .then(res => {
              ctx.$message({
                message: '删除成功!',
                type: 'success'
              });
              ctx.reloadRecipes();
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
      const categoryId = ctx.selectedCategory.id;
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
    },
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
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
          priceValue: recipe.price,
          avatar: config.BASE_API + recipe.avatar,
          avatarValue: recipe.avatar,
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
      cursor: pointer;
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
}
</style>
