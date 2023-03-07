const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')
const userService = require('../services/userService')

class UserController {
    async register(req, res, next) {
        try {
            const validateErrors = validationResult(req)
            if (!validateErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', validateErrors.array()))
            }
            const { email, password } = req.body
            const userData = await userService.register(email, password)
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body
            const token = await userService.logout(refreshToken)
            return res.json(token)
        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.body
            const userData = await userService.refresh(refreshToken)
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController()