# 菜单分类接口

### 接口列表

* 获取个人用户信息
* 获取指定用户菜单分类列表
* 修改指定菜单分类信息（需商户权限）
* 删除指定菜单分类（需商户权限）
* 新建菜单分类（需商户权限）

#### 获取指定菜单分类信息

路径：`/recipe_category/:id`
方法: `GET`

请求示例：

```shell
curl -X GET $API_BASE/recipe_category/1
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "id": 1,
    "user_id": 10000,
    "name": "饮料",
    "status": 0,
    "created_at": "2018-01-01T00:00:00.000Z",
    "updated_at": "2018-01-01T00:00:00.000Z"
  }
}
```

---

#### 获取指定用户菜单分类列表

路径：`/recipe_categories/:id`
方法: `GET`

请求示例：

```shell
curl -X GET $API_BASE/recipe_categories/10000
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": [
    {
      "id": 1,
      "user_id": 10000,
      "name": "饮料",
      "status": 0,
      "created_at": "2018-01-01T00:00:00.000Z",
      "updated_at": "2018-01-01T00:00:00.000Z"
    }
    ...
  ]
}
```

---

#### 修改指定菜单分类信息（需商户权限）

路径：`/recipe_category/:id`
方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/recipe_category/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -d '{
    "name": "甜品"
  }'
```

返回值：

```json
{
  "success": true,
  "message": "修改成功",
  "code": 20000,
  "payload": [
    {
      "id": 1,
      "user_id": 10000,
      "name": "甜品",
      "status": 0,
      "created_at": "2018-01-01T00:00:00.000Z",
      "updated_at": "2018-01-01T00:01:00.000Z"
    }
    ...
  ]
}
```

---

#### 删除指定菜单分类（需商户权限）

路径：`/recipe_category/remove/:id`
方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/recipe_category/remove/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "删除成功",
  "code": 20000,
  "payload": {
    "id": 1
  }
}
```

---

#### 新建菜单分类（需商户权限）

路径：`/recipe_category/create`
方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/recipe_category/remove/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -d '{
    "name": "水果"
  }'
```

返回值：

```json
{
  "success": true,
  "message": "创建成功",
  "code": 20000,
  "payload": {
    "status": 0,
    "id": 2,
    "user_id": 10000,
    "name": "水果",
    "created_at": "2018-01-01T00:00:00.000Z",
    "updated_at": "2018-01-01T00:01:00.000Z"
  }
}
```

---
