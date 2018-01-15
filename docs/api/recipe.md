# 菜单接口

### 接口列表

* 新建菜单（需商户权限）

#### 新建菜单（需商户权限）

路径：`/recipe/create`
方法: `POST`

请求示例：

```shell
curl -X POST $API_BASE/recipe/create \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
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

#### 获取指定菜单信息

路径：`/recipe/:id`
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

#### 获取指定用户菜单列表

路径：`/recipes/:user_id`
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

#### 获取指定用户与分类菜单列表

路径：`/recipes/:user_id/:category_id`
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
