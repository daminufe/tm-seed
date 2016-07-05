'use strict';

let restify = require('restify');
let config = require('./config');
let glob = require('glob');
let mongoose = require('./mongoose-config');
let jwt = require('restify-jwt');
let fs = require('fs');

let server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

server.use(jwt({ secret: config.secret })
    .unless(function (req) {
        let ext = req.url.split('?')[0].split('.').pop();

        let validExt = ['jpg', 'png', 'ico', 'html', 'css', 'js', 'svg', 'woff2'].indexOf(ext) >= 0;

        if (validExt) {
            return true;
        }

        let valids = [
            '/',
            '/api/auth',
            '/api/recover-password'
        ];

        if (valids.indexOf(req.url) >=0 ) {
            return true;
        }

        let regex = new RegExp(/^\/api\/public\/.*/);
        if (regex.test(req.url)) {
            return true;
        }

        return false;
    })
);

server.listen( process.env.PORT || 3001, () => {
    console.log('%s listening at %s', server.name, server.url);
});
module.exports = server;

let modules = glob.sync(config.path.api + '/**/*.route.js');

modules.forEach(function (module) {
    require(module);
})

server.pre(function (req, res, next) {
    //check file exists
    try {
        let path = './public' + req.url.split('?')[0];
        fs.accessSync(path, fs.F_OK);
        //file exists
        return next();
    } catch (e) {
        //do nothing
    }
    if (!req.url.match(/^\/(api)/)) {
        req.url = '/';
    }
    return next();
})

