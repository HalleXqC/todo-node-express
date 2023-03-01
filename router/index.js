const Router = require('express').Router
const router = new Router()
const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')
const authMiddleware = require('../middlewares/authMiddleware')

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

router.use('/user', userRouter)
router.use('/todo', authMiddleware, todoRouter)

module.exports = router