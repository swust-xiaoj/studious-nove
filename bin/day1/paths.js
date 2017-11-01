const path = require('path');

// path.normalize
// 将传入的路径转换成标准路径，除了解析.和..外，还能去掉多于的斜杠
let cache = {};

const store = (key, value) => {
    cache[path.normalize(key)] = value;
};

store('foo/bar', 1);
store('foo//baz//../bar', 2);
// tips: 标准化后的斜杠在windows下是\.而在linux下是/.
// 如果保证任何系统都统一/,replace(/\\/g, '/')
console.log(cache); // {'foo\bar': 2}

// path.join
// 拼接多个路径为标准路径
let newpath = path.join('foo/', 'baz/', '../bar');
console.log(newpath); // 'foo\bar'

// path.extname
// 提取文件名后缀
const extname = path.extname('foo/bar.js');
console.log(extname); // .js

// 遍历目录
// 1.一般使用递归，代码较简洁，但由于每次递归产生函数调用，如果考虑性能，需要把递归转换成循环，减少函数调用次数
// 2.遍历算法。由于目录树形结构，一般是用深度优先+先序遍历

// 同步遍历
const fs = require('fs');
const travel = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        let pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
};
travel('./bin', pathname => {
    console.log(pathname);
});
// bin\day1\buffer.js
// bin\day1\paths.js
// bin\day1\stream.js

// 异步遍历
// 如果读取目录或文件状态时使用异步API,函数实现起来会有些复杂

let travel2 = (dir, callback, finish) => {
    fs.readdir(dir, (err, files) => {
        (function next(i) {
            if (i < files.length) {
                let pathname = path.join(dir, files[i]);
                fs.stat(pathname, (err, stats) => {
                    if (stats.isDirectory()) {
                        travel2(pathname, callback, () => {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, () => {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
};

travel('./bin', pathname => {
    console.log(pathname);
}, () => {
    console.log('finished...')
});

// bin\day1\buffer.js
// bin\day1\paths.js
// bin\day1\stream.js