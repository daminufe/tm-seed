'use strict';

import fs from 'fs'
import config from '../config'


module.exports = {
    postImage: postImage
}

function postImage(req, res) {
    if (req.files.file.type.indexOf('image') === -1) {
        return res.send(422, {
            error: 'File type is not allowed'
        })
    }

    fs.readFile(req.files.file.path, (err, data) => {
        if (err) {
            return res.send(500, err)
        }
        let newPath = [
            'assets',
            'uploads',
            [
                (req.body.category || 'default'),
                Date.now(),
                req.files.file.name.replace(/\s/g, "-")
            ].join('_')
        ].join('/')
        
        fs.writeFile(`${config.path.root}/${newPath}`, data, function (err) {
            if (err) {
                return res.send(500, err)
            }
            return res.send({
                url: `/${newPath}`
            })
        })
    })
}
