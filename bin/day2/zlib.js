// 使用zlib压缩http响应体数据
http.createServer((req, res) => {
    let arr = new Array(1024);
    let data = arr.fill('.').join('');

    // 判断客户端是否支持gzip
    if ((req.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            res.end(data);
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(data);
    }
}).listen(8000);

// 使用zlib解压http响应体数据

const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip, deflate'
    }
};

http.request(options, res => {
    let body = [];

    res.on('data', chunk => body.push(chunk));

    res.on('end', () => {
        body = Buffer.concat(body);

        if (res.headers['content-encoding'] === 'gzip') {
            zlib.gunzip(body, (err, data) => {
                console.log(data.toString());
            });
        } else {
            console.log(data.toString());
        }
    });
    
}).end(); // '.............'(length=1024)
