const Router = require('express').Router
const router = new Router()
const userController = require('../controllers/userController')
const { body } = require('express-validator')

/**
 * @openapi
 * /user/register:
 *   post:
 *    tag:
 *     -Register
 *     description: Register a new user
 *     responses:
 *       200:
 *         description: A list of users
 */

router.post(
    '/register',
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Incorrect email syntax'),
    body('password')
        .exists().withMessage('Password is required')
        .isLength({ min: 5, max: 20 }).withMessage('Password must contain at least 5 and not over 20 characters in it'),
    userController.register
)

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/refresh', userController.refresh)

module.exports = router