const net = require('net');

// 使用socket创建一个很不严谨的http服务器
// 不管什么请求都返回相同的响应
net.createServer(conn => {
    conn.on('data', data => {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello world'
        ].join('\n'));
    });
}).listen(8000);

// 使用socket发起http客户端请求
// 建立连接后发送一个http get请求，通过data事件监听函数来获取服务器响应

let options = {
    port: 8000,
    host: '127.0.0.1'
};

let client = net.connect(options, () => {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: 127.0.0.1',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', data => {
    console.log(data.toString());
    client.end();
}); // 'Hello world'