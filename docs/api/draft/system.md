# 系统接口

* 获取系统时间

## 获取系统时间

路径：`/system/time`
方法: `GET`

请求示例：

```shell
curl -X GET $API_BASE/system/time
```

返回值：

```json
{
    "success": true,
    "message": "获取成功",
    "code": 20000,
    "payload": {
        "time": 1516285265327
    }
}
```