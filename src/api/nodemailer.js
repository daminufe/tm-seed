let nodemailer = require('nodemailer');
let mg = require('nodemailer-mailgun-transport');


let auth = {
    auth: {
        api_key: process.ENV.MAILGUN_API_KEY,
        domain: 'es6skeleton.tld'
    }
};

module.exports = nodemailer.createTransport(mg(auth));
