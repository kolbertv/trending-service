class ErrorHandler {

    public errorStatusCode(err, req, res, next) {
        console.log(new Date(Date.now()), 'Error', err);
        if (err.status && err.message) {
            res.status(err.status)
            res.send(JSON.stringify({ status: false, message: err.message }))
        } else {
            next(err);
        }
    }

    public error(err, req, res, next) {
        res.status(500)
        res.send(JSON.stringify({ status: false, message: 'Server error' }))
    }
}

export default new ErrorHandler();