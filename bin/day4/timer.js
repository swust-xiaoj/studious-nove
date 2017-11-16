const Timer = process.binding('timer_wrap').Timer;
const kOnTimeout = Timer.kOnTimeout | 0;

// 自定义setTimeout函数
const setTimeout = (fn, ms) => {
    let timer = new Timer;
    timer.start(ms, 0);
    timer[kOnTimeout] = fn;
    return timer;
}

setTimeout(() => console.log('timeout'), 1000);