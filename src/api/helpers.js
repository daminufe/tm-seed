module.exports = {
    handleError: handleError
}

function handleError (res) {
    return err => {
        if (err.errors) {
            res.send(422, {
                message: err.message,
                errors: err.errors
            })
        } else {
            res.send(500, err)
        }
    }
}

