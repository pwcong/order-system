# 菜单接口

* 新建菜单（需商户权限）
* 获取指定菜单信息
* 获取指定用户菜单列表
* 获取指定用户与分类菜单列表
* 上线指定菜单（需商户权限）
* 下线指定菜单（需商户权限）
* 删除指定菜单（需商户权限）

## 新建菜单（需商户权限）

路径：`/recipe/create`
方法: `POST`

请求参数：

* category_id: 菜单分类 ID
* name: 菜单标题
* price: 菜单价格
* avatar: 菜单图标链接
* content: 菜单介绍

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST $API_BASE/recipe/create \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -d '{
    "category_id": 1,
    "name": "香蕉",
    "price": "2.50",
    "avatar": "http://xxx.png",
    "content": "又大又粗的香蕉♂"
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
    "id": 1,
    "user_id": 10000,
    "category_id": 1,
    "name": "香蕉",
    "price": "2.50",
    "avatar": "http://xxx.png",
    "content": "又大又粗的香蕉♂",
    "updated_at": "2018-01-01T00:00:00.000Z",
    "created_at": "2018-01-01T00:00:00.000Z"
  }
}
```

---

## 获取指定菜单信息

路径：`/recipe/:id`

路径参数：

* id: 菜单 id

方法: `GET`

请求示例：

```shell
curl -X POST $API_BASE/recipe/1
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "status": 0,
    "id": 1,
    "user_id": 10000,
    "category_id": 1,
    "name": "香蕉",
    "price": "2.50",
    "avatar": "http://xxx.png",
    "content": "又大又粗的香蕉♂",
    "updated_at": "2018-01-01T00:00:00.000Z",
    "created_at": "2018-01-01T00:00:00.000Z"
  }
}
```

---

## 获取指定用户菜单列表

路径：`/recipes/:user_id`

路径参数：

* user_id: 用户 id

方法: `GET`

请求示例：

```shell
curl -X POST $API_BASE/recipes/10000
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": [
    {
      "status": 0,
      "id": 1,
      "user_id": 10000,
      "category_id": 1,
      "name": "香蕉",
      "price": "2.50",
      "avatar": "http://xxx.png",
      "content": "又大又粗的香蕉♂",
      "updated_at": "2018-01-01T00:00:00.000Z",
      "created_at": "2018-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 获取指定用户与分类菜单列表

路径：`/recipes/:user_id/:category_id`

路径参数：

* user_id: 用户 id
* category_id: 分类 id

方法: `GET`

请求示例：

```shell
curl -X POST $API_BASE/recipes/10000/1
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": [
    {
      "status": 0,
      "id": 1,
      "user_id": 10000,
      "category_id": 1,
      "name": "香蕉",
      "price": "2.50",
      "avatar": "http://xxx.png",
      "content": "又大又粗的香蕉♂",
      "updated_at": "2018-01-01T00:00:00.000Z",
      "created_at": "2018-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 修改指定菜单信息（需商户权限）

路径：`/recipe/:id`

路径参数：

* id: 菜单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求参数：

* category_id: 菜单分类 ID
* name: 菜单标题
* price: 菜单价格
* avatar: 菜单图标链接
* content: 菜单介绍

请求示例：

```shell
curl -X POST $API_BASE/recipe/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -d '{
    "category_id": 1,
    "name": "香蕉",
    "price": "2.50",
    "avatar": "http://xxx.png",
    "content": "又大又粗的香蕉♂"
  }'
```

返回值：

```json
{
  "success": true,
  "message": "修改成功",
  "code": 20000,
  "payload": {
    "status": 0,
    "id": 1,
    "user_id": 10000,
    "category_id": 1,
    "name": "香蕉",
    "price": "2.50",
    "avatar": "http://xxx.png",
    "content": "又大又粗的香蕉♂",
    "updated_at": "2018-01-01T00:00:00.000Z",
    "created_at": "2018-01-01T00:01:00.000Z"
  }
}
```

---

## 上线指定菜单（需商户权限）

路径：`/recipe/up/:id`

路径参数：

* id: 菜单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST $API_BASE/recipe/up/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "上线成功",
  "code": 20000,
  "payload": {
    "id": 1
  }
}
```

---

## 下线指定菜单（需商户权限）

路径：`/recipe/down/:id`

路径参数：

* id: 菜单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST $API_BASE/recipe/down/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "上线成功",
  "code": 20000,
  "payload": {
    "id": 1
  }
}
```

---

## 删除指定菜单（需商户权限）

路径：`/recipe/remove/:id`

路径参数：

* id: 菜单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST $API_BASE/recipe/remove/1 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "上线成功",
  "code": 20000,
  "payload": {
    "id": 1
  }
}
```

---
