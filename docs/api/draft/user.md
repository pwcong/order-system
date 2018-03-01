# 用户接口

* 用户注册
* 用户登录
* 用户登出
* 验证令牌
* 锁定用户（需管理员权限）
* 解锁用户（需管理员权限）
* 注销用户（需管理员权限）
* 查询店家
* 查询余额
* 注册店家（需企业权限）
* 锁定店家（需企业权限）
* 解锁店家（需企业权限）
* 注销店家（需企业权限）
* 查询企业旗下店家

## 用户注册

路径：`/user/register`

方法: `POST`

请求参数:

* username: 用户名
* password: 密码
* type: 用户类型，1.客户 2.店家 3.企业
* userInfo: 用户信息（可选）

请求示例：

```shell
curl -X POST \
  $API_BASE/user/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "xxx",
    "password": "yyy",
    "type": "1",
    "userInfo": {
      ...
    }
  }'
```

返回值：

```json
{
  "success": true,
  "message": "注册成功",
  "code": 20000,
  "payload": {
    "token": "10000:xxxxxxxxxxxxx",
    "id": 10000,
    "parentId": null,
    "type": 999,
    "timestamp": 1516008115906,
    "userInfo": {
      ...
    },
    "userSecret": {
      ...
    }
  }
}
```

---

## 用户登录

路径：`/user/login`

方法：`POST`

请求参数：

* username: 用户名
* password: 密码

请求示例：

```shell
curl -X POST \
  $API_BASE/user/login \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "xxx",
    "password": "yyy"
  }'
```

返回值：

```json
{
  "success": true,
  "message": "登录成功",
  "code": 20000,
  "payload": {
    "token": "10000:xxxxxxxxxxxxx",
    "id": 10000,
    "parentId": null,
    "type": 999,
    "timestamp": 1516008115906,
    "userInfo": {
      ...
    },
    "userSecret": {
      ...
    }
  }
}
```

---

## 用户登出

路径：`/user/logout`

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/logout \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "message": "登出成功",
  "code": 20000
}
```

---

## 验证令牌

路径：`/user/check`

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/check \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "验证成功",
  "payload": {
    "id": 10000,
    "parentId": null,
    "type": 999,
    "timestamp": 1516008115906,
    "userInfo": {
      ...
    },
    "userSecret": {
      ...
    }
  }
}
```

---

## 锁定用户（需管理员权限）

路径：`/user/lock/:id`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/lock/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "锁定成功",
  "payload": {
    "id": 10001
  }
}
```

---

## 解锁用户（需管理员权限）

路径：`/user/unlock/:id`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/unlock/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "解锁成功",
  "payload": {
    "id": 10001
  }
}
```

---

## 注销用户（需管理员权限）

路径：`/user/remove/:id`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/remove/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "注销成功",
  "payload": {
    "id": 10001
  }
}
```

---

## 修改密码

路径：`/user/modify/password`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求参数：

* password: 新密码

请求示例：

```shell
curl -X POST \
  $API_BASE/user/remove/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "password": "aaa"
  }'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "修改成功",
  "payload": {
    "id": 10000,
    "type": 999,
    "timestamp": 1516008115906,
    "user_info": {
      ...
    }
  }
}
```

---

## 查询店家

路径：`/user/business/:id`

路径参数：

* id：用户 ID

方法：`GET`

请求示例：

```shell
curl -X GET \
  $API_BASE/user/business/10001
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "修改成功",
  "payload": {
    "id": 10001,
    "type": 2,
    "status": 0,
    "user_info": {
      ...
    }
  }
}
```

---

## 查询余额

路径：`/user/balance`

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/balance \
  -H 'X-Token: 10000:xxxxxxxxxxxxx'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "修改成功",
  "payload": {
    "balance": "10.00"
  }
}
```

---

## 注册店家（需企业权限）

路径：`/user/business/register`

方法: `POST`

请求头：

* X-Token: 用户令牌

请求参数:

* username: 用户名
* password: 密码
* userInfo: 店家信息

请求示例：

```shell
curl -X POST \
  $API_BASE/user/business/register \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "xxx",
    "password": "yyy",
    "userInfo": {
      "nickname": "测试小店"
    }
  }'
```

返回值：

```json
{
  "success": true,
  "message": "注册成功",
  "code": 20000,
  "payload": {
    "token": "10000:xxxxxxxxxxxxx",
    "id": 10000,
    "parentId": null,
    "type": 999,
    "timestamp": 1516008115906,
    "userInfo": {
      ...
    },
    "userSecret": {
      ...
    }
  }
}
```

---

## 锁定店家（需企业权限）

路径：`/user/business/lock/:id`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/business/lock/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "锁定成功",
  "payload": {
    "id": 10001
  }
}
```

---

## 解锁店家（需企业权限）

路径：`/user/business/unlock/:id`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/business/unlock/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "解锁成功",
  "payload": {
    "id": 10001
  }
}
```

---

## 注销店家（需企业权限）

路径：`/user/business/remove/:id`

路径参数：

* id：用户 ID

方法：`POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/user/business/remove/10001 \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json'
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "注销成功",
  "payload": {
    "id": 10001
  }
}
```

---

## 查询企业旗下店家

路径：`/user/businesses/:id`

路径参数：

* id：用户 ID

其他：

* [x] 支持分页

方法：`GET`

请求示例：

```shell
curl -X GET \
  $API_BASE/user/businesses/10001
```

返回值：

```json
{
  "success": true,
  "code": 20000,
  "message": "修改成功",
  "payload": {
    "data": [
      {
        "id": 10007,
        "type": 2,
        "status": 0,
        "userInfo": {
          "id": 10007,
          "nickname": "business1",
          "birthday": null,
          "sex": 0,
          "address": "",
          "contact": "",
          "intro": "",
          "avatar": "",
          "banner": "",
          "created_at": "2018-02-28T08:22:53.000Z",
          "updated_at": "2018-02-28T08:22:53.000Z"
        }
      }
    ],
    "pageNo": 1,
    "totalNo": 3,
    "pageSize": 1,
    "totalSize": 2
  }
}
```

---
