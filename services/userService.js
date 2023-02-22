const { User } = require('../models/models')
const ApiError = require('../exceptions/apiError')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/userDto')
const tokenService = require('./tokenService')

class UserService {
    async register(email, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`User with email ${email} is already exists!`)
        }

        const hashPassword = bcrypt.hashSync(password, 5)
        const user = await User.create({
            email,
            password: hashPassword,
        })

        const tokens = tokenService.generateToken({ ...user })
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user
        }
    }

    async login(email, password) {
        const user = await User.findOne({
            where: { email },
        })

        if (!user) {
            throw ApiError.BadRequest('User with gived credentials is not defined')
        }

        const arePasswordsEquals = await bcrypt.compare(password, user.password)
        if (!arePasswordsEquals) {
            throw ApiError.BadRequest('Incorrect password')
        }

        const tokens = tokenService.generateToken({ ...user })
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user,
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({
            where: { id: userData.dataValues.id },
        })
        const tokens = tokenService.generateToken({...user})

        await tokenService.saveToken(user.id, tokens.refreshToken)

        return {
            ...tokens,
            user,
        }
    }
}


module.exports = new UserService()