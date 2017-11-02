let url = require('url');

const URL = 'http://use:pass@host.com:8080/p/a/t/h?query=string#hash';

console.log(url.parse(URL));
// {
//     protocol: 'http:',
//     slashes: true,
//     auth: 'use:pass',
//     host: 'host.com:8080',
//     port: '8080',
//     hostname: 'host.com',
//     hash: '#hash',
//     search: '?query=string',
//     query: 'query=string',
//     pathname: '/p/a/t/h',
//     path: '/p/a/t/h?query=string',
//     href: 'http://use:pass@host.com:8080/p/a/t/h?query=string#hash'
// };

// 传递给parse方法的不一定是一个完整的URL
const shortURL = '/foo/bar?a=b';
console.log(url.parse(shortURL));
// {
//     protocol: 'http:',
//     slashes: true,
//     auth: 'use:pass',
//     host: 'host.com:8080',
//     port: '8080',
//     hostname: 'host.com',
//     hash: '#hash',
//     search: '?a=b',
//     query: 'a=b',
//     pathname: '/foo/bar',
//     path: '/foo/bar?a=b',
//     href: '/foo/bar?a=b'
// };

// parse方法支持第二个和第三个bool类型可选参数
// 第二个参数为true时，返回的url对象中query是一个参数对象
// 第三个参数为true时，可以正确解析不带协议头的URL

// resolve 用于拼接URL

let newurl = url.resolve('http://testsite.com/foo/baz', '../bar');
console.log(newurl); // http://testsite.com/bar

const qs = require('querystring');

let query = qs.parse('foo=bar&baz=qu&xx');
console.log(query); //  {foo: "bar", baz: "qu", xx: ""}

let querystr = qs.stringify(query);
console.log(querystr); // foo=bar&baz=qu&xx=

const zlib = require('zlib');
const http = require('http');
