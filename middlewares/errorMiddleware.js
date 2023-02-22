const ApiError = require('../exceptions/apiError')

module.exports = function (err, req, res, next) {
    console.log(err)

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
    } else {
        return res.status(500).json({message: 'Тут либо вы попутали, либо я. Точно не могу сказать'})
    }

}