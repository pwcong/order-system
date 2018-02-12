# 支付接口

* 获取支持支付通道信息
* 开通支付通道（需管理员权限）
* 关闭支付通道（需管理员权限）

## 获取支持支付通道信息

路径：`/payment/support`
方法: `GET`

请求示例：

```shell
curl -X GET $API_BASE/payment/support
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": [
    {
      "id": 2,
      "name": "微信",
      "status": 0,
      "created_at": "2018-01-01T00:00:00.000Z",
      "updated_at": "2018-01-01T00:00:00.000Z"
    }
  ]
}
```

## 开通支付通道（需管理员权限）

路径：`/payment/up/:id`

路径参数：

* id: 支付类型 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST $API_BASE/payment/up/1
```

返回值：

```json
{
  "success": true,
  "message": "上线成功",
  "code": 20000,
  "payload": {
    "id": 1,
    "name": "余额",
    "status": 0,
    "created_at": "2018-01-17T14:13:48.000Z",
    "updated_at": "2018-01-17T14:13:48.000Z"
  }
}
```

## 关闭支付通道（需管理员权限）

路径：`/payment/down/:id`

路径参数：

* id: 支付类型 id

方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST $API_BASE/payment/down/1
```

返回值：

```json
{
  "success": true,
  "message": "下线成功",
  "code": 20000,
  "payload": {
    "id": 1,
    "name": "余额",
    "status": 1,
    "created_at": "2018-01-17T14:13:48.000Z",
    "updated_at": "2018-01-18T14:26:16.594Z"
  }
}
```
