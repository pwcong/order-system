# 用户接口

### 接口列表

* 用户注册
* 用户登录
* 用户登出
* 验证令牌
* 锁定用户
* 解锁用户
* 注销用户

#### 用户注册

路径：`/user/register`
方法: `POST`
请求参数:

* username: 用户名
* password: 密码
* phone: 手机号
* type: 用户类型，1.客户 2.店家 3.企业

请求示例：

```shell
curl -X POST \
  $API_BASE/user/register \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "xxx",
    "password": "yyy",
    "phone": "13000000000",
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
    "timestamp": 1516008115906
  }
}
```

---

#### 用户登录

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
    "timestamp": 1516008115906
  }
}
```

---

#### 用户登出

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

#### 验证令牌

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
    "timestamp": 1516008115906
  }
}
```

---

#### 锁定用户（需管理员权限）

路径：`/user/lock`
方法：`POST`

请求头：

* X-Token: 用户令牌

请求参数：

* id: 用户 ID

请求示例：

```shell
curl -X POST \
  $API_BASE/user/lock \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": 10001
  }'
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

#### 解锁用户（需管理员权限）

路径：`/user/unlock`
方法：`POST`

请求头：

* X-Token: 用户令牌

请求参数：

* id: 用户 ID

请求示例：

```shell
curl -X POST \
  $API_BASE/user/unlock \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": 10001
  }'
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

#### 注销用户（需管理员权限）

路径：`/user/remove`
方法：`POST`

请求头：

* X-Token: 用户令牌

请求参数：

* id: 用户 ID

请求示例：

```shell
curl -X POST \
  $API_BASE/user/remove \
  -H 'X-Token: 10000:xxxxxxxxxxxxx' \
  -H 'Content-Type: application/json' \
  -d '{
    "id": 10001
  }'
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
