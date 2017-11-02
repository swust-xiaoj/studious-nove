// 通过使用process.argv获取命令行参数
// node执行程序路径和主模块路径固定占用了argv[0]和argv[1]
// 所以第一个命令行参数从argv[2]开始

let argv = process.argv.slice(2);

// 退出程序
// process.exit(1);

// 控制输入输出
// 1.标准输入流stdin 对应 process.stdin / 只读数据流
// 2.标准输出了stdout 对应 process.stdout / 只写数据流
// 3.标准错误流sterr 对应 process.stderr / 只写数据流

// 创建nodejs子进程
const child_process = require('child_process');
let child = child_process.spawn('node', ['./bin/day2/testprocess.js']);
// .spawn(exec, args, options)
// 第一个参数是执行文件路径，相对或绝对路径或PATH环境变量能找到的执行文件名
// 第二个参数中，数组中的每个成员都按顺序对应一个命令行参数
// 第三个参数可选，用于配置子进程的执行环境与行为

child.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
}); // stdout: I am exected...

child.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
});

child.on('close', code => {
    console.log(`child process exited with code ${code}`);
}); // child process exited with code 0

// 进程之间的通讯
// linux系统下，进程间可以通过信号相互通信
/* a.js */
let b = child_process.spawn('node', ['b.js']);

// a进程通过kill方法向子进程发送SIGTERM信号，子进程b监听process对象的SIGTERM时间响应信号
b.kill('SIGTERM');

/* b.js */
process.on('SIGTERM', () => {
    cleanUp();
    process.exit(0);
});

// 守护子进程

const spawn = mainModule => {
    let worker = child_process.spawn('node', [mainModule]);

    // 工作进程非正常退出时，守护进程立即重新启动工作进程
    worker.on('exit', code => {
        if (code !== 0) {
            spawn(mainModule);
        }
    });
};
spawn('worker.js'); // 守护worker.js这个进程
