let http = require('http');

// 服务端
http.createServer((req, res) => {
    let body = [];

    console.log('method: ' + req.method);
    console.log('headers: ' + req.headers);

    req.on('data', chunk => {
        body.push(chunk);
    });

    req.on('end', () => {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(8000);

// 客户端
const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: './',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};
let req = http.request(options, res => {});

req.write('Hello World');
req.end();

// next #4.2.3
