# 支付接口

### 接口列表

* 获取支持支付通道信息

#### 获取支持支付通道信息

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
