# 账单接口

* 账单统计
* 指定店家账单统计（需企业权限）
* 获取订单统计信息（需店家权限）
* 获取指定店家订单统计信息（需企业权限）

## 账单统计

路径：`/statistics/bill`
方法: `GET`

请求头：

* X-Token: 用户令牌

其他：

* [x] 筛选支持

请求示例：

```shell
curl -X GET \
  $API_BASE/statistics/bill \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "in": "90.00",
    "out": "180.00"
  }
}
```

---

## 指定店家账单统计（需企业权限）

路径：`/statistics/bill`

方法: `POST`

请求头：

* X-Token: 用户令牌

请求参数：

* id：用户 ID 数组

其他：

* [x] 筛选支持

请求示例：

```shell
curl -X GET \
  $API_BASE/statistics/bill \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:xxxxxxxxxxxxx' \
  -d '{
    "id": [ 10002]
  }'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "in": "90.00",
    "out": "180.00"
  }
}
```

---

## 订单统计（需店家权限）

路径：`/statistics/order`

方法: `GET`

请求头：

* X-Token: 用户令牌

其他：

* [x] 筛选支持

请求示例：

```shell
curl -X GET \
  $API_BASE/statistics/order \
  -H 'X-Token: 10002:57ee5272-f7e2-54ee-b103-d78ce5d65320'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "ingCounts": 0,
    "canceledCounts": 0,
    "finishedCounts": 0
  }
}
```

---

## 指定店家订单统计（需企业权限）

路径：`statistics/order`

方法: `POST`

请求参数：

* id：用户 ID 数组

请求头：

* X-Token: 用户令牌

其他：

* [x] 筛选支持

请求示例：

```shell
curl -X POST \
  $API_BASE/statistics/order \
  -H 'X-Token: 10002:57ee5272-f7e2-54ee-b103-d78ce5d65320' \
  -d '{
    "id": [ 10001, 10002]
  }'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "ingCounts": 0,
    "canceledCounts": 0,
    "finishedCounts": 0
  }
}
```

---
