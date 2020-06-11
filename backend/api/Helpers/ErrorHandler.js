module.exports = {
    handleError(err, req, res, next) {
        return res.status(err.statusCode)
            .json({
                error: err.message
            });
    }
}