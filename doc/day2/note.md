### URL

> [官方文档](http://nodejs.org/api/url.html)

* 解析URL，生成URL以及拼接URL
* 常用`.parse`将字符串转换成URL对象 / `.format方法`将URL对象转换成URL字符串
* resolve用于拼接URL

### querystring

> [官方文档](http://nodejs.org/api/querystring.html)

* 用于实现URL参数字符串与参数对象的相互转换
* 常用`parse`转换成参数对象、`stringify`转换成参数字符串

### zlib

> [官方文档](http://nodejs.org/api/zlib.html)

* 数据压缩和解压的功能
* 可用于http请求和相应的时候，使用zlib模块返回gzip之后的响应体数据和解压http响应体数据

### net

> [官方文档](http://nodejs.org/api/net.html)

* 创建Socket服务器或者Socket客户端