# 菜单接口

* 发起订单（需客户权限）
* 获取订单列表（需客户权限）
* 获取订单列表（需商户权限）
* 支付订单（需客户权限）
* 取消订单（需客户权限）
* 完成订单（需客户权限）
* 关闭订单（需商户权限）

## 发起订单（需客户权限）

路径：`/order/create/:id`

路径参数：

* id: 商家 id

方法: `POST`

请求参数：

* details: 订单详情，例如：
  ```json
  [
    {
      "id": 1, // 菜单id
      "counts": 2 // 下单个数
    }
  ]
  ```
* address: 地址

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/order/create/10002 \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:73f0799c-ffdd-551c-90c3-cf063e66c0d0' \
  -d '{
	  "details": [{"id": 1, "counts": 2}],
    "address": "xxx"
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
    "has_payed": false,
    "has_refunded": false,
    "has_finished": false,
    "has_evaluated": false,
    "id": "66002018011810383838214544",
    "sender_id": 10001,
    "receiver_id": "10002",
    "name": "苹果*2",
    "details": "[{\"id\":1,\"counts\":2}]",
    "amount": 5.1,
    "updated_at": "2018-01-18T14:38:38.384Z",
    "created_at": "2018-01-18T14:38:38.384Z"
  }
}
```

---

## 获取订单列表（需客户权限）

路径：`/orders/sended`

方法: `POST`

请求参数：

* status: 订单类别，例如：
  ```json
  [0, 1]
  ```

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/orders/sended \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:73f0799c-ffdd-551c-90c3-cf063e66c0d0' \
  -d '{
	  "status": [0]
  }'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": [
    {
      "id": "66002018011810383838214544",
      "sender_id": 10001,
      "receiver_id": 10002,
      "name": "苹果*2",
      "details": "[{\"id\":1,\"counts\":2}]",
      "status": 0,
      "has_payed": false,
      "has_refunded": false,
      "has_finished": false,
      "has_evaluated": false,
      "amount": "5.10",
      "created_at": "2018-01-18T14:38:38.000Z",
      "updated_at": "2018-01-18T14:38:38.000Z"
    }
  ]
}
```

---

## 获取订单列表（需商户权限）

路径：`/orders/received`

方法: `POST`

请求参数：

* status: 订单类别，例如：
  ```json
  [0, 1]
  ```

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/orders/received \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10002:57ee5272-f7e2-54ee-b103-d78ce5d65320' \
  -d '{
	  "status": [0]
  }'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": [
    {
      "id": "66002018011810383838214544",
      "sender_id": 10001,
      "receiver_id": 10002,
      "name": "苹果*2",
      "details": "[{\"id\":1,\"counts\":2}]",
      "status": 0,
      "has_payed": false,
      "has_refunded": false,
      "has_finished": false,
      "has_evaluated": false,
      "amount": "5.10",
      "created_at": "2018-01-18T14:38:38.000Z",
      "updated_at": "2018-01-18T14:38:38.000Z"
    }
  ]
}
```

---

## 支付订单（需客户权限）

路径：`/order/pay/:id`

路径参数：

* id: 订单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/order/pay/66002018011810383838214544 \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:73f0799c-ffdd-551c-90c3-cf063e66c0d0'
```

返回值：

```json
{
  "success": true,
  "message": "支付订单",
  "code": 20000,
  "payload": {
    "id": "66002018011810383838214544",
    "sender_id": 10001,
    "receiver_id": 10002,
    "name": "苹果*2",
    "details": "[{\"id\":1,\"counts\":2}]",
    "status": 1,
    "has_payed": true,
    "has_refunded": false,
    "has_finished": false,
    "has_evaluated": false,
    "amount": "5.10",
    "created_at": "2018-01-18T14:38:38.000Z",
    "updated_at": "2018-01-18T14:48:14.113Z"
  }
}
```

---

## 取消订单（需客户权限）

路径：`/order/cancel/:id`

路径参数：

* id: 订单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/order/cancel/66002018011810383838214544 \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:73f0799c-ffdd-551c-90c3-cf063e66c0d0'
```

返回值：

```json
{
  "success": true,
  "message": "取消订单",
  "code": 20000,
  "payload": {
    "id": "66002018011810383838214544",
    "sender_id": 10001,
    "receiver_id": 10002,
    "name": "苹果*2",
    "details": "[{\"id\":1,\"counts\":2}]",
    "status": 3,
    "has_payed": true,
    "has_refunded": false,
    "has_finished": false,
    "has_evaluated": false,
    "amount": "5.10",
    "created_at": "2018-01-18T14:38:38.000Z",
    "updated_at": "2018-01-18T14:49:40.149Z"
  }
}
```

---

## 完成订单（需客户权限）

路径：`/order/finish/:id`

路径参数：

* id: 订单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/order/finish/66002018011810523630515978 \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:73f0799c-ffdd-551c-90c3-cf063e66c0d0'
```

返回值：

```json
{
  "success": true,
  "message": "完成订单",
  "code": 20000,
  "payload": {
    "id": "66002018011810523630515978",
    "sender_id": 10001,
    "receiver_id": 10002,
    "name": "苹果*2|香蕉*4",
    "details": "[{\"id\":1,\"counts\":2},{\"id\":2,\"counts\":4}]",
    "status": 2,
    "has_payed": true,
    "has_refunded": false,
    "has_finished": true,
    "has_evaluated": false,
    "amount": "23.30",
    "created_at": "2018-01-18T14:52:36.000Z",
    "updated_at": "2018-01-18T14:53:09.490Z"
  }
}
```

---

## 关闭订单（需商户权限）

路径：`/order/close/:id`

路径参数：

* id: 订单 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/order/close/66002018011810383838214544 \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10002:57ee5272-f7e2-54ee-b103-d78ce5d65320'
```

返回值：

```json
{
  "success": true,
  "message": "关闭订单",
  "code": 20000,
  "payload": {
    "id": "66002018011810383838214544",
    "sender_id": 10001,
    "receiver_id": 10002,
    "name": "苹果*2",
    "details": "[{\"id\":1,\"counts\":2}]",
    "status": 4,
    "has_payed": true,
    "has_refunded": true,
    "has_finished": false,
    "has_evaluated": false,
    "amount": "5.10",
    "created_at": "2018-01-18T14:38:38.000Z",
    "updated_at": "2018-01-18T14:50:41.931Z"
  }
}
```

---
