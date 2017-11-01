var fs = require('fs');

const copy = (src, dst) => {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

const main = argv => {
    copy(argv[0], argv[1]);
}

// argv[0]固定等于Nodejs执行程序的绝对路径
// argv[1]固定等于主模块的绝对路径，所以第一个参数从argv[2]开始
main(process.argv.slice(2));