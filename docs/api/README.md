#### 分页支持

部分接口支持数据分页

分页参数：

* pageSize: 每页个数
* pageNo: 页码

请求示例：

```shell
curl -X GET $API_BASE/recipes/10001?pageSize=20&pageNo=1
```

#### 筛选支持

部分接口支持数据筛选

分页参数：

* filter： 筛选规则
  * yyyy：年
  * yyyy-mm：年月
  * yyyy-mm-dd：年月日
  * today：今日

请求示例：

```shell
curl -X POST $API_BASE/bills/today
```

#### 统一请求返回内容（JSON）

无论请求是否处理成功均返回内容，内容模板如下：

```json
{
  "success": true,      // 是否处理成功
  "message": "xxx",     // 错误信息
  "code": 20000,        // 响应码
  "payload": {          // 主要内容
    ...
  }
}
```

#### 响应码

| 数值  | 含义      |
| ----- | -------- |
| 20000 | 请求成功  |
| 40000 | 请求失败  |
