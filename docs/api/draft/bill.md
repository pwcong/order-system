# 账单接口

* 查询账单

## 查询账单

路径：`/bills`
方法: `POST`

请求头：

* X-Token: 用户令牌

请求参数:

* type: 支付类型数组，0.收入 1.支出

请求示例：

```shell
curl -X POST \
  $API_BASE/bills \
  -H 'Content-Type: application/json' \
  -H 'X-Token: 10001:xxxxxxxxxxxxx' \
  -d '{
    "type": [0, 1]
  }'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "data": [
      {
        "id": 2,
        "user_id": 10001,
        "name": "付款",
        "amount": "64.90",
        "payment_type": 1,
        "type": 1,
        "created_at": "2018-02-12T06:28:16.000Z",
        "updated_at": "2018-02-12T06:28:16.000Z"
      }
    ],
    "pageNo": 1,
    "totalNo": 1,
    "pageSize": 50,
    "totalSize": 1
  }
}
```

---
