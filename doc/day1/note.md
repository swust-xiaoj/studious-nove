### Buffer(数据块)

> [官方文档](http://nodejs.org/api/buffer.html)

* `NodeJS` 提供了一个与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作
* 除了可以读取文件得到`Buffer`实例外，还可以直接构造
* 可以`.length`获取字节长度，`[index]`索引方式读取指定位置的字节
* `Buffer` 与字符串能够相互转化
* 与字符串的最大区别，字符串只读，`Buffer`更改后返回原来的`Buffer`

### Stream(数据流)

> [官方文档]( http://nodejs.org/api/stream.html)

* `Nodejs` 通过各种`Stream`来提供对数据流的操作
* `Stream` 基于事件机制，所有`Stream`的实例都继承于`Nodejs`的EventEmiiter

### File System (文件系统)

> [官方文档](http://nodejs.org/api/fs.html)

* 通过`fs`内置模块提供对文件的操作，`fs`模块提供的`API`基本氛围三类
* 文件属性读写`fs.stat/fs.chmod/fs.chown`
* 文件内容读写`fs.readFile/fs.readdir/fs.writeFile/fs.mkdir`
* 底层文件操作`fs.open/fs.read/fs.write/fs.close`

### Path(路径)

> [官方文档](http://nodejs.org/api/path.html)

* 简化路径相关操作，提升代码可读性
* 不要使用拼接字符串方式来处理路径

### http(网络操作)

> [官方文档](http://nodejs.org/api/http.html)

* 作为服务端使用时，创建一个http服务器，监听http客户端请求并返回响应
* 作为客户端使用时，发起一个http客户端请求，获取服务端响应

### https

> [官方文档](http://nodejs.org/api/https.html)

* 和http类似，区别在于https模块需要额外处理ssl证书
* 与http服务器相比，会多一个options对象，通过key,cert字段指定https服务器使用的密钥和公钥