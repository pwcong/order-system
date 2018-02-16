# 用户接口

* 用户注册
* 用户登录
* 用户登出
* 验证令牌
* 锁定用户（需管理员权限）
* 解锁用户（需管理员权限）
* 注销用户（需管理员权限）

## 用户注册

路径：`/user/register`
方法: `POST`
请求参数:

* username: 用户名
* password: 密码
* type: 用户类型，1.客户 2.店家 3.企业

请求示例：

```shell
curl -X POST \
  $API_BASE/user/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "xxx",
    "password": "yyy",
    "type": "1"
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
    "type": 999,
    "timestamp": 1516008115906,
    "user_info": {
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

* upe: 用户名，手机，邮箱
* password: 密码

请求示例：

```shell
curl -X POST \
  $API_BASE/user/login \
  -H 'Content-Type: application/json' \
  -d '{
    "upe": "xxx",
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
    "type": 999,
    "timestamp": 1516008115906,
    "user_info": {
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
    "type": 999,
    "timestamp": 1516008115906,
    "user_info": {
      ...
    }
  }
}
```

---

## 锁定用户（需管理员权限）

路径：`/user/lock/:id`
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
方法：`POST`

请求头：

* X-Token: 用户令牌

请求参数：

* password: 新密码请求示例：

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
