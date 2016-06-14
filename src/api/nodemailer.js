import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'


let auth = {
    auth: {
        api_key: process.ENV.MAILGUN_API_KEY,
        domain: 'eurus-europe.com'
    }
}

export default nodemailer.createTransport(mg(auth))
