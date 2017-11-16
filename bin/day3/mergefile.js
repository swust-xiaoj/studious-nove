const fs = require('fs'),
    path = require('path'),
    http = require('http');

const MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

const combineFiles = (pathnames, cb) => {
    console.log(pathnames)
    let output = [];

    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathnames[i], (err, data) => {
                if (err) {
                    cb(err);
                } else {
                    output.push(data);
                    next(i + 1, len);
                }
            });
        } else {
            cb(null, Buffer.concat(output));
        }
    })(0, pathnames.length);
};

const main = argv => {
    let config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 8080;

    http.createServer((req, res) => {
        const urlInfo = parseURL(root, req.url);

        console.log(urlInfo)

        combineFiles(urlInfo.pathnames, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(err.message);
            } else {
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                res.end(data);
            }
        });
    })
    .listen(port);
    console.log('server at port:' + port + ' started...');
};

const parseURL = (root, url) => {
    let base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split('.').map(value => {
        return path.join(root, base, value);
    });

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
};

main(process.argv.slice(2));
// next #7.3
