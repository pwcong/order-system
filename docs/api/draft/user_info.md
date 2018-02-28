# 用户信息接口

* 获取个人用户信息
* 获取指定用户信息
* 修改个人用户信息

## 获取个人用户信息

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

## 获取指定用户信息

路径：`/user/info/:id`

路径参数：

* id：用户 ID

方法: `GET`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X GET \
  $API_BASE/user/info/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "id": 10001,
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

## 修改个人用户信息

路径：`/user/info`

方法: `POST`

请求头：

* X-Token: 用户令牌

请求参数：

* nickname: 昵称
* birthday: 生日
* sex: 性别，0 未知、1 男、2 女
* address: 地址
* intro: 介绍
* avatar: 头像链接

请求示例：

```shell
curl -X POST \
  $API_BASE/user/info \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -d '{
    "nickname": "xxx",
    "birthday": "2018-01-01T00:00:00.000Z",
    "sex": 1,
    "address": "xxx",
    "intro": "xxx",
    "avatar": "http://yyy.png",
  }'
```

返回值：

```json
{
  "success": true,
  "message": "获取成功",
  "code": 20000,
  "payload": {
    "id": 10001,
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
