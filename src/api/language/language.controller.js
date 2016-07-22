'use strict'

let mongoose = require('mongoose');
let Language = mongoose.model('Language');
let _ = require('lodash');

module.exports = {
    getLanguages: getLanguages,
    postLanguage: postLanguage,
    getAdminLanguages: getAdminLanguages,
    getLanguage: getLanguage,
    putLanguage: putLanguage,
    putString: putString,
    putStrings: putStrings
};

function getLanguages (req, res) {
    Language.find({ enabled: true }, { _id: 0, isoCode: 1, internationalName: 1, nativeName: 1 })
        .then(function (languages) {
            res.json(languages);
        })
        .catch(function (err) {
            res.send(500, err);
        })
}

function postLanguage (req, res) {
    var language = new Language(req.body);
    language.createdBy = req.user.userId;
    language.isoCode = language.isoCode.toLowerCase();
    language.strings = {general: null};

    language.save(function (err, language) {
        if (err) {
            if (err.errors) {
                res.send(422, {
                    message: err.message,
                    errors: err.errors
                });
            } else {
                res.send(500, err);
            }
        } else {
            res.send(201, language);
        }
    });
}

function getAdminLanguages (req, res) {
    Language.find()
        .populate('createdBy', '-password')
        .then(function (languages) {
            res.json(languages);
        })
        .catch(function (err) {
            res.send(500, err);
        });
}

function getLanguage(req, res) {
    req.params.isoCode = req.params.isoCode.replace('.json', '');
    Language.findOne({ isoCode: req.params.isoCode.toLowerCase() },
        function (err, language) {
            if (!err) {
                if (!language || !language.strings) {
                    res.send(404, {
                        error: 'Language not found'
                    });
                } else {
                    res.send(language.strings);
                }
            } else {
                res.send(500, err);
            }
        });
}

function putLanguage(req, res) {
    Language.findOne({ _id: req.params.languageId },
        function (err, language) {
            if (!err) {
                language = _.extend(language, req.body);
                language.updated = Date.now();
                language.updatedBy = req.user.userId;
                language.save(function (err, language) {
                    if (!err) {
                        res.json(language);
                    } else {
                        if (err.errors) {
                            res.send(422, {
                                message: err.message,
                                errors: err.errors
                            });
                        } else {
                            res.send(500, err);
                        }
                    }
                });
            } else {
                res.send(500, err);
            }
        })
}

function putString(req, res) {
    Language.findOne({_id: mongoose.Types.ObjectId(req.params.isoCode)},
        function (err, language) {
            if (!err) {
                language = _.extend(language, {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    roles: req.body.roles,
                    updated: Date.now()
                });
                language.save(function (err, language) {
                    if (!err) {
                        res.send(language);
                    } else {
                        if (err.errors) {
                            res.send(422, {
                                message: err.message,
                                errors: err.errors
                            });
                        } else {
                            res.send(500, err);
                        }
                    }
                });
            } else {
                res.send(500, err);
            }
        })
}

function putStrings (req, res) {
    var languages = {};
    // todo: Refactor this block
    _.forEach (req.body, function (values, stringKey) {
        _.forEach (values, function (values, property) {
            _.forEach (values, function (value, languageKey) {
                if (!languages[languageKey]) {
                    languages[languageKey] = {};
                }
                if (!languages[languageKey][stringKey]) {
                    languages[languageKey][stringKey] = {};
                }
                languages[languageKey][stringKey][property] = value;
            });
        });
    });

    var docLanguages = [];
    _.each(languages, function (lang, key) {
        docLanguages.push({
            isoCode: key,
            strings: lang
        });
    });

    var total = docLanguages.length,
        result = [];

    function saveAll() {
        var doc = docLanguages.pop();

        Language.findOne({ isoCode: doc.isoCode })
            .then(function (language) {
                Language.findOneAndUpdate({ isoCode: doc.isoCode }, { $set: { strings: _.extend(language.strings || {}, doc.strings) }}, { new: true })
                    .then (function (saved) {
                        result.push(saved);

                        if (--total) {
                            saveAll();
                        } else {
                            res.json(result);
                        }
                    })
                    .catch(handleError);
            })
            .catch(handleError);
    }

    function handleError(err) {
        res.send(500, err);
    }

    saveAll();
}
