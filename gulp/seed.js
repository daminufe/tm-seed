'use strict'

import gulp from 'gulp'
import mongoose from '../src/api/mongoose-config'
import util from 'gulp-util'
import chalk from 'chalk'


let User = mongoose.model('User')
let Language = mongoose.model('Language')
let Page = mongoose.model('Page')

gulp.task('seed', ['seed:admin', 'seed:languages', 'seed:settings'])

gulp.task('seed:admin', () => {
    let password = Math.random().toString(36).slice(-6)
    let email = util.env.email || 'contact@example.com'
    let user = new User({
        name: 'Admin',
        username: 'admin',
        email: email,
        password: password,
        roles: ['admin'],
        updated: Date.now()
    })

    user.save(function (err) {
        if (err) {
            console.log(chalk.red(err.errmsg))
        } else {
            console.log(chalk.green('Created user:'))
            console.log(chalk.green('username:\t') + chalk.yellow('admin'))
            console.log(chalk.green('email:\t\t') + chalk.yellow(email))
            console.log(chalk.green('password:\t') + chalk.yellow(password))
        }
    })

    return
})

gulp.task('seed:languages', () => {
    let language = new Language({
        isoCode: "en",
        internationalName: "English",
        nativeName: "English",
        enabled: true
    })

    language.save((err) => {
        if (err) {
            console.log(chalk.red(err.errmsg))
        } else {
            console.log(chalk.green('Created english language:'))
        }
    })

    return
})


gulp.task('seed:settings', function () {
    let settingsList = [
        { key: 'contact_email_send', label: 'Send contact emails to', showIf: 'send_emails', public: false, value: 'david@taskmatic.nl' },
        { key: 'send_emails', label: 'Send contact emails?', type: 'checkbox', public: false, value: true },
        { key: 'footer_text', label: 'Footer text', public: true, value: 'Eurus Energy Europe' },
        { key: 'meta_keywords', label: 'Meta keywords', public: true, value: 'eurus, energy, europe' },
        { key: 'meta_description', label: 'Meta description', public: true, value: 'Eurus Energy Europe' },
        { key: 'meta_title', label: 'Meta title', public: true, value: 'Eurus Energy Europe' },
        { key: 'analytics', label: 'Google Analytics', public: true, value: 'UA-xxxxxxx' }
    ]

    let total = settingsList.length

    function saveAll() {
        let setting = new Settings(settingsList.pop())

        setting.save()
            .then(function (saved) {
                console.log(chalk.yellow(`Added ${saved.key} setting`))

                if (--total) {
                    saveAll()
                } else {
                    console.log(chalk.green(`Added all settings`))
                }
            })
            .catch(error)
    }

    saveAll()
})
