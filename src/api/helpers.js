let handleError = res => err => {
    if (err.errors) {
        res.send(422, {
            message: err.message,
            errors: err.errors
        })
    } else {
        res.send(500, err)
    }
}

module.exports = {
    handleError: handleError
}
