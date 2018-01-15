# 用户信息接口

### 接口列表

* 获取用户信息

#### 获取个人用户信息

路径：`/user/info`
方法: `GET`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X GET \
  $API_BASE/user/info \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "id": 10000,
    "nickname": "xxx",
    "birthday": "2018-01-01T00:00:00.000Z",
    "sex": 1,
    "address": "xxx",
    "intro": "xxx",
    "avatar": "http://yyy.png",
    "created_at": "2018-01-01T00:00:00.000Z",
    "updated_at": "2018-01-01T00:00:00.000Z"
  }
}
```

---
