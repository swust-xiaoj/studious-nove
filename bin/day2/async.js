const heavyCompute = (n, cb) => {
    let cnt = 0, i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            cnt += 1;
        }
    }

    cb(cnt);
};
heavyCompute(10000, cnt => console.log(cnt));
console.log('hello async!!!');
// 100000000
// 'hello async!!!'

const heavyCompute1 = n => {
    let cnt = 0, i, j;

    for (i = n; i > 0; --i) {
        for (j = n; j > 0; --j) {
            cnt += 1;
        }
    }
};

let t = new Date();
setTimeout(() => console.log(new Date() - t), 1000);

heavyCompute1(50000)

// 2117
// 可以看出，本来应该在1000ms被调用的回调函数
// 因为js主线程忙于运行其他代码，实际执行时间为2117

// next #6.3