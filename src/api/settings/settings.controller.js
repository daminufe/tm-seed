'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');

let Settings = mongoose.model('Settings');

module.exports = {
    getPublicSettings: getPublicSettings,
    getSettings: getSettings,
    putSettings: putSettings
};


function getPublicSettings (req, res) {
    Settings.find({ public: true }, { key: 1, value: 1, _id: 0 })
        .then((settings) => res.send(settings))
        .catch((err) => res.send(500, err));
}

function getSettings (req, res) {
    Settings.find()
        .then((pages) => res.send(pages))
        .catch((err) => res.send(500, err));
}

function putSettings (req, res) {
    var settings = [];

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            settings.push(req.body[key]);
        }
    }

    var total = settings.length;
    var result = [];

    saveAll();

    function saveAll() {
        var curSetting = settings.pop();
        Settings.findOneAndUpdate(curSetting._id)
            .then(update);

        function update (setting) {
            setting = _.extend(setting, curSetting);

            setting.save()
                .then(function (saved) {
                    result.push(saved);

                    if (--total) {
                        saveAll();
                    } else {
                        res.json(result);
                    }
                })
                .catch(error);
        }
    }



    function error (err) {
        res.send(500, err)
    }

}
