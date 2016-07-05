'use strict';

let mongoose = require('mongoose');
let _ = require('lodash');
let Page = mongoose.model('Page');

module.exports = {
    getPageData: getPageData,
    postPage: postPage,
    putPage: putPage
};

function getPageData (req, res) {
    let promise = null;

    if (req.params.name) {
        promise = Page.findOne({ name: req.params.name });
    } else {
        promise = Page.find(null, { name: 1, values: 1 });
    }

    promise
        .then((pages) => res.send(pages))
        .catch((err) => res.send(500, err));
}

function postPage (req, res) {
    var page = new Page(req.body);
    page.createdBy = req.user.userId;

    page.save()
        .then(success)
        .catch(error);

    function success (page) {
        res.json(page);
    }

    function error (err) {
        if (err.errors) {
            res.send(422, {
                message: err.message,
                errors: err.errors
            });
        } else {
            res.send(500, err);
        }
    }
}

function putPage (req, res) {
    Page.findOne({ name: req.params.name })
        .then(update)
        .then((data) => res.send(data))
        .catch((err) => res.send(500, err));

    function update (page) {
        page = _.extend(page, req.body);
        page.updatedBy = req.user.userId;
        page.updated = Date.now();

        return page.save();

    }
}
