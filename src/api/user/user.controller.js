'use strict';

let config = require('../config');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let _ = require('lodash');
let nodemailer = require('nodemailer');
let Helpers = require('../helpers');

let User = mongoose.model('User');
let smtpTransport = nodemailer.createTransport(config.mailer.options);

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    auth: auth,
    grantPassword: grantPassword,
    refreshToken: refreshToken,
    unauthorized: unauthorized,
    sign: sign,
    changePassword: changePassword,
    recoverPassword: recoverPassword
};

function getUsers (req, res) {
    let options = {
        sort: req.query.sort || {created: 1},
        offset: req.query.skip || 0,
        page: req.query.page || 1,
        limit: req.query.limit || 15
    };

    User.paginate({}, options)
        .then((users) => res.json(users))
        .catch(Helpers.handleError(res));
}

function getUser (req, res) {
    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)})
        .then(user => res.json(user))
        .catch(Helpers.handleError(res));
}

function createUser (req, res) {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });
    user.save()
        .then(user => res.json(user))
        .catch(Helpers.handleError(res));
}

function updateUser (req, res) {
    User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)})
        .then(save)
        .then(user => res.json(user))
        .catch(Helpers.handleError(res));

    function save (user) {
        user = _.extend(user, {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            roles: req.body.roles,
            updated: Date.now()
        });

        return user.save();
    }
}

function deleteUser (req, res) {
    User.remove({_id: mongoose.Types.ObjectId(req.params.userId)})
        .then(user => res.json(user))
        .catch(Helpers.handleError(res));
}

function auth (req, res) {
    switch (req.body.grant_type) {
        case "refresh_token":
            refreshToken(req, res);
            break;
        case "password":
            grantPassword(req, res);
            break;
        default:
            res.send(211, {error: 'Missing grant type'});
    }
}

function grantPassword (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username: username}, function (err, user) {
        if (err || !user) {
            unauthorized(res);
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (err || !isMatch) {
                    unauthorized(res);
                } else {
                    let _user = user.toObject();
                    delete _user.password;
                    res.send(sign(_user));
                }
            })
        }
    })
}

function refreshToken (req, res, next) {
    try {
        let refreshToken = req.body.refresh_token;
        let decoded = jwt.verify(refreshToken, config.secret, {
            issuer: server.url
        });
        let originalToken = decoded.id_token;

        jwt.verify(originalToken, config.secret, {
            issuer: server.url
        }, function (err) {
            if (!err) {
                unauthorized(res, 'The access token still is valid. You can refresh token only after access token expires');
            }
            jwt.verify(originalToken, config.secret,
                {
                    issuer: server.url,
                    ignoreExpiration: true
                }, function (err, originalDecoded) {
                    if (err) {
                        unauthorized(res, 'Can\'t parse refresh token');
                    }
                    User.findOne({_id: mongoose.Types.ObjectId(originalDecoded.user)}, function (err, user) {
                        if (err) {
                            unauthorized(res);
                        }
                        let _user = user.toObject();
                        delete _user.password;
                        res.send(sign(_user));
                        //@TODO blacklist old refresh token
                    })
                }
            )
        })
    } catch (e) {
        unauthorized(res, 'Invalid token');
    }
}

function unauthorized (res, msg) {
    res.send(401, {
        error: msg || 'Invalid credentials'
    });
}

function sign (user) {
    let accessToken = jwt.sign(
        {
            userId: user._id,
            name: user.name,
            roles: user.roles
        },
        config.secret,
        {
            expiresIn: 3600 * 24,
            issuer: server.url
        }
    );

    let refreshToken = jwt.sign(
        {
            id_token: accessToken
        },
        config.secret,
        {
            expiresIn: 3600 * 24,
            issuer: server.url
        }
    );

    return {
        token_type: 'bearer',
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 3600
    };
}

function changePassword (req, res) {
    let password = req.params.current;

    User.findOne({_id: mongoose.Types.ObjectId(req.user.userId)}, function (err, user) {
        if (err || !user) {
            res.send(422, {
                error: 'Unauthorized'
            });
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (err || !isMatch) {
                    res.send(422, {
                        error: 'Current password is incorrect'
                    });
                } else {
                    user.password = req.params.new;
                    user.save().then(function () {
                        res.send({'message': 'Password updated'})
                    });
                }
            })
        }
    });
}

function recoverPassword (req, res) {
    let username = req.body.username;
    User.findOne({username: username}, function (err, user) {
        if (err || !user) {
            res.send(404, {
                error: 'Username not found'
            });
        } else {
            let password = Math.random().toString(36).slice(-6);
            let emailHTML = `We provided a new password for you: <br/><br/>
                <div style="border:2px dashed #CCC padding:10px width: 150px background:#EDEDED font-weight:bold">
                    ${password}
                </div>
                <p>You can change your password after login.</p>`;

            let mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Password Reset',
                html: emailHTML
            };

            smtpTransport.sendMail(mailOptions, function (err) {
                if (!err) {
                    user.password = password;
                    user.save();
                    res.send({
                        message: `An email has been sent to the email ${user.email} with further instructions.`,
                        email: user.email
                    });
                } else {
                    return res.send(500, {
                        error: 'Failure sending email'
                    });
                }

                done(err);
            })
        }
    })
}
