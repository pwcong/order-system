# 附件接口

* 上传附件

## 上传附件

路径：`/attachment/upload`
方法: `POST`

请求头：

* X-Token: 用户令牌

请求示例：

```shell
curl -X POST \
  $API_BASE/attachment/upload \
  -H 'X-Token: 10001:406b0dbf-8ff1-5ee3-b437-4ac707df62e9' \
  -H 'content-type: multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'file=@C:\A\B\C\123.jpg'
```

返回值：

```json
{
    "success": true,
    "message": "上传成功",
    "code": 20000,
    "payload": {
        "url": "/public/attachments/2018/02/14/f6028f205731550e49c2b0b0d0847561.jpg"
    }
}
```

---
