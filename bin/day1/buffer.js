var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var str = bin.toString('utf-8');
console.log(bin.length); // 5
console.log(str); // 'hello'
