module.exports = {
    handleError(err, req, res, next) {
        if (err.statusCode) {
            res.status(err.statusCode);
        }else{
            res.status(500);
        }

        return res
            .json({
                error: err.message
            });
    }
}