// 在每处理一个请求时，使用domain模块创建一个子域
// 在子域内运行的代码可以随意抛出异常，儿这些异常可以通过子域对象的error事件统一捕获
const http = require('http');
const domain = require('domain');

const async = (req, cb) => {
    // do something
    asyncA(req, data => {
        // do something
        asyncB(req, data => {
            // do something
            asyncC(req, data => {
                // do something
                cb(data);
            });
        });
    });
};
http.createServer((req, res) => {
    // 使用.create方法创建了一个子域对象
    let d = domain.create();

    d.on('error', () => {
        res.writeHead(500);
        res.end();
    });

    // 通过.run方法进入需要在子域中运行的代码入口点
    d.run(() => {
        // 此处的异步函数回调函数不用捕获异常，减轻代码量
        async(req, data => {
            res.writeHead(200);
            res.end(data);
        });
    });
});
// tips:
// 使用 uncaughException 或 domain 捕获异常，代码执行路径涉及到C/C++代码时
// 如果不确定是否会导致内存泄露，最好在处理异常后重启程序比较妥当