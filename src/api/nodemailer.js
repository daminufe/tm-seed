let nodemailer = require('nodemailer');
let mg = require('nodemailer-mailgun-transport');


let auth = {
    auth: {
        api_key: process.ENV.MAILGUN_API_KEY,
        domain: 'eurus-europe.com'
    }
};

module.exports = nodemailer.createTransport(mg(auth));
