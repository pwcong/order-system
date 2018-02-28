# 系统接口

* 查询用户评价
* 查询菜单评价

## 查询用户评价

路径：`/evaluation/user/:id`

路径参数：

* id：用户 ID

方法: `GET`

其他：

* [x] 分页支持
* [x] 筛选支持

请求示例：

```shell
curl -X GET $API_BASE/evaluation/user/10001
```

返回值：

```json
{
  "success": true,
  "message": "查询成功",
  "code": 20000,
  "payload": {
    "data": [
      {
        "id": 4,
        "user_id": 10002,
        "user_info_id": 10002,
        "target_id": 10001,
        "score": 5,
        "content": "xxx",
        "is_auto": false,
        "status": 0,
        "created_at": "2018-02-27T07:10:59.000Z",
        "updated_at": "2018-02-27T07:10:59.000Z",
        "user_info": {
          "id": 10002,
          "nickname": "test",
          "birthday": null,
          "sex": 0,
          "address": "",
          "contact": "",
          "intro": "",
          "avatar": "",
          "banner": "",
          "created_at": "2018-02-27T06:04:54.000Z",
          "updated_at": "2018-02-27T06:04:54.000Z"
        }
      }
    ],
    "pageNo": 1,
    "totalNo": 5,
    "pageSize": 1,
    "totalSize": 4
  }
}
```

---

## 查询菜单评价

路径：`/evaluation/recipe/:id`

路径参数：

* id：菜单 ID

方法: `GET`

其他：

* [x] 分页支持
* [x] 筛选支持

请求示例：

```shell
curl -X GET $API_BASE/evaluation/recipe/1
```

返回值：

```json
{
  "success": true,
  "message": "查询成功",
  "code": 20000,
  "payload": {
    "data": [
      {
        "id": 6,
        "user_id": 10002,
        "user_info_id": 10002,
        "target_id": 1,
        "score": 1,
        "content": "xxx",
        "is_auto": false,
        "status": 0,
        "created_at": "2018-02-27T07:10:59.000Z",
        "updated_at": "2018-02-27T07:10:59.000Z",
        "user_info": {
          "id": 10002,
          "nickname": "test",
          "birthday": null,
          "sex": 0,
          "address": "",
          "contact": "",
          "intro": "",
          "avatar": "",
          "banner": "",
          "created_at": "2018-02-27T06:04:54.000Z",
          "updated_at": "2018-02-27T06:04:54.000Z"
        }
      }
    ],
    "pageNo": 1,
    "totalNo": 4,
    "pageSize": 1,
    "totalSize": 3
  }
}
```
